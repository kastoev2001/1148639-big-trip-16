import AbstractView from './site-abstract-view';

const createtripEventsTemplate = () => (
  '<ul class="trip-events__list"></ul>'
);

export default class TripEventsView extends AbstractView{

  get template() {
    return createtripEventsTemplate();
  }
}
