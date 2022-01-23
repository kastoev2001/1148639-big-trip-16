import SortingView from '../view/site-sorting-view';
import EventListView from '../view/site-event-list-view';
import NoPointView from '../view/site-no-points-view';
import PointPresenter from './point-presenter';

import AbstractObservable from '../utils/pattern/abstract-observable';

import { remove, render, RenderPosition } from '../utils/render';
import { sortPoints, sortPrices, sortTimes } from '../utils/point';
import { copyArrayOfObjects } from '../utils/commonds';
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

  #sortingComponent = null;
  #eventListComponent = new EventListView();
  #noPointComponent = null;

  #pointsInited = new Map();
  #currentSortType = SortType.DEFAULT;

  constructor(tripEventsContainer, pointsModel, filterModel) {
    this.#tripEventsContainer = tripEventsContainer;
		this.#pointsModel = pointsModel;
		this.#filterModel = filterModel;

		this.#pointsModel.addObserver(this.#handleModelEvent);
		this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
		
    this.#renderTripEvents();
  }

	get points() {
		const currentFilterType = this.#filterModel.filter;
		const points = copyArrayOfObjects(this.#pointsModel.points);
		const filteredPoitns = filter[currentFilterType](points)

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
		switch (actionType) {
			case UserAction.UPDATE_POINT:
				this.#pointsModel.updatePoint(updateType, update);
				break;
			case UserAction.DELETE_POINT:
				this.#pointsModel.deletePoint(updateType, update);
		}
  }

	#handleModelEvent = (updateType) => {
		switch (updateType) {
			case UpdateType.MINOR:
				this.#clearTripEvents({resetSortType: true});
				this.#renderTripEvents();

		}
	}
	
	#clearTripEvents = ({resetSortType = false} = {}) => {
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
    this.#pointsInited.forEach((presenter) => presenter.resetPoint());
  }

  #clearPointList = () => {
    this.#pointsInited.forEach((presenter) => presenter.destroy());
    this.#pointsInited.clear();
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#eventListComponent, this.#handleViewAction, this.#handleModeChange);
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
