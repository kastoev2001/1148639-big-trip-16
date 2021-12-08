import JointTripView from './view/site-joint-trip-view';
import MenuView from './view/site-menu-view';
import FilterView from './view/site-filter-view';
import SortingView from './view/site-sorting-view';
import TripEventsView from './view/site-trip-events-view';
import EditPointView from './view/site-edit-point-view';
import PointView from './view/site-point-view';

import { generateFilter } from './mock/filter';
import { generatePoint } from './mock/point';

import { RenderPosition, render } from './render';
import { sortPoints } from './utils';

const COUNT_LIST = 5;
const points = Array.from({ length: COUNT_LIST }, generatePoint);

const sortedPoints = sortPoints(points);
const filters = generateFilter(points);

const tripMainElement = document.querySelector('.trip-main');

const tripControlsNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripControlsFiltersElements = tripMainElement.querySelector('.trip-controls__filters');

render(tripControlsNavigationElement, new MenuView().element, RenderPosition.BEFORE_END);
render(tripControlsFiltersElements, new FilterView(filters).element, RenderPosition.BEFORE_END);

const tripEventsElement = new TripEventsView();

const pageMainElement = document.querySelector('.page-main');
const tripEvents = pageMainElement.querySelector('.trip-events');

render(tripEvents, new SortingView().element, RenderPosition.BEFORE_END);

render(tripMainElement, new JointTripView(sortedPoints).element, RenderPosition.AFTER_BEGIN);

render(tripEvents, tripEventsElement.element, RenderPosition.BEFORE_END);
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

  render(EventList.element, pointComponent.element, RenderPosition.BEFORE_END);
};

sortedPoints.forEach((point) => {
  renderPoint(tripEventsElement, point);
});