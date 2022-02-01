import SmartView from './site-smart-view';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';
import he from 'he';

import { deepPoint } from '../utils/commonds';
import { isDateLess } from '../utils/point';

import 'flatpickr/dist/flatpickr.min.css';

const createEditPointDescriptionTemplate = function (description, pictures, isDescription) {
  return (
    `${isDescription
      ? `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    ${`<div class="event__photos-container">
      <div class="event__photos-tape">
      ${pictures.map((pics) => `<img class="event__photo" src="${pics.src}" alt="${pics.description}">`).join('')}
      </div>
      </div>`}
      </section>`
      : ''}`
  );
};

const createEditPointServicesTemplate = function (findedservices, isServices, selectedServices) {

  return (
    `${isServices
      ? `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
    ${findedservices.services.map((service) => {

      const serviceId = service.id;
      const serviceTitle = service.service;
      const price = service.price;
      const isChecked = selectedServices !== null
        ? selectedServices.some((selectedService) => selectedService.service === serviceTitle)
        : false;

      return (
        `<div class="event__offer-selector">
           <input class="event__offer-checkbox  visually-hidden" id="${serviceId}" type="checkbox" name="event-offer-comfort" ${isChecked ? 'checked' : ''}>
           <label class="event__offer-label" for="${serviceId}">
           <span class="event__offer-title">${serviceTitle}</span>
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

const createTypesEvent = (currentType, allServices) => (allServices
  .map((type) => {
    const checked = type.name.toLowerCase() === currentType.toLowerCase()
      ? 'checked'
      : '';
    return (
      `<div class="event__type-item">
        <input id="event-type-${type.name.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" ${checked} value="${type.name.toLowerCase()}">
        <label class="event__type-label  event__type-label--${type.name.toLowerCase()}" for="event-type-${type.name.toLowerCase()}-1">${type.name}</label>
      </div>`
    );
  })
  .join(''));

const createListCitiesDestination = (destinationList) => (destinationList
  .map((city) => (`<option value="${city}"></option>`))
  .join('')
);

const createEditPointTemplate = function (point = {}, allDestinations, allServices) {
  const {
    type,
    destination,
    isDescription,
    price,
    dueDate
  } = point;

  const selectedServices = type.services;
  const findedservices = allServices.find((service) => type.name.toUpperCase() === service.name.toUpperCase());
  const isServices = findedservices.services !== null;
  const currentDescription = destination.description;
  const currentPictures = destination.pictures;
  const listCities = allDestinations.map((element) => element.name);


  const startDate = dueDate.startDate.format('DD/MM/YY hh:mm');
  const endDate = dueDate.endDate.format('DD/MM/YY hh:mm');

  const servicesTemplate = createEditPointServicesTemplate(findedservices, isServices, selectedServices);
  const descriptionTemplate = createEditPointDescriptionTemplate(currentDescription, currentPictures, isDescription);
  const typesEvent = createTypesEvent(type.name, allServices);
  const listCitiesDestination = createListCitiesDestination(listCities);

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
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destination.name)}" list="destination-list-1">
        
        <datalist id="destination-list-1">
        ${listCitiesDestination}
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

export default class EditPointView extends SmartView {
  #allServices = null;
  #allDestinations = null;
  #datepickers = [];

  constructor(point, allDestinations, allServices) {
    super();
    this._date = EditPointView.parcePointToDate(point);
    this.#allDestinations = allDestinations;
    this.#allServices = allServices;

    this.#setInnderHandlers();
    this.#setDatepicker();
  }

  get template() {
    return createEditPointTemplate(this._date, this.#allDestinations, this.#allServices);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickers !== []) {
      this.#datepickers.forEach((datepicker) => datepicker.destroy());
      this.#datepickers = [];
    }
  }

  reset = (point) => this.updateDate(
    EditPointView.parcePointToDate(point)
  );

  restoreHandlers = () => {
    this.#setInnderHandlers();
    this.#setDatepicker();
    this.setPointRollupClickHandler(this._callback.pointRollupClick);
    this.setPointFormSubmitHandler(this._callback.pointFormSubmit);
  }

  #setDatepicker = () => {
    this.#datepickers.push(flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/Y H:i',
        defaultDate: this._date.dueDate.startDate.toString(),
        onClose: this.#startDateCloseHandler
      }
    ),flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/Y H:i',
        minDate: this._date.dueDate.startDate.toString(),
        defaultDate: this._date.dueDate.endDate.toString(),
        onClose: this.#endDateCloseHandler
      }));
  }

  #setInnderHandlers = () => {
    const typesEventElement = this.element.querySelector('.event__type-group');
    const destinationElement = this.element.querySelector('.event__input--destination');
    const priceElement = this.element.querySelector('.event__input--price');

    typesEventElement.addEventListener('click', this.#typesEventClickHandler);
    destinationElement.addEventListener('input', this.#destinationInputHandler);
    priceElement.addEventListener('input', this.#priceInputHandler);

  }

  #typesEventClickHandler = (evt) => {

    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    const inputElement = evt.target;

    const type = this.#allServices.find((fella) => fella.name.toLowerCase() === inputElement.value.toLowerCase());
    this.updateDate({
      ...deepPoint(this._date),
      type: {
        name: type.name,
        services: null
      },
      isServices: false,
    });
  }

  #destinationInputHandler = (evt) => {
    evt.preventDefault();
    const inputElement = evt.target;

    inputElement.value = this.#allDestinations.some((destination) => destination.name === inputElement.value)
      ? inputElement.value
      : '';

    if (inputElement.value === '') {
      return;
    }

    const findedDestination = this.#allDestinations.find((destination) => destination.name === inputElement.value);

    this.updateDate({
      destination: findedDestination
    });
  }

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    const inputElement = evt.target;
    const isValue = /^\d+$|^$/.test(evt.target.value);

    inputElement.value = isValue
      ? inputElement.value
      : inputElement.value.substring(0, inputElement.value.length - 1);

    this.updateDate({
      price: Number(inputElement.value)
    }, true);
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

  setDeleteFormClickHandler = (callback) => {
    this._callback.setDeleteFormClickHandler = callback;

    const deleteElement = this.element.querySelector('.event__reset-btn');

    deleteElement.addEventListener('click', this.#setDeleteFormClickHandler);
  }

  #setDeleteFormClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.setDeleteFormClickHandler(EditPointView.parceDateToPoint(this._date));
  }

  #pointFormSubmitHandler = (evt) => {
    evt.preventDefault();

    this._callback.pointFormSubmit(EditPointView.parceDateToPoint(this._date));
  }

  #startDateCloseHandler = ([userDate]) => {
    this.updateDate({
      dueDate: {
        startDate: dayjs(userDate),
        endDate: isDateLess(dayjs(userDate), this._date.dueDate.endDate) ? dayjs(userDate).hour(0).minute(0).second(0) : this._date.dueDate.endDate
      }
    });
  }

  #endDateCloseHandler = ([userDate]) => {
    this.updateDate({
      dueDate: {
        ...this._date.dueDate,
        endDate: dayjs(userDate)
      }
    });

  }

  static parcePointToDate = (point) => ({
    ...deepPoint(point),
    isServices: point.type.services !== null,
    isDescription: point.destination.description !== null
  });

  static parceDateToPoint = (date) => {
    const point = {
      ...deepPoint(date)
    };

    delete point.isServices;
    delete point.isDescription;

    return point;
  };
}
