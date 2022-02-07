import PointView from '../view/point-view';
import EditPointView from '../view/edit-point-view';

import { deepPoint } from '../utils/commonds';
import { remove, render, RenderPosition, replace } from '../utils/render';
import { UpdateType, UserAction, ViewState } from '../const';

const Mode = {
  DEFAULT: 'DAFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointListComponent = null;
  #changeData = null;
  #changeMode = null;

  #destinationsModel = null;
  #servicesModel = null;

  #pointComponent = null;
  #editPointComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor(pointListComponent, changeData, changeMode, destinationsModel, servicesModel) {
    this.#pointListComponent = pointListComponent;
    this.#changeData = changeData;
    this.#changeMode = changeMode;

    this.#destinationsModel = destinationsModel;
    this.#servicesModel = servicesModel;
  }

  init = (point) => {
    const allDestinations = this.#destinationsModel.get;
    const allServices = this.#servicesModel.get;
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView(point);
    this.#editPointComponent = new EditPointView(point, allDestinations, allServices);

    this.#pointComponent.setExpandClickHandler(this.#expandClickHandler);
    this.#pointComponent.setFavoriteClickHandler(this.#favoriteClickHandler);
    this.#editPointComponent.setRollupClickHandler(this.#rollupClickHandler);
    this.#editPointComponent.setFormSubmitHandler(this.#formSubmitHandler);
    this.#editPointComponent.setDeleteFormClickHandler(this.#deleteFormClickHandler);

    if (!prevPointComponent || !prevEditPointComponent) {
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

  setViewState = (viewState) => {
    const resetFormState = () => {
      this.#editPointComponent.updateDate({
        isSaving: false,
        isDeleting: false,
        isDisabled: false,
      });
    };

    switch (viewState) {
      case ViewState.SAVING:
        this.#editPointComponent.updateDate({
          isSaving: true,
          isDisabled: true,
        });

        break;
      case ViewState.DELETING:
        this.#editPointComponent.updateDate({
          isDeleting: true,
          isDisabled: true,
        });

        break;
      case ViewState.ABORTING:
        this.#pointComponent.shake(resetFormState);
        this.#editPointComponent.shake(resetFormState);

        break;
    }
  }

  resetPoint = () => {
    if (this.#mode === Mode.EDITING) {
      this.#replaceFormToPoint();
    }
  }

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
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

  #formSubmitHandler = (point) => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      deepPoint(point),
    );
  }

  #deleteFormClickHandler = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      deepPoint(point),
    );
  }

  #expandClickHandler = () => {
    this.#replacePointToForm();
  }

  #rollupClickHandler = () => {
    this.#replaceFormToPoint();
  }

  #favoriteClickHandler = () => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      { ...this.#point, isFavorite: !this.#point.isFavorite },
    );
  }
}
