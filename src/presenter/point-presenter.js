import PointView from '../view/site-point-view';
import EditPointView from '../view/site-edit-point-view';

import {render, RenderPosition, replace} from '../utils/render';

export default class PointPresenter {
	#pointListComponent = null;

	#pointComponent = null;
	#editPointComponent = null;

	#point = null;

	constructor(pointListComponent) {
		this.#pointListComponent = pointListComponent;
	}

	init = (point) => {
		this.#point = point;

		this.#pointComponent = new PointView(point);
		this.#editPointComponent = new EditPointView(point);

		this.#pointComponent.setPointClickHandler(this.#arrowPointClickHandler);
		this.#editPointComponent.setPointFormClickHandler(this.#arrowPointFormClickHandler);
		this.#editPointComponent.setPointFormSubmitHandler(this.#pointFormSubmitHandler);

		render(this.#pointListComponent, this.#pointComponent, RenderPosition.BEFORE_END);
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
}
