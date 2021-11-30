import { createMenuTemplate } from './view/site-menu-view';
import { createFilterTemplate } from './view/site-filter-view';
import { createSortingTemplate } from './view/site-sorting-view';
import { createContentTemplate } from './view/site-content-view';
import { createEditPointTemplate } from './view/site-edit-point-view';
import { createPointTemplate } from './view/site-point-view';

import { renderTemplate, renderPosition } from './render';

const tripMainElement = document.querySelector('.trip-main');
const tripControlsNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripControlsFilters = tripMainElement.querySelector('.trip-controls__filters');

const pageMainElement = document.querySelector('.page-main');
const tripEvents = pageMainElement.querySelector('.trip-events');

renderTemplate(tripControlsNavigationElement, createMenuTemplate(), renderPosition.BEFOREEND);
renderTemplate(tripControlsFilters, createFilterTemplate(), renderPosition.BEFOREEND);
renderTemplate(tripEvents, createSortingTemplate(), renderPosition.BEFOREEND);
renderTemplate(tripEvents, createContentTemplate(), renderPosition.BEFOREEND);

const COUNT_LIST = 4;

const tripEventsListElement = pageMainElement.querySelector('.trip-events__list');

renderTemplate(tripEventsListElement, createEditPointTemplate(), renderPosition.BEFOREEND);

for (let i = 1; i < COUNT_LIST; i++) {
  renderTemplate(tripEventsListElement, createPointTemplate(), renderPosition.BEFOREEND);

}
