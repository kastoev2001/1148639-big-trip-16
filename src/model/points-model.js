import { cloneArrayOfObjects } from '../utils/commonds';
import AbstractObservable from '../utils/pattern/abstract-observable';

import dayjs from 'dayjs';
import { UpdateType } from '../const';

export default class PointsModel extends AbstractObservable{
  #points = [];
  #apiService = null;

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  init = async (destinationsModel, servicesModel) => {
    await destinationsModel.init();
    await servicesModel.init();
    try {
      const points = await this.#apiService.points;
      this.#points = points.map(this.#adaptToClient);
    } catch (err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  get points() {
    return this.#points;
  }

  updatePoint = (updateType, update) => {
    const points = cloneArrayOfObjects(this.#points);
    const index = points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...points.slice(0, index),
      update,
      ...points.slice(index + 1)
    ];

    this._notify(updateType);
  }

  deletePoint = (updateType, update) => {
    const points = cloneArrayOfObjects(this.#points);
    const index = points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete undexisting point');
    }

    this.#points = [
      ...points.slice(0, index),
      ...points.slice(index + 1)
    ];

    this._notify(updateType);
  }

  addPoint = (updateType, update) => {
    const points = cloneArrayOfObjects(this.#points);
    this.#points = [
      update,
      ...points
    ];

    this._notify(updateType);
  }

  #adaptToClient = (point) => {
    const type = {
      name: point.type,
      services: [...point.offers.map((offer) => ({
        ...offer,
        service: offer.title
      }))]
    };

    const adaptedPoint = {
      id: point.id,
      dueDate: {
        startDate: dayjs(point['date_from']),
        endDate: dayjs(point['date_to'])
      },
      type,
      price: point['base_price'],
      destination: {
        ...point.destination,
      },
      isFavorite: point['is_favorite']
    };


    return adaptedPoint;
  }
}
