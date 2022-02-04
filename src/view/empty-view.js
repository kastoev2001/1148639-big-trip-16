import AbstractView from './abstract-view';

const createEmptyPointsTemplate = (text) => (
  `<p class="trip-events__msg">${text}"</p>`
);

export default class EmptyPointsWiew extends AbstractView {
  #text = null;

  constructor(text) {
    super();
    this.#text = text;
  }

  get template() {
    return createEmptyPointsTemplate(this.#text);
  }
}
