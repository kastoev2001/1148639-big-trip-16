import AbstractView from './abstract-view';

const createStartAndEndTrip = (date) => {
  if (!date) {
    return '<p class="trip-info__dates"></p>';
  }

  const endDate = date.end;
  const startDate = date.start;

  let pathTime;

  if (startDate.month() === endDate.month()) {
    pathTime = `<p class="trip-info__dates">${startDate.format('MMM D')} — ${endDate.format('D')}</p>`;

    return pathTime;
  }

  pathTime = `<p class="trip-info__dates">${startDate.format('MMM D')} — ${endDate.format('MMM D')}</p>`;

  return pathTime;
};

const createAllPath = (cities) => {
  const LIMIT_SITIES = 3;
  const firstCity = cities[0];
  const lastCity = cities.length - 1;
  let allPath = '';

  if (cities.length > LIMIT_SITIES) {
    allPath = `<h1 class="trip-info__title">${firstCity} ... — ... ${cities[lastCity]}</h1>`;

    return allPath;
  }

  allPath = `<h1 class="trip-info__title">${cities.join(' — ')}</h1>`;

  return allPath;
};

const createJointTripTemplate = (overallPrice, cities, date) => {
  const allPath = createAllPath(cities);
  const startAndEndTrip = createStartAndEndTrip(date);

  return (
    `<section class="trip-main__trip-info  trip-info">
     <div class="trip-info__main">
       ${allPath}
      ${startAndEndTrip}
    </div>
   
     <p class="trip-info__cost">
       Total: &euro;&nbsp;<span class="trip-info__cost-value">${overallPrice ? overallPrice : '0'}</span>
     </p>
   </section>`
  );
};

export default class JointTripView extends AbstractView {
  #overallPrice = null;
  #cities = null;
  #date = null;

  constructor(overallPrice, cities, date) {
    super();
    this.#overallPrice = overallPrice;
    this.#cities = cities;
    this.#date = date;
  }

  get template() {
    return createJointTripTemplate(this.#overallPrice, this.#cities, this.#date);
  }
}
