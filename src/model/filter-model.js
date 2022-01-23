import AbstractObservable from '../utils/pattern/abstract-observable';
import { FilterType } from '../const';

export default class filterModel extends AbstractObservable {
	#filter = FilterType.EVERYTHING;

	get filter() {
		return this.#filter;
	}

	setFilter = (filter) => {
		this.#filter = filter;
	}
}