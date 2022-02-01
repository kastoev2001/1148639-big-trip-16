import { cloneArrayOfObjects } from '../utils/commonds';
import AbstractObservable from '../utils/pattern/abstract-observable';

import dayjs from 'dayjs';
import { UpdateType } from '../const';

export default class PointsModel extends AbstractObservable{
  #points = [];
  #service = null;

  constructor(service) {
    super();
    this.#service = service;
  }

  init = async (destinationsModel, servicesModel) => {
    await destinationsModel.init();
    await servicesModel.init();
    try {
      const points = await this.#service.points;
      this.#points = points.map(this.#adaptToClient);
    } catch (err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  get points() {
    return this.#points;
  }

  updatePoint = async (updateType, update) => {
    const points = cloneArrayOfObjects(this.#points);
    const index = points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#service.updatePoint(update);
      const adaptedPoint = this.#adaptToClient(response);

      this.#points = [
        ...points.slice(0, index),
        adaptedPoint,
        ...points.slice(index + 1)
      ];

      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\t update point');
    }
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
      services: point.offers.map((offer) => ({
        ...offer,
        service: offer.title
      }))
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
