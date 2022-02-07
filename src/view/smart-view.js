import AbstractView from './abstract-view';

import { deepPoint } from '../utils/commonds';

export default class SmartView extends AbstractView {
  _data = null;

  updateDate = (update, onlyDateUpdate) => {
    if (!update) {
      return;
    }

    this._data = {
      ...deepPoint(this._data),
      ...update
    };
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
