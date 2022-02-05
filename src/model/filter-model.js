import AbstractObservable from '../utils/pattern/abstract-observable';
import { FilterType } from '../const';

export default class FilterModel extends AbstractObservable {
  #filter = FilterType.EVERYTHING;

  get get() {
    return this.#filter;
  }

  set = (filter, updateType = null) => {
    this.#filter = filter;

    if (updateType) {
      this._notify(updateType);
    }
  }
}
