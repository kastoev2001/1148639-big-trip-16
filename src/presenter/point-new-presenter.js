import EditPointView from '../view/site-edit-point-view';

import { nanoid } from 'nanoid';

import { deepPoint } from '../utils/commonds';
import {remove, render, RenderPosition} from '../utils/render';

import { UserAction, UpdateType } from '../const';

export default class PointPresenter {
  #pointListComponent = null
  #changeData = null

  #editPointComponent = null;

  constructor(pointListComponent, changeData) {
    this.#pointListComponent = pointListComponent;
    this.#changeData = changeData;
  }

  init = () => {
    if (this.#editPointComponent !== null) {
      return;
    }

    this.#editPointComponent = new EditPointView();

    this.#editPointComponent.setPointRollupClickHandler(this.#pointRollupClickHandler);
    this.#editPointComponent.setDeleteFormClickHandler(this.#deleteFormClickHandler);
    this.#editPointComponent.setPointFormSubmitHandler(this.#pointFormSubmitHandler);

    render(this.#pointListComponent, this.#editPointComponent, RenderPosition.AFTER_BEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);

  }

  destroy = () => {
    if (this.#editPointComponent === null) {
      return;
    }

    const newPointElement = document.querySelector('.trip-main__event-add-btn');

    newPointElement.disabled = false;

    remove(this.#editPointComponent);
    this.#editPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }

  #deleteFormClickHandler = () => {
    this.destroy();
  }

  #pointFormSubmitHandler = (update) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...deepPoint(update)}
    );
    this.destroy();
  }

  #pointRollupClickHandler = () => {
    this.destroy();
  }
}
