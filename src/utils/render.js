import AbstractView from '../view/site-abstract-view';
export const RenderPosition = {
  BEFORE_BEGIN: 'beforebegin',
  AFTER_BEGIN: 'afterbegin',
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
};

export const render = (container, element, place) => {
  const parent = (container instanceof AbstractView)
    ? container.element
    : container;

  const child = (element instanceof AbstractView)
    ? element.element
    : element;

  switch (place) {
    case RenderPosition.BEFORE_BEGIN:
      parent.before(child);
      break;
    case RenderPosition.AFTER_BEGIN:
      parent.prepend(child);
      break;
    case RenderPosition.BEFORE_END:
      parent.append(child);
      break;
    case RenderPosition.AFTER_END:
      parent.after(child);
      break;
  }
};

export const replace = (newElement, oldElement) => {
  if (newElement === null || oldElement === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  const newChild = newElement instanceof AbstractView
    ? newElement.element
    : newElement;

  const oldChild = oldElement instanceof AbstractView
    ? oldElement.element
    : oldElement;

  const parent = oldChild.parentElement;

  if (parent === null) {
    throw new Error('Parent element doesn\'t exist');
  }

  parent.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  component.element.remove();
  component.removeElement();
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};