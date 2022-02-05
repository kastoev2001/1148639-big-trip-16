import AbstractView from './abstract-view';

const createNoPointsTemplate = (text) => (
  `<p class="trip-events__msg">${text}</p>`
);

export default class NoPointsView extends AbstractView {
  #text = null;

  constructor(text) {
    super();

    this.#text = text;
  }

  get template() {
    return createNoPointsTemplate(this.#text);
  }
}
