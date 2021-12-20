import MenuView from './view/site-menu-view';
import FilterView from './view/site-filter-view';
import JointTripView from './view/site-joint-trip-view';
import TripEventsPresenter from './presenter/trip-events-presenter';

import { generateFilter } from './mock/filter';
import { generatePoint } from './mock/point';

import { sortPoints } from './utils/point';
import {RenderPosition, render, } from './utils/render';

const COUNT_LIST = 10;

const points = Array.from({ length: COUNT_LIST }, generatePoint);
const sortedPoints = sortPoints(points);

const tripMainElement = document.querySelector('.trip-main');

const tripControlsNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripControlsFiltersElements = tripMainElement.querySelector('.trip-controls__filters');

let MenuComponent = new MenuView();
let JointTripComponent = new JointTripView(sortedPoints);

render(tripControlsNavigationElement, MenuComponent, RenderPosition.BEFORE_END);
render(MenuComponent, JointTripComponent, RenderPosition.BEFORE_END);

const filters = generateFilter(points);

render(tripControlsFiltersElements, new FilterView(filters), RenderPosition.BEFORE_END);

const tripEvents = document.querySelector('.trip-events');

const tripEventPresenter = new TripEventsPresenter(tripEvents);

tripEventPresenter.init(points);
