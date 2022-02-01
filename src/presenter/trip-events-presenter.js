import SortingView from '../view/site-sorting-view';
import EventListView from '../view/site-event-list-view';
import NoPointView from '../view/site-no-points-view';
import LoadingView from '../view/site-loading-view';
import PointNewPresenter from './point-new-presenter';
import PointPresenter from './point-presenter';

import AbstractObservable from '../utils/pattern/abstract-observable';

import { remove, render, RenderPosition } from '../utils/render';
import { sortPoints, sortPrices, sortTimes } from '../utils/point';
import { cloneArrayOfObjects } from '../utils/commonds';
import { filter } from '../utils/filter';
import { SortType, UserAction, UpdateType, FilterType } from '../const';

const EmptyFiter = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now'
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

  init = () => {
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#renderTripEvents();
  }

  destroy = () => {
    this.#clearTripEvents({resetSortType: true});

    this.#pointsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  createPoint = () => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MINOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init();
  }

  get points() {
    const currentFilterType = this.#filterModel.filter;
    const points = cloneArrayOfObjects(this.#pointsModel.points);
    const filteredPoitns = filter[currentFilterType](points);

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

  resetPointsAll = () => {
    const pointWatcher = new AbstractObservable();

    this.#pointsInited.forEach((presenter) => {
      pointWatcher.addObserver(presenter.resetPoint);
    });

    pointWatcher._notify();
  }

  #handleViewAction = (actionType, updateType, update) => {

    if (updateType === null) {
      return;
    }

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType) => {
    switch (updateType) {
      case UpdateType.MINOR:
        this.#clearTripEvents({resetSortType: true});
        this.#renderTripEvents();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#LoadingComponent);
        this.#renderTripEvents();
        break;
    }
  }

  #clearTripEvents = ({resetSortType = false} = {}) => {
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

  #renderTripEvents = () => {
    if (this.#isLoading) {
      render(this.#tripEventsContainer, this.#LoadingComponent, RenderPosition.BEFORE_END);
      return;
    }

    if (this.points.length === 0) {

      this.#renderNoPoint();

    } else {
      this.#renderSort();
      this.#renderPointList();
    }
  }

  #renderNoPoint = () => {
    this.#noPointComponent = new NoPointView(EmptyFiter[this.#filterModel.filter]);

    render(this.#tripEventsContainer, this.#noPointComponent, RenderPosition.BEFORE_END);
  }

  #renderSort = () => {
    this.#sortingComponent = new SortingView();

    render(this.#tripEventsContainer, this.#sortingComponent, RenderPosition.BEFORE_END);
    this.#sortingComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #handleSortTypeChange = (sortType) => {

    if  (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTripEvents();
    this.#renderPointList();

  }

}
