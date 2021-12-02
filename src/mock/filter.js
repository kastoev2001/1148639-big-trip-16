import { isFuture, isPointExpiringToday, isPast} from '../utils';

const pointToFilterMap = {
  everything: (points) => points.length,
  future: (points) => points.filter((point) => isFuture(point.dueDate.startDate) || isPointExpiringToday(point.dueDate.startDate)).length,
  Past: (points) => points.filter((point) => isPast(point.dueDate.startDate)).length
};

export const generateFilter = (points) => Object.entries(pointToFilterMap).map(
  ([filterName, countPoint]) => ({
    name: filterName,
    count: countPoint(points),
  }),
);
