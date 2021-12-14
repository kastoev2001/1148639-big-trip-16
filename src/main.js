import JointTripView from './view/site-joint-trip-view';
import MenuView from './view/site-menu-view';
import FilterView from './view/site-filter-view';
import SortingView from './view/site-sorting-view';
import TripEventsView from './view/site-trip-events-view';
import EmptyView from './view/site-empty-view';
import EditPointView from './view/site-edit-point-view';
import PointView from './view/site-point-view';

import { generateFilter } from './mock/filter';
import { generatePoint } from './mock/point';

import {RenderPosition, render, } from './render';
import { sortPoints } from './utils';


const EmptyFiter = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PAST: 'There are no past events now'
};

const COUNT_LIST = 10;
const points = Array.from({ length: COUNT_LIST }, generatePoint);

const tripMainElement = document.querySelector('.trip-main');

const tripControlsNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripControlsFiltersElements = tripMainElement.querySelector('.trip-controls__filters');

render(tripControlsNavigationElement, new MenuView().element, RenderPosition.BEFORE_END);

const tripEventsElement = new TripEventsView();

const pageMainElement = document.querySelector('.page-main');
const tripEvents = pageMainElement.querySelector('.trip-events');

render(tripEvents, new SortingView().element, RenderPosition.BEFORE_END);

const renderPoint = (EventList, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new EditPointView(point);

  const downArrowPointForm = pointComponent.element.querySelector('.event__rollup-btn');
  const upArrowPointForm = pointEditComponent.element.querySelector('.event__rollup-btn');
  const pointForm = pointEditComponent.element.querySelector('form');

  const replacePointToForm = () => {
    EventList.element.replaceChild(pointEditComponent.element, pointComponent.element);
  };

  const replaceFormToPoint = () => {
    EventList.element.replaceChild(pointComponent.element, pointEditComponent.element);
  };

  const EscKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', EscKeyDownHandler);
    }
  };

  const closePointForm = () => {
    replaceFormToPoint();
    document.removeEventListener('keydown', EscKeyDownHandler);
  };

  const PointFormSubmitHandler = (evt) => {
    evt.preventDefault();
    closePointForm();
  };

  const openPointForm = () => {
    replacePointToForm();
    document.addEventListener('keydown', EscKeyDownHandler);
  };

  const DownArrowPointFormClickHandler = () => {
    openPointForm();
  };

  const onUpArrowPointFormClick = () => {
    closePointForm();
  };

  downArrowPointForm.addEventListener('click', DownArrowPointFormClickHandler);

  upArrowPointForm.addEventListener('click', onUpArrowPointFormClick);

  pointForm.addEventListener('submit', PointFormSubmitHandler);

  render(EventList.element, pointComponent.element, RenderPosition.BEFORE_END);
};

if (points.length === 0) {

  render(tripEvents, new EmptyView(EmptyFiter.EVERYTHING).element, RenderPosition.BEFORE_END);

} else {

  const sortedPoints = sortPoints(points);
  const filters = generateFilter(points);

  render(tripMainElement, new JointTripView(sortedPoints).element, RenderPosition.AFTER_BEGIN);
  render(tripControlsFiltersElements, new FilterView(filters).element, RenderPosition.BEFORE_END);


  sortedPoints.forEach((point) => {
    renderPoint(tripEventsElement, point);
  });

  render(tripEvents, tripEventsElement.element, RenderPosition.BEFORE_END);
}
