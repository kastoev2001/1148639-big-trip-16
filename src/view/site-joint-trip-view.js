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

const createNotPassedPath = function (points) {

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

const createStartAndEndTrip = function (points) {
  const endDate = points[0].dueDate.startDate;
  const startDate = points[points.length - 1].dueDate.startDate;

  if (startDate.month() === endDate.month()) {
    return `<p class="trip-info__dates">${startDate.format('MMM D')} — ${endDate.format('D')}</p>`;
  } else {
    return `<p class="trip-info__dates">${startDate.format('MMM D')} — ${endDate.format('MMM D')}</p>`;
  }
};

const createJointTripTemplate = function (points) {

  const notpassedPath = createNotPassedPath(points);
  const startAndendTrip = createStartAndEndTrip(points);
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
