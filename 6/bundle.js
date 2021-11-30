/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderPosition": () => (/* binding */ renderPosition),
/* harmony export */   "renderTemplate": () => (/* binding */ renderTemplate)
/* harmony export */ });
const renderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend'
};
const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

/***/ }),

/***/ "./src/view/site-content-view.js":
/*!***************************************!*\
  !*** ./src/view/site-content-view.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createContentTemplate": () => (/* binding */ createContentTemplate)
/* harmony export */ });
function createContentTemplate() {
  return `
	<ul class="trip-events__list">

	</ul>
	`;
}

/***/ }),

/***/ "./src/view/site-edit-point-view.js":
/*!******************************************!*\
  !*** ./src/view/site-edit-point-view.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createEditPointTemplate": () => (/* binding */ createEditPointTemplate)
/* harmony export */ });
function createEditPointTemplate() {
  return `
<li class="trip-events__item">
<form class="event event--edit" action="#" method="post">
	<header class="event__header">
		<div class="event__type-wrapper">
			<label class="event__type  event__type-btn" for="event-type-toggle-1">
				<span class="visually-hidden">Choose event type</span>
				<img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
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
				Flight
			</label>
			<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Chamonix" list="destination-list-1">
			<datalist id="destination-list-1">
				<option value="Amsterdam"></option>
				<option value="Geneva"></option>
				<option value="Chamonix"></option>
			</datalist>
		</div>

		<div class="event__field-group  event__field-group--time">
			<label class="visually-hidden" for="event-start-time-1">From</label>
			<input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
			&mdash;
			<label class="visually-hidden" for="event-end-time-1">To</label>
			<input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
		</div>

		<div class="event__field-group  event__field-group--price">
			<label class="event__label" for="event-price-1">
				<span class="visually-hidden">Price</span>
				&euro;
			</label>
			<input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="160">
		</div>

		<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
		<button class="event__reset-btn" type="reset">Delete</button>
		<button class="event__rollup-btn" type="button">
			<span class="visually-hidden">Open event</span>
		</button>
	</header>
	<section class="event__details">
		<section class="event__section  event__section--offers">
			<h3 class="event__section-title  event__section-title--offers">Offers</h3>

			<div class="event__available-offers">
				<div class="event__offer-selector">
					<input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
					<label class="event__offer-label" for="event-offer-luggage-1">
						<span class="event__offer-title">Add luggage</span>
						&plus;&euro;&nbsp;
						<span class="event__offer-price">50</span>
					</label>
				</div>

				<div class="event__offer-selector">
					<input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
					<label class="event__offer-label" for="event-offer-comfort-1">
						<span class="event__offer-title">Switch to comfort</span>
						&plus;&euro;&nbsp;
						<span class="event__offer-price">80</span>
					</label>
				</div>

				<div class="event__offer-selector">
					<input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
					<label class="event__offer-label" for="event-offer-meal-1">
						<span class="event__offer-title">Add meal</span>
						&plus;&euro;&nbsp;
						<span class="event__offer-price">15</span>
					</label>
				</div>

				<div class="event__offer-selector">
					<input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
					<label class="event__offer-label" for="event-offer-seats-1">
						<span class="event__offer-title">Choose seats</span>
						&plus;&euro;&nbsp;
						<span class="event__offer-price">5</span>
					</label>
				</div>

				<div class="event__offer-selector">
					<input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
					<label class="event__offer-label" for="event-offer-train-1">
						<span class="event__offer-title">Travel by train</span>
						&plus;&euro;&nbsp;
						<span class="event__offer-price">40</span>
					</label>
				</div>
			</div>
		</section>

		<section class="event__section  event__section--destination">
			<h3 class="event__section-title  event__section-title--destination">Destination</h3>
			<p class="event__destination-description">Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it's renowned for its skiing.</p>
		</section>
	</section>
</form>
</li>
`;
}

/***/ }),

/***/ "./src/view/site-filter-view.js":
/*!**************************************!*\
  !*** ./src/view/site-filter-view.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createFilterTemplate": () => (/* binding */ createFilterTemplate)
/* harmony export */ });
function createFilterTemplate() {
  return `
	<form class="trip-filters" action="#" method="get">
	<div class="trip-filters__filter">
		<input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">
		<label class="trip-filters__filter-label" for="filter-everything">Everything</label>
	</div>

	<div class="trip-filters__filter">
		<input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
		<label class="trip-filters__filter-label" for="filter-future">Future</label>
	</div>

	<div class="trip-filters__filter">
		<input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>
		<label class="trip-filters__filter-label" for="filter-past">Past</label>
	</div>

	<button class="visually-hidden" type="submit">Accept filter</button>
</form>
	`;
}

/***/ }),

/***/ "./src/view/site-menu-view.js":
/*!************************************!*\
  !*** ./src/view/site-menu-view.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createMenuTemplate": () => (/* binding */ createMenuTemplate)
/* harmony export */ });
function createMenuTemplate() {
  return `
	<nav class="trip-controls__trip-tabs  trip-tabs">
	<a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
	<a class="trip-tabs__btn" href="#">Stats</a>
</nav>
`;
}

/***/ }),

/***/ "./src/view/site-point-view.js":
/*!*************************************!*\
  !*** ./src/view/site-point-view.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPointTemplate": () => (/* binding */ createPointTemplate)
/* harmony export */ });
function createPointTemplate() {
  return `
<li class="trip-events__item">
<div class="event">
	<time class="event__date" datetime="2019-03-18">MAR 18</time>
	<div class="event__type">
		<img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
	</div>
	<h3 class="event__title">Taxi Amsterdam</h3>
	<div class="event__schedule">
		<p class="event__time">
			<time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
			&mdash;
			<time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
		</p>
		<p class="event__duration">30M</p>
	</div>
	<p class="event__price">
		&euro;&nbsp;<span class="event__price-value">20</span>
	</p>
	<h4 class="visually-hidden">Offers:</h4>
	<ul class="event__selected-offers">
		<li class="event__offer">
			<span class="event__offer-title">Order Uber</span>
			&plus;&euro;&nbsp;
			<span class="event__offer-price">20</span>
		</li>
	</ul>
	<button class="event__favorite-btn event__favorite-btn--active" type="button">
		<span class="visually-hidden">Add to favorite</span>
		<svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
			<path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
		</svg>
	</button>
	<button class="event__rollup-btn" type="button">
		<span class="visually-hidden">Open event</span>
	</button>
</div>
</li>
`;
}

/***/ }),

/***/ "./src/view/site-sorting-view.js":
/*!***************************************!*\
  !*** ./src/view/site-sorting-view.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createSortingTemplate": () => (/* binding */ createSortingTemplate)
/* harmony export */ });
function createSortingTemplate() {
  return `
	<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
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
</form>
	`;
}

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_site_menu_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/site-menu-view */ "./src/view/site-menu-view.js");
/* harmony import */ var _view_site_filter_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/site-filter-view */ "./src/view/site-filter-view.js");
/* harmony import */ var _view_site_sorting_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/site-sorting-view */ "./src/view/site-sorting-view.js");
/* harmony import */ var _view_site_content_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view/site-content-view */ "./src/view/site-content-view.js");
/* harmony import */ var _view_site_edit_point_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view/site-edit-point-view */ "./src/view/site-edit-point-view.js");
/* harmony import */ var _view_site_point_view__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./view/site-point-view */ "./src/view/site-point-view.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./render */ "./src/render.js");







const tripMainElement = document.querySelector('.trip-main');
const tripControlsNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripControlsFilters = tripMainElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const tripEvents = pageMainElement.querySelector('.trip-events');
(0,_render__WEBPACK_IMPORTED_MODULE_6__.renderTemplate)(tripControlsNavigationElement, (0,_view_site_menu_view__WEBPACK_IMPORTED_MODULE_0__.createMenuTemplate)(), _render__WEBPACK_IMPORTED_MODULE_6__.renderPosition.BEFOREEND);
(0,_render__WEBPACK_IMPORTED_MODULE_6__.renderTemplate)(tripControlsFilters, (0,_view_site_filter_view__WEBPACK_IMPORTED_MODULE_1__.createFilterTemplate)(), _render__WEBPACK_IMPORTED_MODULE_6__.renderPosition.BEFOREEND);
(0,_render__WEBPACK_IMPORTED_MODULE_6__.renderTemplate)(tripEvents, (0,_view_site_sorting_view__WEBPACK_IMPORTED_MODULE_2__.createSortingTemplate)(), _render__WEBPACK_IMPORTED_MODULE_6__.renderPosition.BEFOREEND);
(0,_render__WEBPACK_IMPORTED_MODULE_6__.renderTemplate)(tripEvents, (0,_view_site_content_view__WEBPACK_IMPORTED_MODULE_3__.createContentTemplate)(), _render__WEBPACK_IMPORTED_MODULE_6__.renderPosition.BEFOREEND);
const COUNT_LIST = 4;
const tripEventsListElement = pageMainElement.querySelector('.trip-events__list');
(0,_render__WEBPACK_IMPORTED_MODULE_6__.renderTemplate)(tripEventsListElement, (0,_view_site_edit_point_view__WEBPACK_IMPORTED_MODULE_4__.createEditPointTemplate)(), _render__WEBPACK_IMPORTED_MODULE_6__.renderPosition.BEFOREEND);

for (let i = 1; i < COUNT_LIST; i++) {
  (0,_render__WEBPACK_IMPORTED_MODULE_6__.renderTemplate)(tripEventsListElement, (0,_view_site_point_view__WEBPACK_IMPORTED_MODULE_5__.createPointTemplate)(), _render__WEBPACK_IMPORTED_MODULE_6__.renderPosition.BEFOREEND);
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map