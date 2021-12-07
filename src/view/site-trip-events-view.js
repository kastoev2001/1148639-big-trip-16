import {createElement} from '../render';

const createtripEventsTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TripEventsView {
  #element = null


  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createtripEventsTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
