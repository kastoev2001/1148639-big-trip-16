import AbstractView from './site-abstract-view';

const createEmptyPointsTemplate = function (text) {
  return (
    `<p class="trip-events__msg">${text}"</p>`
  );
};

export default class EmptyPointsWiew extends AbstractView{
  #text = null;

  constructor(text) {
    super();
    this.#text = text;
  }

  get template() {
    return createEmptyPointsTemplate(this.#text);
  }
}
