import SortingView from '../view/site-sorting-view';
import EventListView from '../view/site-event-list-view';
import NoPointView from '../view/site-no-points-view';
import PointPresenter from './point-presenter';

import AbstractObservable from '../utils/pattern/abstract-observable';

import { updateItem } from '../utils/commonds';
import { render, RenderPosition } from '../utils/render';
import { sortPoints, sortPrices, sortTimes } from '../utils/point';
import { copyArrayOfObjects } from '../utils/commonds';
import { SortType, UserAction, UpdateType } from '../const';

const EmptyFiter = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PAST: 'There are no past events now'
};

export default class TripEventsPresenter {
  #tripEventsContainer = null;
	#pointsModel = null;

  #sortingComponent = new SortingView();
  #eventListComponent = new EventListView();
  #noPointComponent = new NoPointView(EmptyFiter.EVERYTHING);

  #pointsInited = new Map();
  #currentSortType = SortType.DEFAULT;

  constructor(tripEventsContainer, pointsModel) {
    this.#tripEventsContainer = tripEventsContainer;

		this.#pointsModel = pointsModel;

		this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
		
    this.#renderTripEvents();
  }

	get points() {

		const points = copyArrayOfObjects(this.#pointsModel.points);

		switch (this.#currentSortType) {
			case SortType.DEFAULT:
				return sortPoints(points);
			case SortType.TIME_DOWN:
				return sortTimes(points);
			case SortType.PRICE_DOWN:
				return sortPrices(points);
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
		}
  }

	#handleModelEvent = (updateType) => {
		switch (updateType) {
			case UpdateType.MINOR:
				this.#clearPointList();
				this.#renderPoints();
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
    render(this.#tripEventsContainer, this.#noPointComponent, RenderPosition.BEFORE_END);
  }

  #renderSort = () => {
    render(this.#tripEventsContainer, this.#sortingComponent, RenderPosition.BEFORE_END);
    this.#sortingComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #handleSortTypeChange = (sortType) => {

    if  (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderPointList();

  }

}
