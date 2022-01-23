import PointView from '../view/site-point-view';
import EditPointView from '../view/site-edit-point-view';

import { deepClone, deepPoint } from '../utils/commonds';
import {remove, render, RenderPosition, replace} from '../utils/render';
import { UpdateType, UserAction } from '../const';

const Mode = {
  DEFAULT: 'DAFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {
  #pointListComponent = null;
  #changeData = null
  #changeMode = null;

  #pointComponent = null;
  #editPointComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor(pointListComponent, changeData, changeMode) {
    this.#pointListComponent = pointListComponent;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView(point);
    this.#editPointComponent = new EditPointView(point);

    this.#pointComponent.setPointExpandClickHandler(this.#pointExpandClickHandler);
    this.#pointComponent.setFavoriteClickHandler(this.#favoriteClickHandler);
    this.#editPointComponent.setPointRollupClickHandler(this.#pointRollupClickHandler);
    this.#editPointComponent.setPointFormSubmitHandler(this.#pointFormSubmitHandler);
		this.#editPointComponent.setDeleteFormClickHandler(this.#deleteFormClickHandler)

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

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }

  resetPoint = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint = () => {
    this.#editPointComponent.reset(this.#point);
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  }

  #pointFormSubmitHandler = (point) => {
    this.#changeData(
			UserAction.UPDATE_POINT,
			UpdateType.MINOR,
			deepPoint(point)
		);
    this.#replaceFormToPoint();
  }

	#deleteFormClickHandler = (point) => {
		this.#changeData(
			UserAction.DELETE_POINT,
			UpdateType.MINOR,
			deepPoint(point)
		)
	}

  #pointExpandClickHandler = () => {
    this.#replacePointToForm();
  }

  #pointRollupClickHandler = () => {
    this.#replaceFormToPoint();
  }

  #favoriteClickHandler = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  }
}
