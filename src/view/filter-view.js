import AbstractView from './abstract-view';

const createFiltersTemplate = (filters, currentFilter) => filters.map((filter) => {
  const { name, type, isPoints } = filter;
  return (
    `<div class="trip-filters__filter">
    <input 
    id="${name}"
    class="trip-filters__filter-input
    visually-hidden" type="radio"
    name="trip-filter"
    ${type === currentFilter ? 'checked' : ''}
    value="${type}"
    ${isPoints ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="${name}">${name}</label>
  </div>`
  );
}).join('');

const createFilterTemplate = (fitlers, currentFilter) => {
  const filtersTemplate = createFiltersTemplate(fitlers, currentFilter);
  return (
    `<form class="trip-filters" action="#" method="get">
  
    ${filtersTemplate}

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`
  );
};
export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null

  constructor(filters, currentFilter) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChangeHandler = callback;

    const filtersElement = this.element;

    filtersElement.addEventListener('click', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this._callback.filterTypeChangeHandler(evt.target.value);
  }
}
