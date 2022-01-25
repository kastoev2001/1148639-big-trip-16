import MenuView from './view/site-menu-view';
import JointTripView from './view/site-joint-trip-view';

import TripEventsPresenter from './presenter/trip-events-presenter';
import FilterPresenter from './presenter/filter-presenter';

import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';

import { generatePoint } from './mock/point';

import { sortPoints } from './utils/point';
import {RenderPosition, render, } from './utils/render';

const COUNT_LIST = 5;

const points = Array.from({ length: COUNT_LIST }, generatePoint);
const sortedPoints = sortPoints(points);

const pointsModel = new PointsModel();

pointsModel.points = points;

const filterModel = new FilterModel();

const mainElement = document.querySelector('.trip-main');

const navigationElement = mainElement.querySelector('.trip-controls__navigation');


const MenuComponent = new MenuView();
const JointTripComponent = new JointTripView(sortedPoints);

render(navigationElement, MenuComponent, RenderPosition.BEFORE_END);
render(MenuComponent, JointTripComponent, RenderPosition.BEFORE_END);

const filtersElement = mainElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const filterPresenter = new FilterPresenter(filtersElement, filterModel);
const tripEventPresenter = new TripEventsPresenter(tripEventsElement, pointsModel, filterModel);

filterPresenter.init();
tripEventPresenter.init();

const newPointElement = document.querySelector('.trip-main__event-add-btn');
const newPointClickHandler = (evt) => {
  evt.preventDefault();
  tripEventPresenter.createPoint();
  filterPresenter.init();
  newPointElement.disabled = true;
};

newPointElement.addEventListener('click', newPointClickHandler);
