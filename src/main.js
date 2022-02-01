import StatisticsView from './view/site-statistics-view';
import MenuView from './view/site-menu-view';
import JointTripView from './view/site-joint-trip-view';

import TripEventsPresenter from './presenter/trip-events-presenter';
import FilterPresenter from './presenter/filter-presenter';

import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import DestinationsModel from './model/destinations-model';
import ServicesModel from './model/services-model';

import ApiService from './api-servic';

import { sortPoints } from './utils/point';
import {RenderPosition, render, remove} from './utils/render';

import { MenuItem } from './const';

const AUTHORIZATION = 'Basic lsjk3nd2af';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

const apiService = new ApiService(END_POINT, AUTHORIZATION);

const TRIP_EVENTS_HIDDEN = 'trip-events--hidden';
const TRIP_TABS_ACTIVE = 'trip-tabs__btn--active';


const filterModel = new FilterModel();
const pointsModel = new PointsModel(apiService);
const destinationsModel = new DestinationsModel(apiService);
const servicesModel = new ServicesModel(apiService);


const mainElement = document.querySelector('.trip-main');
const navigationElement = mainElement.querySelector('.trip-controls__navigation');
const filtersElement = mainElement.querySelector('.trip-controls__filters');

const menuComponent = new MenuView();

const tableElement = menuComponent.element.querySelector(`[data-menu-item=${MenuItem.TABLE}]`);
const statsElement = menuComponent.element.querySelector(`[data-menu-item=${MenuItem.STATS}]`);

const bodyContainerElement = document.querySelector('.page-main .page-body__container');
const tripEventsElement = bodyContainerElement.querySelector('.trip-events');

let statisticsComponent = null;

const filterPresenter = new FilterPresenter(filtersElement, filterModel);
const tripEventPresenter = new TripEventsPresenter(tripEventsElement, pointsModel, filterModel, destinationsModel, servicesModel);

const switchInTable = () => {

  if (tableElement.classList.contains(TRIP_TABS_ACTIVE)) {
    return;
  }

  tripEventsElement.classList.remove(TRIP_EVENTS_HIDDEN);
  tableElement.classList.add(TRIP_TABS_ACTIVE);
  statsElement.classList.remove(TRIP_TABS_ACTIVE);
  remove(statisticsComponent);
  filterPresenter.init();
  tripEventPresenter.init();
};

const  switchInStats = () => {
  if (statsElement.classList.contains(TRIP_TABS_ACTIVE)) {
    return;
  }

  tableElement.classList.remove(TRIP_TABS_ACTIVE);
  statsElement.classList.add(TRIP_TABS_ACTIVE);
  filterPresenter.destroy();
  tripEventPresenter.destroy();
  tripEventsElement.classList.add(TRIP_EVENTS_HIDDEN);
  statisticsComponent = new StatisticsView(pointsModel.points);
  render(bodyContainerElement, statisticsComponent, RenderPosition.BEFORE_END);
};

const menuClickHalder = (menuItem) => {
  switch(menuItem) {
    case MenuItem.TABLE:
      switchInTable();
      break;
    case MenuItem.STATS:
      switchInStats();
      break;
  }
};

menuComponent.setMenuClickHandler(menuClickHalder);

const newPointElement = document.querySelector('.trip-main__event-add-btn');
const newPointClickHandler = (evt) => {
  evt.preventDefault();
  if (statsElement.classList.contains(TRIP_TABS_ACTIVE)) {
    switchInTable();

    tripEventPresenter.createPoint();
    newPointElement.disabled = true;

    return;
  }

  tripEventPresenter.createPoint();
  filterPresenter.init();
  newPointElement.disabled = true;
};

newPointElement.disabled = true;

newPointElement.addEventListener('click', newPointClickHandler);


tripEventPresenter.init();

pointsModel.init(destinationsModel, servicesModel).finally(() => {
  const sortedPoints = sortPoints(pointsModel.points);

  const jointTripComponent = new JointTripView(sortedPoints);

  newPointElement.disabled = false;

  render(mainElement, jointTripComponent, RenderPosition.AFTER_BEGIN);
  render(navigationElement, menuComponent, RenderPosition.BEFORE_END);

  filterPresenter.init();
});
