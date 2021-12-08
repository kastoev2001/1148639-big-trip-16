import { createElement } from '../render';

const createServicesTemplate =function (services) {
  return services.map((servicesElements) => {

    const isChecked = servicesElements.isChecked;

    if (!isChecked) {
      return null;
    }

    const service = servicesElements.service;
    const price = servicesElements.price;


    return `<li class="event__offer">
		<span class="event__offer-title">${service}</span>
			&plus;&euro;&nbsp;
		<span class="event__offer-price">${price}</span>
    </li>`;
  })
    .filter((service) => service !== null)
    .join('');
};

export const createPointTemplate = function (point) {

  const {dueDate, type, city, price, services, isFavorites} = point;

  const {startDate, endDate, gapDate} = dueDate;

  const startDateHour = startDate.format('hh');
  const startDateMinute = startDate.format('mm');

  const endDateHour = endDate.format('hh');
  const endDateMinute = endDate.format('mm');

  const date = startDate.format('MMM D');

  const gapDateHour = (gapDate.hour === 0)
    ? gapDate.minute
    : `${gapDate.hour}Ч ${gapDate.minute}М`;

  const fovoritesClassName = isFavorites
    ? 'event__favorite-btn--active'
    : '';

  const resultPrice =  price.overallPrice !== null
    ? price.overallPrice
    : price.initialPrice;


  return (
    `<li class="trip-events__item">
<div class="event">
	<time class="event__date" datetime="2019-03-18">${date}</time>
	<div class="event__type">
		<img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
	</div>
	<h3 class="event__title">${type} ${city}</h3>
	<div class="event__schedule"> 
		<p class="event__time">
			<time class="event__start-time" datetime="2019-03-18T10:30">${startDateHour}:${startDateMinute}</time>
			&mdash;
			<time class="event__end-time" datetime="2019-03-18T11:00">${endDateHour}:${endDateMinute}</time>
		</p>
		<p class="event__duration">${gapDateHour}</p>
	</div>
	<p class="event__price">
		&euro;&nbsp;<span class="event__price-value">${resultPrice}</span>
	</p>
	<h4 class="visually-hidden">Offers:</h4>
	<ul class="event__selected-offers">
	${services !== null
      ? createServicesTemplate(services)
      : '<li class="event__offer"></li>'}
	</ul>
	<button class="event__favorite-btn ${fovoritesClassName}" type="button">
		<span class="visually-hidden">Add to favorite</span>
		<svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
			<path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
		</svg>
	</button>
	<button class="event__rollup-btn" type="button">
		<span class="visually-hidden">Open event</span>
	</button>
</div>
</li>`
  );
};

export default class PointView {
  #element = null;
  #point = null;

  constructor(point) {
    this.#point = point;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.tempalte);
    }

    return this.#element;
  }

  get tempalte() {
    return createPointTemplate(this.#point);
  }

  removeElement() {
    this.#element = null;
  }
}
