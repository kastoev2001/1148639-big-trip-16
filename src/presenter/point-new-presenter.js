import EditPointView from '../view/site-edit-point-view';

import dayjs from 'dayjs';

import { deepPoint } from '../utils/commonds';
import {remove, render, RenderPosition} from '../utils/render';

import { UserAction, UpdateType } from '../const';

const BLANK_POINT = {
  type: {
    name: 'taxi',
    services: []
  },
  destination: {
    name: '',
    description: null,
    pictures: null
  },
  price: 0,
  dueDate: {
    startDate: dayjs(),
    endDate: dayjs()
  },
  isFavorite: false
};

export default class PointPresenter {
  #pointListComponent = null
  #changeData = null

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
    const point = {
      ...BLANK_POINT,
      type: {
        ...BLANK_POINT.type,
        name: services[0].name
      },
      destination: {...destinations[0]}
    };

    this.#editPointComponent = new EditPointView(point, destinations, services);

    this.#editPointComponent.setPointRollupClickHandler(this.#pointRollupClickHandler);
    this.#editPointComponent.setDeleteFormClickHandler(this.#deleteFormClickHandler);
    this.#editPointComponent.setPointFormSubmitHandler(this.#pointFormSubmitHandler);

    render(this.#pointListComponent, this.#editPointComponent, RenderPosition.AFTER_BEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);

  }

  destroy = () => {
    if (this.#editPointComponent === null) {
      return;
    }

    const newPointElement = document.querySelector('.trip-main__event-add-btn');

    newPointElement.disabled = false;

    remove(this.#editPointComponent);
    this.#editPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
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
      {...deepPoint(update)}
    );
  }

  #pointRollupClickHandler = () => {
    this.destroy();
  }
}
