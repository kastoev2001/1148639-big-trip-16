import { createElement } from '../render';

const getEmptyPointsTemplate = function (text) {
  return (
    `<p class="trip-events__msg">${text}"</p>`
  );
};

export default class EmptyPointsWiew {
  #element = null;
  #text = null;

  constructor(text) {
    this.#text = text;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return getEmptyPointsTemplate(this.#text);
  }

  removeElement() {
    this.#element = null;
  }
}
