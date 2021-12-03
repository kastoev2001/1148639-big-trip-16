import { createJointTripTemplate } from './view/site-joint-trip-view';
import { createMenuTemplate } from './view/site-menu-view';
import { createFilterTemplate } from './view/site-filter-view';
import { createSortingTemplate } from './view/site-sorting-view';
import { createContentTemplate } from './view/site-content-view';
import { createEditPointTemplate } from './view/site-edit-point-view';
import { createPointTemplate } from './view/site-point-view';

import { generateFilter } from './mock/filter';
import { generatePoint } from './mock/point';

import { renderTemplate, renderPosition } from './render';

const COUNT_LIST = 4;

const points = Array.from({ length: COUNT_LIST }, generatePoint);
const filters = generateFilter(points);

const tripMainElement = document.querySelector('.trip-main');

const tripControlsNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripControlsFilters = tripMainElement.querySelector('.trip-controls__filters');

const pageMainElement = document.querySelector('.page-main');
const tripEvents = pageMainElement.querySelector('.trip-events');

renderTemplate(tripControlsNavigationElement, createJointTripTemplate(points), renderPosition.BEFOREEND);
renderTemplate(tripControlsNavigationElement, createMenuTemplate(), renderPosition.BEFOREEND);
renderTemplate(tripControlsFilters, createFilterTemplate(filters), renderPosition.BEFOREEND);
renderTemplate(tripEvents, createSortingTemplate(), renderPosition.BEFOREEND);
renderTemplate(tripEvents, createContentTemplate(), renderPosition.BEFOREEND);

const tripEventsListElement = pageMainElement.querySelector('.trip-events__list');

renderTemplate(tripEventsListElement, createEditPointTemplate(points[0]), renderPosition.BEFOREEND);

for (let i = 1; i < COUNT_LIST; i++) {

  renderTemplate(tripEventsListElement, createPointTemplate(points[i]), renderPosition.BEFOREEND);

}
generatePoint();
