import AbstractView from './site-abstract-view';

import { deepClone } from '../utils/commonds';

export default class SmartView extends AbstractView {
  _date = null;

  updateDate = (update, onlyDateUpdate) => {
    if (!update) {
      return;
    }

    this._date = {
			...deepClone(this._date),
			dueDate: {...this._date.dueDate},
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
