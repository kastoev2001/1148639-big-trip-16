import JointTripView from './view/site-joint-trip-view';
import MenuView from './view/site-menu-view';
import FilterView from './view/site-filter-view';
import SortingView from './view/site-sorting-view';
import TripEventsView from './view/site-trip-events-view';
import EditPointView from './view/site-edit-point-view';
import PointView from './view/site-point-view';

import { generateFilter } from './mock/filter';
import { generatePoint } from './mock/point';

import {RenderPosition, render, } from './render';
import { getSortPoints } from './utils';

const COUNT_LIST = 5;
const points = Array.from({ length: COUNT_LIST }, generatePoint);

const sortPoints = getSortPoints(points);
const filters = generateFilter(points);

const tripMainElement = document.querySelector('.trip-main');

const tripControlsNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripControlsFiltersElements = tripMainElement.querySelector('.trip-controls__filters');

render(tripControlsNavigationElement, new MenuView().element, RenderPosition.BEFOREEND);
render(tripControlsFiltersElements, new FilterView(filters).element, RenderPosition.BEFOREEND);

const tripEventsElement = new TripEventsView();

const pageMainElement = document.querySelector('.page-main');
const tripEvents = pageMainElement.querySelector('.trip-events');

render(tripEvents, new SortingView().element, RenderPosition.BEFOREEND);

render(tripMainElement, new JointTripView(sortPoints).element, RenderPosition.AFTERBEGIN);

render(tripEvents, tripEventsElement.element, RenderPosition.BEFOREEND);
const renderPoint = (EventList, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new EditPointView(point);

  const pointOpen = pointComponent.element.querySelector('.event__rollup-btn');
  const onSubmitPointEdit = pointEditComponent.element.querySelector('form');

  const replacePointToForm = () => {
    EventList.element.replaceChild(pointEditComponent.element, pointComponent.element);
  };

  const replaceFormToPoint = () => {
    EventList.element.replaceChild(pointComponent.element, pointEditComponent.element);
  };

  pointOpen.addEventListener('click', () => {
    replacePointToForm();
  });

  onSubmitPointEdit.addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
  });

  render(EventList.element, pointComponent.element, RenderPosition.BEFOREEND);
};

sortPoints.forEach((point) => {
  renderPoint(tripEventsElement, point);
});
