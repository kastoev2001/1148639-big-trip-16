import SortingView from '../view/site-sorting-view';
import EventListView from '../view/site-event-list-view';
import NoPointView from '../view/site-no-points-view';
import PointPresenter from './point-presenter';

import { render, RenderPosition } from '../utils/render';
import { sortPoints } from '../utils/point';

const EmptyFiter = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PAST: 'There are no past events now'
};

export default class TripEventsPresenter {
  #tripEventsContainer = null;

  #sortingComponent = new SortingView();
  #eventListComponent = new EventListView();
  #noPointComponent = new NoPointView(EmptyFiter.EVERYTHING);

	#pointList = [];
	#sortedPoints = [];

	constructor(tripEventsContainer) {
		this.#tripEventsContainer = tripEventsContainer;
	}

	init = (pointList) => {
		this.#pointList = [...pointList];
		this.#sortedPoints = sortPoints(this.#pointList);

		this.#renderTripEvents();
	}

  #renderPoint = (point) => {
		const pointPresenter = new PointPresenter(this.#eventListComponent);
		pointPresenter.init(point);
	}

	#renderPoints = () => {
		this.#sortedPoints.forEach((point) => {
    this.#renderPoint(point);
  });
	}

	#renderPointList = () => {
		render(this.#tripEventsContainer, this.#eventListComponent, RenderPosition.BEFORE_END);
		this.#renderPoints();
	}

  #renderTripEvents = () => {
		if (this.#pointList.length === 0) {

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
	}

}