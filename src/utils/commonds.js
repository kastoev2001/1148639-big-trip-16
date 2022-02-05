export const deepClone = (object) => (JSON.parse(JSON.stringify(object)));
export const deepPoint = (point) => ({
  ...deepClone(point),
  dueDate: {...point.dueDate},
});
export const cloneArrayOfObjects = (points) => (points.map((point) => ({
  ...deepPoint(point),
  dueDate: {...point.dueDate},
})));
