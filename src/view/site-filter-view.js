import AbstractView from './site-abstract-view';

const filterTemplate = function (filter) {
  const {name, count} = filter;
  return (
    `<div class="trip-filters__filter">
	<input id="${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">
	<label class="trip-filters__filter-label" for="${name}">Everything ${count}</label>
</div>`
  );
};

const createFilterTemplate = function  (filterItems) {
  return (
    `<form class="trip-filters" action="#" method="get">
	
	${filterItems.map((filter) => filterTemplate(filter)).join('')}

	<button class="visually-hidden" type="submit">Accept filter</button>
</form>`
  );
};
export default class FilterView extends AbstractView {
  #filter = null;

  constructor(filter) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createFilterTemplate(this.#filter);
  }
}
