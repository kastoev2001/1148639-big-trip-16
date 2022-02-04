import AbstractView from './abstract-view';

const createNoPointsTemplate = function (text) {
  return (
    `<p class="trip-events__msg">${text}</p>`
  );
};

export default class NoPointsWiew extends AbstractView {
  #text = null;

  constructor(text) {
    super();
    this.#text = text;
  }

  get template() {
    return createNoPointsTemplate(this.#text);
  }
}
