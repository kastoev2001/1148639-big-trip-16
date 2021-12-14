/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TYPE_POINT": () => (/* binding */ TYPE_POINT)
/* harmony export */ });
const TYPE_POINT = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

/***/ }),

/***/ "./src/mock/filter.js":
/*!****************************!*\
  !*** ./src/mock/filter.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateFilter": () => (/* binding */ generateFilter)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");

const pointToFilterMap = {
  everything: points => points.length,
  future: points => points.filter(point => (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isFuture)(point.dueDate.startDate) || (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isPointExpiringToday)(point.dueDate.startDate)).length,
  Past: points => points.filter(point => (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isPast)(point.dueDate.startDate)).length
};
const generateFilter = points => Object.entries(pointToFilterMap).map(([filterName, countPoint]) => ({
  name: filterName,
  count: countPoint(points)
}));

/***/ }),

/***/ "./src/mock/point.js":
/*!***************************!*\
  !*** ./src/mock/point.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generatePoint": () => (/* binding */ generatePoint)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const */ "./src/const.js");



const COUNT_PICS = 5;

const generateDescription = function () {
  const DESCRIPTIONS = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit', null, 'Cras aliquet varius magna, non porta ligula feugiat eget.', null, 'Fusce tristique felis at fermentum pharetra.', null, 'Aliquam id orci ut lectus varius viverra.', null, 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', null];
  const randomIndex = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, DESCRIPTIONS.length - 1);
  return DESCRIPTIONS[randomIndex];
};

const renserPics = function () {
  const requestUrl = [];

  for (let i = 0; i < COUNT_PICS; i++) {
    requestUrl.push(`http://picsum.photos/248/152?${Math.floor(10 * Math.random())}`);
  }

  return requestUrl;
};

const generateType = function () {
  const randomIndex = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, _const__WEBPACK_IMPORTED_MODULE_2__.TYPE_POINT.length - 1);
  return _const__WEBPACK_IMPORTED_MODULE_2__.TYPE_POINT[randomIndex];
};

const generateCities = function () {
  const CITIES = ['Amsterdam', 'Chamonix', 'Moscow', 'Obninsk', 'New-York'];
  const randomIndex = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, CITIES.length - 1);
  return CITIES[randomIndex];
};

const generateService = function () {
  const services = [[{
    id: null,

    get service() {
      this.id = 'Add luggage';
      return 'Add luggage';
    },

    price: 30,
    isChecked: Boolean((0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)())
  }, {
    id: null,

    get service() {
      this.id = 'Switch to comfort class';
      return 'Switch to comfort class';
    },

    price: 100,
    isChecked: Boolean((0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)())
  }, {
    id: null,

    get service() {
      this.id = 'choose seats';
      return 'choose seats';
    },

    price: 5,
    isChecked: Boolean((0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)())
  }], null, [{
    id: null,

    get service() {
      this.id = 'Travel by train';
      return 'Travel by train';
    },

    price: 40,
    isChecked: Boolean((0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)())
  }, {
    id: null,

    get service() {
      this.id = 'Add meal';
      return 'Add meal';
    },

    price: 15,
    isChecked: Boolean((0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)())
  }, {
    id: null,

    get service() {
      this.id = 'add luggage';
      return 'add luggage';
    },

    price: 30,
    isChecked: Boolean((0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)())
  }, {
    id: null,

    get service() {
      this.id = 'Travel by train';
      return 'Travel by train';
    },

    price: 40,
    isChecked: Boolean((0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)())
  }]];
  const randomIndex = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, services.length - 1);
  return services[randomIndex];
};

const generateDate = function () {
  const StartDate = {
    DAY: 3,
    HOUR: 13,
    MINUTE: 35
  };

  const generateStartDate = function () {
    const daysGap = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(-StartDate.DAY, StartDate.DAY);
    const hoursGap = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, StartDate.HOUR);
    const minutesGap = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, StartDate.MINUTE);
    const resultStartDate = dayjs__WEBPACK_IMPORTED_MODULE_0___default()().add(daysGap, 'day').add(hoursGap, 'hour').add(minutesGap, 'minute');
    return resultStartDate;
  };

  const generateEndDate = function () {
    const EndDate = {
      DAY: 7,
      HOUR: 24,
      MINUTE: 60
    };
    const daysGap = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(StartDate.DAY, EndDate.DAY);
    const hoursGap = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(StartDate.HOUR, EndDate.HOUR);
    const minutesGap = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(StartDate.MINUTE, EndDate.MINUTE);
    const resultEndDate = dayjs__WEBPACK_IMPORTED_MODULE_0___default()().add(daysGap, 'day').add(hoursGap, 'hour').add(minutesGap, 'minute');
    return resultEndDate;
  };

  const startDate = generateStartDate();
  const endDate = generateEndDate();
  const gapDate = {
    day: endDate.diff(startDate, 'day'),
    hour: endDate.diff(startDate, 'hour') % 24,
    minute: endDate.diff(startDate, 'minute') % 60
  };
  return {
    startDate,
    endDate,
    gapDate
  };
};

const generatePoint = () => {
  const initialPrice = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(20, 100);
  return {
    pics: renserPics(),
    type: generateType(),
    city: generateCities(),
    services: generateService(),
    description: generateDescription(),
    dueDate: generateDate(),

    get price() {
      let overallPrice = initialPrice;

      if (this.services !== null) {
        this.services.map(services => {
          if (services.isChecked) {
            overallPrice += services.price;
          }
        });
        return {
          initialPrice,
          overallPrice
        };
      } else {
        return {
          initialPrice,
          overallPrice: null
        };
      }
    },

    isFavorite: Boolean((0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)())
  };
};

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderPosition": () => (/* binding */ RenderPosition),
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "createElement": () => (/* binding */ createElement)
/* harmony export */ });
const RenderPosition = {
  BEFORE_BEGIN: 'beforebegin',
  AFTER_BEGIN: 'afterbegin',
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend'
};
const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.BEFORE_BEGIN:
      container.before(element);
      break;

    case RenderPosition.AFTER_BEGIN:
      container.prepend(element);
      break;

    case RenderPosition.BEFORE_END:
      container.append(element);
      break;

    case RenderPosition.AFTER_END:
      container.after(element);
      break;
  }
};
const createElement = template => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomInteger": () => (/* binding */ getRandomInteger),
/* harmony export */   "isFuture": () => (/* binding */ isFuture),
/* harmony export */   "isPast": () => (/* binding */ isPast),
/* harmony export */   "isPointExpiringToday": () => (/* binding */ isPointExpiringToday),
/* harmony export */   "sortPoints": () => (/* binding */ sortPoints)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);

const getRandomInteger = (first = 0, last = 1) => {
  const lower = Math.ceil(Math.min(first, last));
  const upper = Math.floor(Math.max(first, last));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
const isFuture = dueDate => dueDate && dayjs__WEBPACK_IMPORTED_MODULE_0___default()().isBefore(dueDate, 'D');
const isPast = dueDate => dueDate && dayjs__WEBPACK_IMPORTED_MODULE_0___default()().isAfter(dueDate, 'D');
const isPointExpiringToday = dueDate => dueDate && dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dueDate).isSame(dayjs__WEBPACK_IMPORTED_MODULE_0___default()(), 'D');
const sortPoints = data => [...data].sort((a, b) => b.dueDate.startDate - a.dueDate.startDate);

/***/ }),

/***/ "./src/view/site-edit-point-view.js":
/*!******************************************!*\
  !*** ./src/view/site-edit-point-view.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EditPointWiew)
/* harmony export */ });
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../render */ "./src/render.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }



const createEditPointDescriptionTemplate = function (description, pics) {
  return `${description ? `<section class="event__section  event__section--destination">
		<h3 class="event__section-title  event__section-title--destination">Destination</h3>
		<p class="event__destination-description">${description}</p>
		${`<div class="event__photos-container">
			<div class="event__photos-tape">
			${pics.map(link => `<img class="event__photo" src="${link}" alt="Event photo">`).join('')}
			</div>
			</div>`}
			</section>` : ''}`;
};

const createEditPointServicesTemplate = function (services) {
  return `${services ? `<section class="event__section  event__section--offers">
	<h3 class="event__section-title  event__section-title--offers">Offers</h3>
	<div class="event__available-offers">
	  ${services.map(servicesElements => {
    const serviceId = servicesElements.id;
    const service = servicesElements.service;
    const price = servicesElements.price;
    const isChecked = servicesElements.isChecked;
    return `<div class="event__offer-selector">
	         <input class="event__offer-checkbox  visually-hidden" id="${serviceId}" type="checkbox" name="event-offer-comfort" ${isChecked ? 'checked' : ''}>
	         <label class="event__offer-label" for="${serviceId}">
		       <span class="event__offer-title">${service}</span>
		       &plus;&euro;&nbsp;
		       <span class="event__offer-price">${price}</span>
	       </label>
       </div>`;
  }).join('')}
	</div>
	</section>` : ''}`;
};

const BLANK_POINT = {
  type: 'Taxi',
  city: 'Amsterdam',
  price: null,
  description: null,
  services: {
    id: 1,
    service: 'Add luggage',
    price: 30,
    isChecked: false
  },
  pics: null,
  dueDate: null
};

const createEditPointTemplate = function (point = {}) {
  const {
    type,
    city,
    price,
    description,
    services,
    pics,
    dueDate
  } = point;
  const startDate = dueDate.startDate.format('DD/MM/YY hh:mm');
  const endDate = dueDate.endDate.format('DD/MM/YY hh:mm');
  const servicesTemplate = createEditPointServicesTemplate(services);
  const descriptionTemplate = createEditPointDescriptionTemplate(description, pics);
  const initialPrice = price.initialPrice;
  return `<li class="trip-events__item">
	<form class="event event--edit" action="#" method="post">
		<header class="event__header">
			<div class="event__type-wrapper">
				<label class="event__type  event__type-btn" for="event-type-toggle-1">
					<span class="visually-hidden">Choose event type</span>
					<img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
				</label>
				<input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

				<div class="event__type-list">
					<fieldset class="event__type-group">
						<legend class="visually-hidden">Event type</legend>

						<div class="event__type-item">
							<input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
							<label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
						</div>

						<div class="event__type-item">
							<input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
							<label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
						</div>

						<div class="event__type-item">
							<input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
							<label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
						</div>

						<div class="event__type-item">
							<input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
							<label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
						</div>

						<div class="event__type-item">
							<input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
							<label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
						</div>

						<div class="event__type-item">
							<input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
							<label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
						</div>

						<div class="event__type-item">
							<input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
							<label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
						</div>

						<div class="event__type-item">
							<input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
							<label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
						</div>

						<div class="event__type-item">
							<input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
							<label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
						</div>
					</fieldset>
				</div>
			</div>

			<div class="event__field-group  event__field-group--destination">
				<label class="event__label  event__type-output" for="event-destination-1">
					${type}
				</label>
				<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
				<datalist id="destination-list-1">
					<option value="Amsterdam"></option>
					<option value="Geneva"></option>
					<option value="Chamonix"></option>
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
				<input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${initialPrice}">
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
  </li>`;
};

var _element = /*#__PURE__*/new WeakMap();

var _point = /*#__PURE__*/new WeakMap();

class EditPointWiew {
  constructor(point = BLANK_POINT) {
    _classPrivateFieldInitSpec(this, _element, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _point, {
      writable: true,
      value: null
    });

    _classPrivateFieldSet(this, _point, point);
  }

  get element() {
    if (!_classPrivateFieldGet(this, _element)) {
      _classPrivateFieldSet(this, _element, (0,_render__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.template));
    }

    return _classPrivateFieldGet(this, _element);
  }

  get template() {
    return createEditPointTemplate(_classPrivateFieldGet(this, _point));
  }

  removeElement() {
    _classPrivateFieldSet(this, _element, null);
  }

}

/***/ }),

/***/ "./src/view/site-empty-view.js":
/*!*************************************!*\
  !*** ./src/view/site-empty-view.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EmptyPointsWiew)
/* harmony export */ });
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../render */ "./src/render.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }



const getEmptyPointsTemplate = function (text) {
  return `<p class="trip-events__msg">${text}"</p>`;
};

var _element = /*#__PURE__*/new WeakMap();

var _text = /*#__PURE__*/new WeakMap();

class EmptyPointsWiew {
  constructor(text) {
    _classPrivateFieldInitSpec(this, _element, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _text, {
      writable: true,
      value: null
    });

    _classPrivateFieldSet(this, _text, text);
  }

  get element() {
    if (!_classPrivateFieldGet(this, _element)) {
      _classPrivateFieldSet(this, _element, (0,_render__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.template));
    }

    return _classPrivateFieldGet(this, _element);
  }

  get template() {
    return getEmptyPointsTemplate(_classPrivateFieldGet(this, _text));
  }

  removeElement() {
    _classPrivateFieldSet(this, _element, null);
  }

}

/***/ }),

/***/ "./src/view/site-filter-view.js":
/*!**************************************!*\
  !*** ./src/view/site-filter-view.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FilterView)
/* harmony export */ });
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../render */ "./src/render.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }



const filterTemplate = function (filter) {
  const {
    name,
    count
  } = filter;
  return `<div class="trip-filters__filter">
	<input id="${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">
	<label class="trip-filters__filter-label" for="${name}">Everything ${count}</label>
</div>`;
};

const createFilterTemplate = function (filterItems) {
  return `<form class="trip-filters" action="#" method="get">
	
	${filterItems.map(filter => filterTemplate(filter)).join('')}

	<button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};

var _element = /*#__PURE__*/new WeakMap();

var _filter = /*#__PURE__*/new WeakMap();

class FilterView {
  constructor(filter) {
    _classPrivateFieldInitSpec(this, _element, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _filter, {
      writable: true,
      value: null
    });

    _classPrivateFieldSet(this, _filter, filter);
  }

  get element() {
    if (!_classPrivateFieldGet(this, _element)) {
      _classPrivateFieldSet(this, _element, (0,_render__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.template));
    }

    return _classPrivateFieldGet(this, _element);
  }

  get template() {
    return createFilterTemplate(_classPrivateFieldGet(this, _filter));
  }

  removeElement() {
    _classPrivateFieldSet(this, _element, null);
  }

}

/***/ }),

/***/ "./src/view/site-joint-trip-view.js":
/*!******************************************!*\
  !*** ./src/view/site-joint-trip-view.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JointTripView)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../render */ "./src/render.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }




const getNotPassedPath = function (points) {
  const sities = points.map(point => point.city);
  const sortPoints = sities.map((city, i, arr) => {
    const instantElement = city;
    const nextElement = arr[i + 1];

    if (instantElement !== nextElement) {
      return instantElement;
    } else {
      return null;
    }
  }).filter(city => city !== null).join(' — ');
  return `<h1 class="trip-info__title">${sortPoints}</h1>`;
};

const getStartAndEndTrip = function (points) {
  const endTimePoint = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(points[0].dueDate.startDate).format('MMM D');
  const startTimePoint = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(points[0].dueDate.startDate).format('MMM') !== dayjs__WEBPACK_IMPORTED_MODULE_0___default()(points[points.length - 1].dueDate.startDate).format('MMM') ? dayjs__WEBPACK_IMPORTED_MODULE_0___default()(points[points.length - 1].dueDate.startDate).format('MMM D') : dayjs__WEBPACK_IMPORTED_MODULE_0___default()(points[points.length - 1].dueDate.startDate).format('D');
  return `<p class="trip-info__dates"> ${endTimePoint} — ${startTimePoint}</p>`;
};

const createJointTripTemplate = function (points) {
  return `<section class="trip-main__trip-info  trip-info">
   	<div class="trip-info__main">
			 ${getNotPassedPath(points)}
			${getStartAndEndTrip(points)}
		</div>
   
   	<p class="trip-info__cost">
   		Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
   	</p>
   </section>`;
};

var _element = /*#__PURE__*/new WeakMap();

var _points = /*#__PURE__*/new WeakMap();

class JointTripView {
  constructor(points) {
    _classPrivateFieldInitSpec(this, _element, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _points, {
      writable: true,
      value: null
    });

    _classPrivateFieldSet(this, _points, points);
  }

  get element() {
    if (!_classPrivateFieldGet(this, _element)) {
      _classPrivateFieldSet(this, _element, (0,_render__WEBPACK_IMPORTED_MODULE_1__.createElement)(this.template));
    }

    return _classPrivateFieldGet(this, _element);
  }

  get template() {
    return createJointTripTemplate(_classPrivateFieldGet(this, _points));
  }

  removeElement() {
    _classPrivateFieldSet(this, _element, null);
  }

}

/***/ }),

/***/ "./src/view/site-menu-view.js":
/*!************************************!*\
  !*** ./src/view/site-menu-view.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MenuView)
/* harmony export */ });
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../render */ "./src/render.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }



const createMenuTemplate = function () {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
	<a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
	<a class="trip-tabs__btn" href="#">Stats</a>
</nav>`;
};

var _element = /*#__PURE__*/new WeakMap();

class MenuView {
  constructor() {
    _classPrivateFieldInitSpec(this, _element, {
      writable: true,
      value: null
    });
  }

  get element() {
    if (!_classPrivateFieldGet(this, _element)) {
      _classPrivateFieldSet(this, _element, (0,_render__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.template));
    }

    return _classPrivateFieldGet(this, _element);
  }

  get template() {
    return createMenuTemplate();
  }

  removeElement() {
    _classPrivateFieldSet(this, _element, null);
  }

}

/***/ }),

/***/ "./src/view/site-point-view.js":
/*!*************************************!*\
  !*** ./src/view/site-point-view.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPointTemplate": () => (/* binding */ createPointTemplate),
/* harmony export */   "default": () => (/* binding */ PointView)
/* harmony export */ });
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../render */ "./src/render.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }



const createServicesTemplate = function (services) {
  return services.map(servicesElements => {
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
  }).filter(service => service !== null).join('');
};

const createPointTemplate = function (point) {
  const {
    dueDate,
    type,
    city,
    price,
    services,
    isFavorites
  } = point;
  const {
    startDate,
    endDate,
    gapDate
  } = dueDate;
  const startDateHour = startDate.format('hh');
  const startDateMinute = startDate.format('mm');
  const endDateHour = endDate.format('hh');
  const endDateMinute = endDate.format('mm');
  const date = startDate.format('MMM D');
  const gapDateHour = gapDate.hour === 0 ? gapDate.minute : `${gapDate.hour}Ч ${gapDate.minute}М`;
  const fovoritesClassName = isFavorites ? 'event__favorite-btn--active' : '';
  const resultPrice = price.overallPrice !== null ? price.overallPrice : price.initialPrice;
  return `<li class="trip-events__item">
<div class="event">
	<time class="event__date" datetime="2019-03-18">${date}</time>
	<div class="event__type">
		<img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
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
	${services !== null ? createServicesTemplate(services) : '<li class="event__offer"></li>'}
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
</li>`;
};

var _element = /*#__PURE__*/new WeakMap();

var _point = /*#__PURE__*/new WeakMap();

class PointView {
  constructor(point) {
    _classPrivateFieldInitSpec(this, _element, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _point, {
      writable: true,
      value: null
    });

    _classPrivateFieldSet(this, _point, point);
  }

  get element() {
    if (!_classPrivateFieldGet(this, _element)) {
      _classPrivateFieldSet(this, _element, (0,_render__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.tempalte));
    }

    return _classPrivateFieldGet(this, _element);
  }

  get tempalte() {
    return createPointTemplate(_classPrivateFieldGet(this, _point));
  }

  removeElement() {
    _classPrivateFieldSet(this, _element, null);
  }

}

/***/ }),

/***/ "./src/view/site-sorting-view.js":
/*!***************************************!*\
  !*** ./src/view/site-sorting-view.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createSortingTemplate": () => (/* binding */ createSortingTemplate),
/* harmony export */   "default": () => (/* binding */ SortingView)
/* harmony export */ });
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../render */ "./src/render.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }


const createSortingTemplate = function () {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  	<div class="trip-sort__item  trip-sort__item--day">
  		<input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">
  		<label class="trip-sort__btn" for="sort-day">Day</label>
  	</div>
	  
  	<div class="trip-sort__item  trip-sort__item--event">
  		<input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
  		<label class="trip-sort__btn" for="sort-event">Event</label>
  	</div>
	  
  	<div class="trip-sort__item  trip-sort__item--time">
  		<input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
  		<label class="trip-sort__btn" for="sort-time">Time</label>
  	</div>
	  
  	<div class="trip-sort__item  trip-sort__item--price">
  		<input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>
  		<label class="trip-sort__btn" for="sort-price">Price</label>
  	</div>
	  
  	<div class="trip-sort__item  trip-sort__item--offer">
  		<input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
  		<label class="trip-sort__btn" for="sort-offer">Offers</label>
  	</div>
  </form>`;
};

var _element = /*#__PURE__*/new WeakMap();

class SortingView {
  constructor() {
    _classPrivateFieldInitSpec(this, _element, {
      writable: true,
      value: null
    });
  }

  get element() {
    if (!_classPrivateFieldGet(this, _element)) {
      _classPrivateFieldSet(this, _element, (0,_render__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.template));
    }

    return _classPrivateFieldGet(this, _element);
  }

  get template() {
    return createSortingTemplate();
  }

  removeElement() {
    _classPrivateFieldSet(this, _element, null);
  }

}

/***/ }),

/***/ "./src/view/site-trip-events-view.js":
/*!*******************************************!*\
  !*** ./src/view/site-trip-events-view.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TripEventsView)
/* harmony export */ });
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../render */ "./src/render.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }



const createtripEventsTemplate = () => '<ul class="trip-events__list"></ul>';

var _element = /*#__PURE__*/new WeakMap();

class TripEventsView {
  constructor() {
    _classPrivateFieldInitSpec(this, _element, {
      writable: true,
      value: null
    });
  }

  get element() {
    if (!_classPrivateFieldGet(this, _element)) {
      _classPrivateFieldSet(this, _element, (0,_render__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.template));
    }

    return _classPrivateFieldGet(this, _element);
  }

  get template() {
    return createtripEventsTemplate();
  }

  removeElement() {
    _classPrivateFieldSet(this, _element, null);
  }

}

/***/ }),

/***/ "./node_modules/dayjs/dayjs.min.js":
/*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else{var i=t.name;v[i]=t,r=i}return!n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_site_joint_trip_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/site-joint-trip-view */ "./src/view/site-joint-trip-view.js");
/* harmony import */ var _view_site_menu_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/site-menu-view */ "./src/view/site-menu-view.js");
/* harmony import */ var _view_site_filter_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/site-filter-view */ "./src/view/site-filter-view.js");
/* harmony import */ var _view_site_sorting_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view/site-sorting-view */ "./src/view/site-sorting-view.js");
/* harmony import */ var _view_site_trip_events_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view/site-trip-events-view */ "./src/view/site-trip-events-view.js");
/* harmony import */ var _view_site_empty_view__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./view/site-empty-view */ "./src/view/site-empty-view.js");
/* harmony import */ var _view_site_edit_point_view__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./view/site-edit-point-view */ "./src/view/site-edit-point-view.js");
/* harmony import */ var _view_site_point_view__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./view/site-point-view */ "./src/view/site-point-view.js");
/* harmony import */ var _mock_filter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mock/filter */ "./src/mock/filter.js");
/* harmony import */ var _mock_point__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mock/point */ "./src/mock/point.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils */ "./src/utils.js");












const EmptyFiter = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PAST: 'There are no past events now'
};
const COUNT_LIST = 10;
const points = Array.from({
  length: COUNT_LIST
}, _mock_point__WEBPACK_IMPORTED_MODULE_9__.generatePoint);
const tripMainElement = document.querySelector('.trip-main');
const tripControlsNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripControlsFiltersElements = tripMainElement.querySelector('.trip-controls__filters');
(0,_render__WEBPACK_IMPORTED_MODULE_10__.render)(tripControlsNavigationElement, new _view_site_menu_view__WEBPACK_IMPORTED_MODULE_1__["default"]().element, _render__WEBPACK_IMPORTED_MODULE_10__.RenderPosition.BEFORE_END);
const tripEventsElement = new _view_site_trip_events_view__WEBPACK_IMPORTED_MODULE_4__["default"]();
const pageMainElement = document.querySelector('.page-main');
const tripEvents = pageMainElement.querySelector('.trip-events');
(0,_render__WEBPACK_IMPORTED_MODULE_10__.render)(tripEvents, new _view_site_sorting_view__WEBPACK_IMPORTED_MODULE_3__["default"]().element, _render__WEBPACK_IMPORTED_MODULE_10__.RenderPosition.BEFORE_END);

const renderPoint = (EventList, point) => {
  const pointComponent = new _view_site_point_view__WEBPACK_IMPORTED_MODULE_7__["default"](point);
  const pointEditComponent = new _view_site_edit_point_view__WEBPACK_IMPORTED_MODULE_6__["default"](point);
  const downArrowPointForm = pointComponent.element.querySelector('.event__rollup-btn');
  const upArrowPointForm = pointEditComponent.element.querySelector('.event__rollup-btn');
  const pointForm = pointEditComponent.element.querySelector('form');

  const replacePointToForm = () => {
    EventList.element.replaceChild(pointEditComponent.element, pointComponent.element);
  };

  const replaceFormToPoint = () => {
    EventList.element.replaceChild(pointComponent.element, pointEditComponent.element);
  };

  const EscKeyDownHandler = evt => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', EscKeyDownHandler);
    }
  };

  const closePointForm = () => {
    replaceFormToPoint();
    document.removeEventListener('keydown', EscKeyDownHandler);
  };

  const PointFormSubmitHandler = evt => {
    evt.preventDefault();
    closePointForm();
  };

  const openPointForm = () => {
    replacePointToForm();
    document.addEventListener('keydown', EscKeyDownHandler);
  };

  const DownArrowPointFormClickHandler = () => {
    openPointForm();
  };

  const onUpArrowPointFormClick = () => {
    closePointForm();
  };

  downArrowPointForm.addEventListener('click', DownArrowPointFormClickHandler);
  upArrowPointForm.addEventListener('click', onUpArrowPointFormClick);
  pointForm.addEventListener('submit', PointFormSubmitHandler);
  (0,_render__WEBPACK_IMPORTED_MODULE_10__.render)(EventList.element, pointComponent.element, _render__WEBPACK_IMPORTED_MODULE_10__.RenderPosition.BEFORE_END);
};

if (points.length === 0) {
  (0,_render__WEBPACK_IMPORTED_MODULE_10__.render)(tripEvents, new _view_site_empty_view__WEBPACK_IMPORTED_MODULE_5__["default"](EmptyFiter.EVERYTHING).element, _render__WEBPACK_IMPORTED_MODULE_10__.RenderPosition.BEFORE_END);
} else {
  const sortedPoints = (0,_utils__WEBPACK_IMPORTED_MODULE_11__.sortPoints)(points);
  const filters = (0,_mock_filter__WEBPACK_IMPORTED_MODULE_8__.generateFilter)(points);
  (0,_render__WEBPACK_IMPORTED_MODULE_10__.render)(tripMainElement, new _view_site_joint_trip_view__WEBPACK_IMPORTED_MODULE_0__["default"](sortedPoints).element, _render__WEBPACK_IMPORTED_MODULE_10__.RenderPosition.AFTER_BEGIN);
  (0,_render__WEBPACK_IMPORTED_MODULE_10__.render)(tripControlsFiltersElements, new _view_site_filter_view__WEBPACK_IMPORTED_MODULE_2__["default"](filters).element, _render__WEBPACK_IMPORTED_MODULE_10__.RenderPosition.BEFORE_END);
  sortedPoints.forEach(point => {
    renderPoint(tripEventsElement, point);
  });
  (0,_render__WEBPACK_IMPORTED_MODULE_10__.render)(tripEvents, tripEventsElement.element, _render__WEBPACK_IMPORTED_MODULE_10__.RenderPosition.BEFORE_END);
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map