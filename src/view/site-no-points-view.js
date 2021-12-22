import AbstractView from './site-abstract-view';

const getNoPointsTemplate = function (text) {
  return (
    `<p class="trip-events__msg">${text}"</p>`
  );
};

export default class NoPointsWiew extends AbstractView{
  #text = null;

  constructor(text) {
    super();
    this.#text = text;
  }

  get template() {
    return getNoPointsTemplate(this.#text);
  }
}
