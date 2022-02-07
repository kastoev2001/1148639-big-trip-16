import JointTripView from '../view/joint-trip-view';

import { cloneArrayOfObjects } from '../utils/commonds';
import { sortPoints } from '../utils/point';
import { remove, render, RenderPosition, replace } from '../utils/render';

export default class JointTripPresetner {
  #mainElement = null;

  #jointTripComponent = null;

  #pointsModel = null;

  constructor(mainElement, pointsModel) {
    this.#mainElement = mainElement;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    return sortPoints(cloneArrayOfObjects(this.#pointsModel.get));
  }

  init = () => {
    const points = this.points;

    const prevJointTripComponent = this.#jointTripComponent;

    if (!points.length) {
      remove(this.#jointTripComponent);

      this.#jointTripComponent = null;

      return;
    }

    const overallPrice = this.#getOverallPraceTrip(points);
    const cities = this.#getCities(points);
    const date = this.#getStartAndEndDate(points);

    this.#jointTripComponent = new JointTripView(overallPrice, cities, date);

    if (prevJointTripComponent) {
      replace(this.#jointTripComponent, prevJointTripComponent);
      remove(prevJointTripComponent);

      return;
    }

    render(this.#mainElement, this.#jointTripComponent, RenderPosition.AFTER_BEGIN);

  }

  #handleModelEvent = () => {
    this.init();
  }

  #getOverallPraceTrip = (points) => {
    let overallPraceTrip = 0;

    for (const point of points) {
      if (point.type.services) {
        overallPraceTrip += point.type.services.reduce((a, b) => a + b.price, 0);
      }
      overallPraceTrip += point.price;
    }

    return overallPraceTrip;
  }

  #getCities = (points) => {
    const cities = points
      .map((point) => point.destination.name)
      .filter((city, i, arr) => city !== arr[i + 1]);

    return cities;
  }

  #getStartAndEndDate = (points) => {
    const date = {
      start: points[0].dueDate.startDate,
      end: points[points.length - 1].dueDate.startDate,
    };

    return date;
  }

}
