import AbstractView from './abstract-view';
import { MenuItem, } from '../const';
const createMenuTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" data-menu-item="${MenuItem.TABLE}" href="#">Table</a>
    <a class="trip-tabs__btn" data-menu-item="${MenuItem.STATS}" href="#">Stats</a>
  </nav>`
);

export default class MenuView extends AbstractView {
  get template() {
    return createMenuTemplate();
  }

  setTabsClickHandler = (callback) => {
    this._callback.menuClick = callback;

    const tabsElement = this.element;

    tabsElement.addEventListener('click', this.#TabsClickHandler);
  }

  #TabsClickHandler = (evt) => {
    const linkElement = evt.target;
    const chengedMemuItem = Object.values(MenuItem).some((item) => item === linkElement.dataset.menuItem)
      ? linkElement.dataset.menuItem
      : '';

    if (linkElement.tagName === 'A' && chengedMemuItem === '') {
      return;
    }
    evt.preventDefault();

    this._callback.menuClick(linkElement.dataset.menuItem);
  }
}
