import SmartView from './smart-view';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';
import he from 'he';

import { deepPoint } from '../utils/commonds';
import { isDateLess } from '../utils/point';

import 'flatpickr/dist/flatpickr.min.css';

const createEditPointDescriptionTemplate = (description, pictures, isDescription) => (
  `${isDescription
    ? `<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${description}</p>
  ${pictures.length
    ? `<div class="event__photos-container">
    <div class="event__photos-tape">
    ${pictures.map((pics) => `<img class="event__photo" src="${pics.src}" alt="${pics.description}">`).join('')}
    </div>
    </div>`
    : ''}
    </section>`
    : ''}`
);

const createEditPointServicesTemplate = (findedservices, isServices, selectedServices, isDisabled) => (
  `${isServices
    ? `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
  ${findedservices.services.map((service) => {
    const serviceId = service.id;
    const title = service.title;
    const price = service.price;
    const isChecked = selectedServices
      ? selectedServices.some((selectedService) => selectedService.id === serviceId)
      : false;

    return (
      `<div class="event__offer-selector">
        <input
        class="event__offer-checkbox  visually-hidden"
        id="${serviceId}" type="checkbox"
        name="event-offer-comfort"
        ${isChecked ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}>
        <label class="event__offer-label" for="${serviceId}">
        <span class="event__offer-title">${title}</span>
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

const createTypesEvent = (currentType, allServices) => (allServices
  .map((type) => {
    const name = type.name[0].toUpperCase() + type.name.slice(1);
    const checked = type.name === currentType
      ? 'checked'
      : '';

    return (
      `<div class="event__type-item">
        <input 
        id="event-type-${type.name.toLowerCase()}-1"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        ${checked}
        value="${type.name.toLowerCase()}">
        <label class="event__type-label  event__type-label--${type.name.toLowerCase()}"
        for="event-type-${type.name.toLowerCase()}-1">${name}</label>
      </div>`
    );
  })
  .join(''));

const createDestinationListDestination = (destinationList) => (destinationList
  .map((city) => (`<option value="${city}"></option>`))
  .join('')
);

const createEditPointTemplate = (point = {}, allDestinations, allServices) => {
  const {
    type,
    destination,
    isDescription,
    isDeleting,
    isSaving,
    isDisabled,
    dueDate,
    isEdit,
  } = point;
  const price = point.price > 0 ? String(point.price) : '';

  const selectedServices = type.services;
  const findedservices = allServices.find((service) => type.name.toUpperCase() === service.name.toUpperCase());
  const isServices = findedservices.services.length > 0;
  const description = destination.description;
  const pictures = destination.pictures;
  const destinationList = allDestinations.map((city) => city.name);

  const startDate = dueDate.startDate.format('DD/MM/YY hh:mm');
  const endDate = dueDate.endDate.format('DD/MM/YY hh:mm');

  const servicesTemplate = createEditPointServicesTemplate(findedservices, isServices, selectedServices, isDisabled);
  const descriptionTemplate = createEditPointDescriptionTemplate(description, pictures, isDescription);
  const typesEvent = createTypesEvent(type.name, allServices);
  const destinationListDestination = createDestinationListDestination(destinationList);

  const deleteValue = isDeleting ? 'Deleting...' : 'Delete';
  const cancelValue = 'Cancel';

  return (
    `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type.name}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

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
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" required name="event-destination" value="${he.encode(destination.name)}" ${isDisabled ? 'disabled' : ''} list="destination-list-1">
        
        <datalist id="destination-list-1">
        ${destinationListDestination}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${he.encode(startDate)}" ${isDisabled ? 'disabled' : ''}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${he.encode(endDate)}" ${isDisabled ? 'disabled' : ''}>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" required name="event-price" value="${he.encode((price))}" ${isDisabled ? 'disabled' : ''}>
      </div>

      <button class="event__save-btn  btn  btn--blue"
      ${isDisabled ? 'disabled' : ''}
       type="submit">${isSaving ? 'Saving...' : 'Save'}
      </button>
      <button class="event__reset-btn" type="reset"
      ${isDisabled ? 'disabled' : ''}>
      ${isEdit ? deleteValue : cancelValue}</button>
      ${isEdit
      ? `<button class="event__rollup-btn" type="button">
           <span class="visually-hidden">Open event</span>
         </button>`
      : ''}
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
  #allServices = [];
  #allDestinations = [];
  #datepickers = [];

  constructor(point, allDestinations, allServices) {
    super();

    this.#allDestinations = allDestinations;
    this.#allServices = allServices;
    this._data = EditPointView.parcePointToDate(point);

    this.#setInnderHandlers();
    this.#setDatepicker();
  }

  get template() {
    return createEditPointTemplate(this._data, this.#allDestinations, this.#allServices);
  }

  reset = (point) => this.updateDate(
    EditPointView.parcePointToDate(point)
  );

  removeElement = () => {
    super.removeElement();

    this.#destroyDatepickers();
  }

  #destroyDatepickers = () => {
    if (this.#datepickers.length) {
      return;
    }

    this.#datepickers.forEach((datepicker) => datepicker.destroy());
    this.#datepickers = [];
  }

  restoreHandlers = () => {
    this.#setInnderHandlers();
    this.#setDatepicker();
    this.setRollupClickHandler(this._callback.pointRollupClick);
    this.setFormSubmitHandler(this._callback.pointFormSubmit);
    this.setDeleteFormClickHandler(this._callback.deleteFormClick);
  }

  #setInnderHandlers = () => {
    const typesEventElement = this.element.querySelector('.event__type-group');
    const destinationElement = this.element.querySelector('.event__input--destination');
    const priceElement = this.element.querySelector('.event__input--price');
    const servicesElement = this.element.querySelector('.event__available-offers');

    typesEventElement.addEventListener('click', this.#typesEventClickHandler);
    priceElement.addEventListener('input', this.#priceInputHandler);
    destinationElement.addEventListener('input', this.#destinationInputHandler);
    destinationElement.addEventListener('focus', this.#destinationFocusHandler);
    destinationElement.addEventListener('blur', this.#destinationBlurHandler);

    if (servicesElement) {
      servicesElement.addEventListener('click', this.#serviceToggleEvent);
    }
  }

  setRollupClickHandler = (callback) => {
    if (this._data.isDisabled) {
      return;
    }

    const pointRollupElement = this.element.querySelector('.event__rollup-btn');

    this._callback.pointRollupClick = callback;

    if (this._data.isEdit) {
      pointRollupElement.addEventListener('click', this.#rollupClickHandler);
    }
  }

  #rollupClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.pointRollupClick();
  }

  setFormSubmitHandler = (callback) => {
    const pointForm = this.element.querySelector('form');

    this._callback.pointFormSubmit = callback;

    pointForm.addEventListener('submit', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    this._callback.pointFormSubmit(EditPointView.parceDateToPoint(this._data));
  }

  setDeleteFormClickHandler = (callback) => {
    const deleteElement = this.element.querySelector('.event__reset-btn');

    this._callback.deleteFormClick = callback;

    deleteElement.addEventListener('click', this.#deleteFormClickHandler);
  }

  #deleteFormClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.deleteFormClick(EditPointView.parceDateToPoint(this._data));
  }

  #serviceToggleEvent = (evt) => {
    const inputElement = evt.target;

    if (inputElement.tagName !== 'INPUT') {
      return;
    }

    const selectedType = this._data.type;
    const serviceId = Number(inputElement.id);
    const index = selectedType.services.findIndex((service) => service.id === serviceId);

    if (index >= 0) {
      this.updateDate({
        type: {
          name: selectedType.name,
          services: [
            ...selectedType.services.slice(0, index),
            ...selectedType.services.slice(index + 1),
          ],
        },
      });

      return;
    }

    const findedType = this.#allServices.find((service) => selectedType.name === service.name);
    const selectedService = findedType.services.find((service) => service.id === serviceId);

    this.updateDate({
      type: {
        name: selectedType.name,
        services: [
          ...selectedType.services,
          selectedService,
        ],
      },
    });
  }

  #setDatepicker = () => {
    if (this._data.isDisabled) {
      return;
    }

    this.#datepickers.push(flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.dueDate.startDate.toString(),
        onClose: this.#startDateCloseHandler,
      }
    ), flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/y H:i',
        minDate: this._data.dueDate.startDate.toString(),
        defaultDate: this._data.dueDate.endDate.toString(),
        onClose: this.#endDateCloseHandler,
      }));
  }

  #typesEventClickHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    const inputElement = evt.target;
    const type = this.#allServices.find((fella) => fella.name.toLowerCase() === inputElement.value.toLowerCase());

    this.updateDate({
      ...deepPoint(this._data),
      type: {
        name: type.name,
        services: [],
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

    this.updateDate({
      destination: findedDestination,
    });
  }

  #destinationFocusHandler = (evt) => {
    const inputElement = evt.target;

    inputElement.value = '';
  }

  #destinationBlurHandler = (evt) => {
    const inputElement = evt.target;

    inputElement.value = this._data.destination.name;
  }

  #priceInputHandler = (evt) => {
    evt.preventDefault();

    const inputElement = evt.target;
    const isValue = /^\d+$|^$/.test(evt.target.value);

    inputElement.value = isValue
      ? inputElement.value
      : inputElement.value.substring(0, inputElement.value.length - 1);

    this.updateDate({
      price: Number(inputElement.value),
    }, true);
  }

  #startDateCloseHandler = ([userDate]) => {
    this.updateDate({
      dueDate: {
        startDate: dayjs(userDate),
        endDate: isDateLess(dayjs(userDate), this._data.dueDate.endDate) ? dayjs(userDate) : this._data.dueDate.endDate,
      },
    });
  }

  #endDateCloseHandler = ([userDate]) => {
    this.updateDate({
      dueDate: {
        ...this._data.dueDate,
        endDate: dayjs(userDate),
      },
    });
  }

  static parcePointToDate = (point) => ({
    ...deepPoint(point),
    isDescription: point.destination.description,
    isSaving: false,
    isDeleting: false,
    isDisabled: false,
  });

  static parceDateToPoint = (date) => {
    const point = {
      ...deepPoint(date),
    };

    delete point.isDescription;
    delete point.isSaving;
    delete point.isDeleting;
    delete point.isDisabled;


    return point;
  };
}
