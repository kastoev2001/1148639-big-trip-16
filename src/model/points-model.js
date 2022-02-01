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

  addPoint = async (updateType, update) => {
    const points = cloneArrayOfObjects(this.#points);
    try {
      const response = await this.#service.addPoint(update);
      const newPoint = this.#adaptToClient(response);

      this.#points = [
        newPoint,
        ...points
      ];

      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\t add point');
    }
  }

  deletePoint = async (updateType, update) => {
    const points = cloneArrayOfObjects(this.#points);
    const index = points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete undexisting point');
    }

    try {
      await this.#service.deletePoint(update);

      this.#points = [
        ...points.slice(0, index),
        ...points.slice(index + 1)
      ];

      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete point');
    }

    this.#points = [
      ...points.slice(0, index),
      ...points.slice(index + 1)
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
      ...point,
      dueDate: {
        startDate: dayjs(point['date_from']),
        endDate: dayjs(point['date_to'])
      },
      type,
      price: point['base_price'],
      isFavorite: point['is_favorite']
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];
    delete adaptedPoint['offers'];

    return adaptedPoint;
  }
}
