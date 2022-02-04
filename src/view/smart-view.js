import AbstractView from './abstract-view';

import { deepPoint, } from '../utils/commonds';

export default class SmartView extends AbstractView {
  _date = null;

  updateDate = (update, onlyDateUpdate) => {
    if (!update) {
      return;
    }

    this._date = {
      ...deepPoint(this._date),
      ...update};
    if (onlyDateUpdate) {
      return;
    }

    this.updateElement();
  }

  updateElement = () => {
    const prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers = () => {
    throw new Error('Abstract method not implemented: restoreHandlers');
  }
}
