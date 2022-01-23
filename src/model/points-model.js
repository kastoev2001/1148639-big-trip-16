import { copyArrayOfObjects } from '../utils/commonds';
import AbstractObservable from '../utils/pattern/abstract-observable';

export default class PointsModel extends AbstractObservable{
	#points = null;

	set points(points) {
		this.#points = [...copyArrayOfObjects(points)]
	}

	get points() {
		return this.#points;
	}

	updatePoint = (updateType, update) => {
		const points = copyArrayOfObjects(this.#points);
		const index = this.points.findIndex((point) => point.id === update.id);

			if (index === -1) {
				throw new Error('Can\'t update unexisting point');
		}

		this.#points = [
			...points.slice(0, index),
			update,
			...points.slice(index + 1)
		];

		this._notify(updateType);
	}

		deletePoint = (updateType, update) => {
		const points = copyArrayOfObjects(this.#points);
		const index = this.#points.findIndex((point) => point.id === update.id);

		if (index === -1) {
			throw new Error('Can\'t delete undexisting point');
		}

		this.#points = [
			...points.slice(0, index),
			...points.slice(index + 1)
		];

		this._notify(updateType);
	}
}