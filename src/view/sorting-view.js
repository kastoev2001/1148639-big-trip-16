import AbstractView from './abstract-view';
import { SortType } from '../const';

export const createSortingTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
      <label class="trip-sort__btn" for="sort-day" data-sort-type="${SortType.DEFAULT}">Day</label>
    </div>
  
    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>
  
    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
      <label class="trip-sort__btn" for="sort-time" data-sort-type="${SortType.TIME_DOWN}">Time</label>
    </div>
  
    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
      <label class="trip-sort__btn" for="sort-price" data-sort-type="${SortType.PRICE_DOWN}">Price</label>
    </div>
  
    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
      <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>`
);

export default class SortingView extends AbstractView {
  get template() {
    return createSortingTemplate();
  }

  setTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;

    this.element.addEventListener('click', this.#typeChengeHandler);
  }

  #typeChengeHandler = (evt) => {
    const currentSortType = evt.target.dataset.sortType;
    const chengedType = Object.values(SortType).some((sortType) => sortType === currentSortType)
      ? currentSortType
      : '';

    if (evt.target.tagName !== 'LABEL' || chengedType === '') {
      return;
    }

    this._callback.sortTypeChange(currentSortType);
  }
}
