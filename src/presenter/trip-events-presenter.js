import SortingView from '../view/sorting-view';
import EventListView from '../view/event-list-view';
import NoPointView from '../view/no-points-view';
import LoadingView from '../view/loading-view';
import PointNewPresenter from './point-new-presenter';
import PointPresenter from './point-presenter';

import { remove, render, replace, RenderPosition, } from '../utils/render';
import { sortPoints, sortPrices, sortTimes, } from '../utils/point';
import { cloneArrayOfObjects, } from '../utils/commonds';
import { Filter, } from '../utils/filter';
import { SortType, UserAction, UpdateType, FilterType, ViewState, } from '../const';

const EmptyFiter = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

export default class TripEventsPresenter {
  #tripEventsContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #destinationsModel = null;
  #servicesModel = null;

  #sortingComponent = null;
  #eventListComponent = new EventListView();
  #noPointComponent = null;
  #LoadingComponent = new LoadingView();

  #pointsInited = new Map();
  #pointNewPresenter = null;
  #currentSortType = SortType.DEFAULT;
  #isLoading = true;

  constructor(tripEventsContainer, pointsModel, filterModel, destinationsModel, servicesModel) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#destinationsModel = destinationsModel;
    this.#servicesModel = servicesModel;

    this.#pointNewPresenter = new PointNewPresenter(this.#eventListComponent, this.#handleViewAction, this.#destinationsModel, this.#servicesModel);
  }

  get points() {
    const currentFilterType = this.#filterModel.get;
    const points = cloneArrayOfObjects(this.#pointsModel.get);
    const filteredPoitns = Filter[currentFilterType](points);

    switch (this.#currentSortType) {
      case SortType.DEFAULT:
        return sortPoints(filteredPoitns);
      case SortType.TIME_DOWN:
        return sortTimes(filteredPoitns);
      case SortType.PRICE_DOWN:
        return sortPrices(filteredPoitns);
    }

    return points;
  }

  init = () => {
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#pointsModel.addObserver(this.#handleModelEvent);

    this.#render();
  }

  createPoint = () => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.set(FilterType.EVERYTHING, UpdateType.MINOR);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
      render(this.#tripEventsContainer, this.#eventListComponent, RenderPosition.BEFORE_END);
    }

    this.#pointNewPresenter.init();
  }

  destroy = () => {
    this.#clear({ resetSortType: true });

    this.#pointsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  #handleViewAction = async (actionType, updateType, update) => {
    if (!updateType) {
      return;
    }

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        try {
          await this.#pointsModel.update(updateType, update);
        } catch (err) {
          this.#pointsInited.get(update.id).setViewState(ViewState.ABORTING);
        }

        break;
      case UserAction.DELETE_POINT:
        this.#pointsInited.get(update.id).setViewState(ViewState.DELETING);

        try {
          await this.#pointsModel.delete(updateType, update);
        } catch (err) {
          this.#pointsInited.get(update.id).setViewState(ViewState.ABORTING);
        }

        break;
      case UserAction.ADD_POINT:
        this.#pointNewPresenter.setSaving();

        try {
          await this.#pointsModel.add(updateType, update);
        } catch (err) {
          this.#pointNewPresenter.setAborting();
        }

        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointsInited.get(data.id).init(data);

        break;
      case UpdateType.MINOR:
        this.#clear({ resetSortType: true });

        this.#render();

        break;
      case UpdateType.INIT:
        this.#isLoading = false;

        remove(this.#LoadingComponent);

        this.#render();

        break;
    }
  }

  #clear = ({ resetSortType = false } = {}) => {
    this.#pointNewPresenter.destroy();
    this.#pointsInited.forEach((presenter) => presenter.destroy());
    this.#pointsInited.clear();

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
      remove(this.#sortingComponent);
    }
  }

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointsInited.forEach((presenter) => presenter.resetPoint());
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#eventListComponent, this.#handleViewAction, this.#handleModeChange, this.#destinationsModel, this.#servicesModel);
    pointPresenter.init(point);

    this.#pointsInited.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPointList = () => {
    render(this.#tripEventsContainer, this.#eventListComponent, RenderPosition.BEFORE_END);
    this.#renderPoints();
  }

  #render = () => {
    if (this.#isLoading) {
      render(this.#tripEventsContainer, this.#LoadingComponent, RenderPosition.BEFORE_END);

      return;
    }

    if (this.points.length === 0) {
      this.#renderNoPoint();

      return;
    }

    this.#renderSort();
    this.#renderPointList();
  }

  #renderNoPoint = () => {
    const prevNoPointComponent = this.#noPointComponent;

    if (this.points.length === 0) {
      this.#filterModel.set(FilterType.EVERYTHING);
    }

    this.#noPointComponent = new NoPointView(EmptyFiter[this.#filterModel.get]);

    if (prevNoPointComponent !== null) {
      replace(this.#noPointComponent, prevNoPointComponent);
    }

    render(this.#tripEventsContainer, this.#noPointComponent, RenderPosition.BEFORE_END);
  }

  #renderSort = () => {
    this.#sortingComponent = new SortingView();

    render(this.#tripEventsContainer, this.#sortingComponent, RenderPosition.BEFORE_END);
    this.#sortingComponent.setTypeChangeHandler(this.#handleSortTypeChange);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clear();
    this.#renderPointList();
  }

}
