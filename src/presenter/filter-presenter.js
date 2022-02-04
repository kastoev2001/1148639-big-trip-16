import FilterView from '../view/filter-view';

import { FilterType, UpdateType, } from '../const';
import { RenderPosition, render, replace, remove, } from '../utils/render';
import { Filter } from '../utils/filter';
import { cloneArrayOfObjects } from '../utils/commonds';

export default class FilterPresenter {
  #filtersContainer = null;

  #filterModel = null;
  #pointsModel = null;

  #filterComponent = null;


  constructor(filtersContainer, filterModel, pointsModel) {
    this.#filtersContainer = filtersContainer;

    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    return cloneArrayOfObjects(this.#pointsModel.points);
  }

  get filters() {
    const points = this.points;
    return [
      {
        type: FilterType.EVERYTHING,
        name: 'Everything',
      },
      {
        type: FilterType.FUTURE,
        name: 'Future',
        isPoints: Filter[FilterType.FUTURE](points).length === 0,
      },
      {
        type: FilterType.PAST,
        name: 'Past',
        isPoints: Filter[FilterType.PAST](points).length === 0,
      },
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#filterTypeChangeHandler);

    if (!prevFilterComponent) {
      render(this.#filtersContainer, this.#filterComponent, RenderPosition.BEFORE_END);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  destroy = () => {
    remove(this.#filterComponent);
    this.#filterComponent = null;

    this.#filterModel.setFilter(FilterType.EVERYTHING, FilterType.EVERYTHING);

  }

  #handleModelEvent = () => {

    this.init();
  }

  #filterTypeChangeHandler = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(filterType, UpdateType.MINOR);
  }

}
