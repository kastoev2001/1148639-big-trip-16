import dayjs from 'dayjs';
import AbstractView from './site-abstract-view';

const getOverallPraceTrip = (points) => {
  let overallPraceTrip = 0;

  points.map((point) => {
    if (point.type.services !== null) {
      overallPraceTrip += point.type.services.reduce((a, b) => b.isChecked !== false ? a + b.price : a, 0);
      overallPraceTrip += point.price;

      return;
    }

    overallPraceTrip += point.price;
  });

  return overallPraceTrip;
};

const getNotPassedPath = function (points) {

  const sities = points
    .map((point) => point.city.name)
    .filter((city, i, arr) => {
      const instantElement = city;
      const nextElement = arr[i + 1];

      if (instantElement !== nextElement) {
        return instantElement;
      }

    })
    .join(' — ');


  return (
    `<h1 class="trip-info__title">${points ? sities : ''}</h1>`
  );
};

const getStartAndEndTrip = function (points) {
  let endDatePoint;
  let startDatePoint;

  if (points.length !== 0) {
    endDatePoint = dayjs(points[0].dueDate.startDate).format('MMM D');
    startDatePoint = dayjs(points[0].dueDate.startDate).format('MMM') !== dayjs(points[points.length - 1].dueDate.startDate).format('MMM')
      ? dayjs(points[points.length - 1].dueDate.startDate).format('MMM D')
      : dayjs(points[points.length - 1].dueDate.startDate).format('D');
  }

  return (
    `<p class="trip-info__dates"> ${points.length !== 0 ? `${endDatePoint} — ${startDatePoint}` : ''}</p>`
  );
};

const createJointTripTemplate = function (points) {

  const notpassedPath = getNotPassedPath(points);
  const startAndendTrip = getStartAndEndTrip(points);
  const overallPraceTrip = getOverallPraceTrip(points);


  return (
    `<section class="trip-main__trip-info  trip-info">
     <div class="trip-info__main">
       ${notpassedPath}
      ${startAndendTrip}
    </div>
   
     <p class="trip-info__cost">
       Total: &euro;&nbsp;<span class="trip-info__cost-value">${overallPraceTrip}</span>
     </p>
   </section>`
  );
};

export default class JointTripView extends AbstractView {
  #points = null;

  constructor(points) {
    super();
    this.#points = points;
  }

  get template() {
    return createJointTripTemplate(this.#points);
  }
}
