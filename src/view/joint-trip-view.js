import AbstractView from './abstract-view';

const createStartAndEndTrip = (date) => {

  if (!date) {
    return (
      `<p class="trip-info__dates"></p>
      <p class="trip-info__dates"></p>`
    );
  }

  const endDate = date.end;
  const startDate = date.start;

  if (startDate.month() === endDate.month()) {
    return `<p class="trip-info__dates">${startDate.format('MMM D')} — ${endDate.format('D')}</p>`;
  }

  return `<p class="trip-info__dates">${startDate.format('MMM D')} — ${endDate.format('MMM D')}</p>`;
};

const createAllPath = (cities) => {

  let allPath;

  if (cities.length > 3) {
    allPath = `${cities[0]} ... — ... ${cities[cities.length - 1]}`;

    return allPath;
  }

  allPath = cities.join(' — ');

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
