export const getRandomInteger = (first = 0, last = 1) => {
  const lower = Math.ceil(Math.min(first, last));
  const upper = Math.floor(Math.max(first, last));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index), update, ...items.slice(index + 1),
  ];
};

export const deepClone = (object) => (JSON.parse(JSON.stringify(object)));
export const deepPoint = (point) => ({
  ...deepClone(point),
  dueDate: {...point.dueDate}
});
export const cloneArrayOfObjects = (points) => (points.map((point) => ({
  ...deepPoint(point),
  dueDate: {...point.dueDate}
})));