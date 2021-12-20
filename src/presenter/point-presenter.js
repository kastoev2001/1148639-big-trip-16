import PointView from '../view/site-point-view';
import EditPointView from '../view/site-edit-point-view';

import {render, RenderPosition, replace} from '../utils/render';

export default class PointPresenter {
	#pointListComponent = null;
	#changeData = null

	#pointComponent = null;
	#editPointComponent = null;

	#point = null;

	constructor(pointListComponent, changeData) {
		this.#pointListComponent = pointListComponent;
		this.#changeData = changeData;
	}

	init = (point) => {
		this.#point = point;

		const prevPointComponent = this.#pointComponent;
		const prevEditPointComponent = this.#editPointComponent;

		this.#pointComponent = new PointView(point);
		this.#editPointComponent = new EditPointView(point);

		this.#pointComponent.setPointClickHandler(this.#arrowPointClickHandler);
		this.#pointComponent.setFavoriteClickHandler(this.#favoriteClickHandler);
		this.#editPointComponent.setPointFormClickHandler(this.#arrowPointFormClickHandler);
		this.#editPointComponent.setPointFormSubmitHandler(this.#pointFormSubmitHandler);

		if (prevPointComponent === null || prevEditPointComponent === null) {
		render(this.#pointListComponent, this.#pointComponent, RenderPosition.BEFORE_END);
		return;
  	}

		if (this.#pointListComponent.element.contains(prevPointComponent.element)) {
			replace(this.#pointComponent, prevPointComponent);
		}

		if (this.#pointListComponent.element.contains(prevEditPointComponent.element)) {
			replace(this.#editPointComponent, prevEditPointComponent);
		}
	}

	#replacePointToForm = () => {
		replace(this.#editPointComponent, this.#pointComponent);
		document.addEventListener('keydown', this.#escKeyDownHandler);
	}

	#replaceFormToPoint = () => {
		replace(this.#pointComponent, this.#editPointComponent);
		document.removeEventListener('keydown', this.#escKeyDownHandler);
	}

	#escKeyDownHandler = (evt) => {
		if (evt.key === 'Escape' || evt.key === 'Esc') {
			evt.preventDefault();
			this.#replaceFormToPoint();
		}
	}

	#pointFormSubmitHandler = () => {
		this.#replaceFormToPoint();
	}

	#arrowPointClickHandler = () => {
		this.#replacePointToForm();
	}

	#arrowPointFormClickHandler = () => {
		this.#replaceFormToPoint();
	}

	#favoriteClickHandler = () => {
		this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
	}
}
