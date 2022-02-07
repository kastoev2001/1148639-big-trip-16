import StatisticsView from './view/statistics-view';
import MenuView from './view/menu-view';

import TripEventsPresenter from './presenter/trip-events-presenter';
import FilterPresenter from './presenter/filter-presenter';
import JointTripPresetner from './presenter/joint-trip-presetner';

import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import DestinationsModel from './model/destinations-model';
import ServicesModel from './model/services-model';

import ApiService from './api-service';

import { RenderPosition, render, remove } from './utils/render';
import { MenuItem } from './const';

const AUTHORIZATION = 'Basic lsjk3nd2af';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

const CLASS_TRIP_EVENTS_HIDDEN = 'trip-events--hidden';
const CLASS_TRIP_TABS_ACTIVE = 'trip-tabs__btn--active';

const mainElement = document.querySelector('.trip-main');
const navigationElement = mainElement.querySelector('.trip-controls__navigation');
const filtersElement = mainElement.querySelector('.trip-controls__filters');

const mainBodyElement = document.querySelector('.page-main .page-body__container');
const eventsTripsElement = mainBodyElement.querySelector('.trip-events');

const newPointElement = document.querySelector('.trip-main__event-add-btn');

const menuComponent = new MenuView();

const tableElement = menuComponent.element.querySelector(`[data-menu-item=${MenuItem.TABLE}]`);
const statsElement = menuComponent.element.querySelector(`[data-menu-item=${MenuItem.STATS}]`);

const service = new ApiService(END_POINT, AUTHORIZATION);

const filterModel = new FilterModel();
const pointsModel = new PointsModel(service);
const destinationsModel = new DestinationsModel(service);
const servicesModel = new ServicesModel(service);

const filterPresenter = new FilterPresenter(filtersElement, filterModel, pointsModel);
const jointTripPresetner = new JointTripPresetner(mainElement, pointsModel);
const tripEventPresenter = new TripEventsPresenter(eventsTripsElement, pointsModel, filterModel, destinationsModel, servicesModel);

let statisticsComponent = null;

const switchInTable = () => {

  if (tableElement.classList.contains(CLASS_TRIP_TABS_ACTIVE)) {
    return;
  }

  eventsTripsElement.classList.remove(CLASS_TRIP_EVENTS_HIDDEN);
  tableElement.classList.add(CLASS_TRIP_TABS_ACTIVE);
  statsElement.classList.remove(CLASS_TRIP_TABS_ACTIVE);

  remove(statisticsComponent);

  filterPresenter.init();
  tripEventPresenter.init();
};

const switchInStats = () => {
  if (statsElement.classList.contains(CLASS_TRIP_TABS_ACTIVE)) {
    return;
  }

  tableElement.classList.remove(CLASS_TRIP_TABS_ACTIVE);
  statsElement.classList.add(CLASS_TRIP_TABS_ACTIVE);
  eventsTripsElement.classList.add(CLASS_TRIP_EVENTS_HIDDEN);

  filterPresenter.destroy();
  tripEventPresenter.destroy();

  statisticsComponent = new StatisticsView(pointsModel.get);

  render(mainBodyElement, statisticsComponent, RenderPosition.BEFORE_END);
};

const tabsClickHandler = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      switchInTable();
      break;
    case MenuItem.STATS:
      switchInStats();
      break;
  }
};

const newPointClickHandler = (evt) => {
  evt.preventDefault();

  if (statsElement.classList.contains(CLASS_TRIP_TABS_ACTIVE)) {
    switchInTable();

    tripEventPresenter.createPoint();
    newPointElement.disabled = true;

    return;
  }

  tripEventPresenter.createPoint();
  filterPresenter.init();

  newPointElement.disabled = true;
};

menuComponent.setTabsClickHandler(tabsClickHandler);

newPointElement.disabled = true;

newPointElement.addEventListener('click', newPointClickHandler);

tripEventPresenter.init();

pointsModel.init(destinationsModel, servicesModel).finally(() => {
  newPointElement.disabled = false;

  render(navigationElement, menuComponent, RenderPosition.BEFORE_END);

  jointTripPresetner.init();
  filterPresenter.init();
});
