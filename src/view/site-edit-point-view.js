import AbstractView from './site-abstract-view';
import { nanoid } from 'nanoid';

import { types, cities } from '../const';
const createEditPointDescriptionTemplate = function (description, pics) {
  return (
    `${description
      ? `<section class="event__section  event__section--destination">
		<h3 class="event__section-title  event__section-title--destination">Destination</h3>
		<p class="event__destination-description">${description}</p>
		${`<div class="event__photos-container">
			<div class="event__photos-tape">
			${pics.map((link) => `<img class="event__photo" src="${link}" alt="Event photo">`).join('')}
			</div>
			</div>`}
			</section>`
      : ''}`
  );
};

const createEditPointServicesTemplate = function (services) {

  return (
    `${services
      ? `<section class="event__section  event__section--offers">
	<h3 class="event__section-title  event__section-title--offers">Offers</h3>
	<div class="event__available-offers">
	  ${services.map((servicesElements) => {

      const serviceId = servicesElements.id;
      const service = servicesElements.service;
      const price = servicesElements.price;
      const isChecked = servicesElements.isChecked;

      return (
        `<div class="event__offer-selector">
	         <input class="event__offer-checkbox  visually-hidden" id="${serviceId}" type="checkbox" name="event-offer-comfort" ${isChecked ? 'checked' : ''}>
	         <label class="event__offer-label" for="${serviceId}">
		       <span class="event__offer-title">${service}</span>
		       &plus;&euro;&nbsp;
		       <span class="event__offer-price">${price}</span>
	       </label>
       </div>`
      );
    })
      .join('')}
	</div>
	</section>`
      : ''}`
  );
};

const createTypesEvent = (currentType) => {

	return types
	  .map((type) => {
			const checked = type.name.toLowerCase() === currentType.toLowerCase()
			  ? 'checked'
				: '';
			return (
				`<div class="event__type-item">
					<input id="event-type-${type.name.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" ${checked} value="${type.name.toLowerCase()}">
					<label class="event__type-label  event__type-label--${type.name.toLowerCase()}" for="event-type-${type.name.toLowerCase()}-1">${type.name}</label>
				</div>`
			)
		})
	  .join('');
}

const createCityList = (cities) => {

	return cities
		.map((city) => (`<option value="${city}"></option>`))
		.join('');

}

const BLANK_POINT = {
	id: nanoid(),
  type: {
		name: 'Taxi',
		services: null
	},
  city: {
		name: 'Amsterdam',
		description: null,
		pics: null
	},
  price: null,
  dueDate: null,
	isFavorite: false
};

const createEditPointTemplate = function (point = {}) {
  const {
    type,
    city,
    price,
    dueDate
  } = point;

	const services = type.services;
	const description = city.description;
	const pics = city.pics;
	const citiesList = cities.map((city) => city.name);


  const startDate = dueDate.startDate.format('DD/MM/YY hh:mm');
  const endDate = dueDate.endDate.format('DD/MM/YY hh:mm');

  const servicesTemplate = createEditPointServicesTemplate(services);
  const descriptionTemplate = createEditPointDescriptionTemplate(description, pics);
	const typesEvent = createTypesEvent(type.name);
	const cityList = createCityList(citiesList);

  return (
    `<li class="trip-events__item">
	<form class="event event--edit" action="#" method="post">
		<header class="event__header">
			<div class="event__type-wrapper">
				<label class="event__type  event__type-btn" for="event-type-toggle-1">
					<span class="visually-hidden">Choose event type</span>
					<img class="event__type-icon" width="17" height="17" src="img/icons/${type.name}.png" alt="Event type icon">
				</label>
				<input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

				<div class="event__type-list">
					<fieldset class="event__type-group">
						<legend class="visually-hidden">Event type</legend>

						${typesEvent}

					</fieldset>
				</div>
			</div>

			<div class="event__field-group  event__field-group--destination">
				<label class="event__label  event__type-output" for="event-destination-1">
					${type.name}
				</label>
				<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city.name}" list="destination-list-1">
				
				<datalist id="destination-list-1">
				${cityList}
				</datalist>
			</div>

			<div class="event__field-group  event__field-group--time">
				<label class="visually-hidden" for="event-start-time-1">From</label>
				<input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}">
				&mdash;
				<label class="visually-hidden" for="event-end-time-1">To</label>
				<input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}">
			</div>

			<div class="event__field-group  event__field-group--price">
				<label class="event__label" for="event-price-1">
					<span class="visually-hidden">Price</span>
					&euro;
				</label>
				<input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
			</div>

			<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
			<button class="event__reset-btn" type="reset">Delete</button>
			<button class="event__rollup-btn" type="button">
				<span class="visually-hidden">Open event</span>
			</button>
		</header>
		<section class="event__details">
			${servicesTemplate}
			${descriptionTemplate}
		</section>
	</form>
  </li>`
  );
};

export default class EditPointView extends AbstractView {
	#point = null;
	
  constructor(point = BLANK_POINT) {
    super();
    this.#point = point;
  }

  get template() {
    return createEditPointTemplate(this.#point);
  }

  setPointRollupClickHandler = (callback) => {
    this._callback.pointRollupClick = callback;

    const pointRollupElement = this.element.querySelector('.event__rollup-btn');

    pointRollupElement.addEventListener('click', this.#pointRollupClickHandler);
  }

  #pointRollupClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.pointRollupClick();
  }

  setPointFormSubmitHandler = (callback) => {
    this._callback.pointFormSubmit = callback;

    const pointForm = this.element.querySelector('form');

    pointForm.addEventListener('submit', this.#pointFormSubmitHandler);
  }

  #pointFormSubmitHandler = (evt) => {
    evt.preventDefault();

    this._callback.pointFormSubmit();
  }
}
