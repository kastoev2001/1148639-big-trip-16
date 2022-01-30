import AbstractView from './site-abstract-view';

const createFiltersTemplate = function (filters, currentFilter) {
  return filters.map((filter) => {
    const {name, type} = filter;
    return (
      `<div class="trip-filters__filter">
    <input 
    id="${name}"
    class="trip-filters__filter-input
    visually-hidden" type="radio"
    name="trip-filter"
    ${type === currentFilter ? 'checked' : ''}
    value="${type}">
    <label class="trip-filters__filter-label" for="${name}">${name}</label>
  </div>`
    );
  }).join('');
};

const createFilterTemplate = function  (fitlers, currentFilter) {
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
