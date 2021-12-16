import AbstractView from './site-abstract-view';

const getEmptyPointsTemplate = function (text) {
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
    return getEmptyPointsTemplate(this.#text);
  }
}
