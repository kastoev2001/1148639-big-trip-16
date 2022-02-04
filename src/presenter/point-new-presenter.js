import EditPointView from '../view/edit-point-view';
import dayjs from 'dayjs';

import { deepPoint, } from '../utils/commonds';
import { remove, render, RenderPosition, } from '../utils/render';

import { UserAction, UpdateType, } from '../const';

const Destination = {
  NAME: 'Chamonix',
  DESTINATION: 'Chamonix, in a middle of Europe, middle-eastern paradise, famous for its crowded street markets with the best street food in Asia.',
  PICTURES: [
    { src: 'http://picsum.photos/300/200?r=0.5442767253004888', description: 'Chamonix zoo' },
    { src: 'http://picsum.photos/300/200?r=0.9459422561320008', description: 'Chamonix city centre' },
    { src: 'http://picsum.photos/300/200?r=0.14330792188576758', description: 'Chamonix park' },
    { src: 'http://picsum.photos/300/200?r=0.05754116582269897', description: 'Chamonix central station' },
  ]
};

const BLANK_POINT = {
  type: {
    name: 'taxi',
    services: []
  },
  destination: {
    name: Destination.NAME,
    description: Destination.DESTINATION,
    pictures: Destination.PICTURES,
  },
  price: 0,
  dueDate: {
    startDate: dayjs(),
    endDate: dayjs(),
  },
  isFavorite: false,
};

export default class PointNewPresenter {
  #pointListComponent = null;
  #changeData = null;

  #destinationsModel = null;
  #servicesModel = null;

  #editPointComponent = null;

  constructor(pointListComponent, changeData, destinationsModel, servicesModel) {
    this.#pointListComponent = pointListComponent;
    this.#changeData = changeData;

    this.#destinationsModel = destinationsModel;
    this.#servicesModel = servicesModel;
  }

  init = () => {
    if (this.#editPointComponent !== null) {
      return;
    }

    const services = this.#servicesModel.services;
    const destinations = this.#destinationsModel.destinations;
    const point = BLANK_POINT;

    this.#editPointComponent = new EditPointView(point, destinations, services);

    this.#editPointComponent.setPointRollupClickHandler(this.#pointRollupClickHandler);
    this.#editPointComponent.setDeleteFormClickHandler(this.#deleteFormClickHandler);
    this.#editPointComponent.setPointFormSubmitHandler(this.#pointFormSubmitHandler);

    render(this.#pointListComponent, this.#editPointComponent, RenderPosition.AFTER_BEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);

  }

  destroy = () => {
    if (!this.#editPointComponent) {
      return;
    }

    const newPointElement = document.querySelector('.trip-main__event-add-btn');

    newPointElement.disabled = false;

    remove(this.#editPointComponent);
    this.#editPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving = () => {
    this.#editPointComponent.updateDate({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting = () => {
    const resetFormState = () => {
      this.#editPointComponent.updateDate({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editPointComponent.shake(resetFormState);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }

  #deleteFormClickHandler = () => {
    this.destroy();
  }

  #pointFormSubmitHandler = (update) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      { ...deepPoint(update) },
    );
  }

  #pointRollupClickHandler = () => {
    this.destroy();
  }
}
