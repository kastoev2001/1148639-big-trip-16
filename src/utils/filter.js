import { FilterType } from '../const';
import { isFuture, isPointExpiringToday, isPast, isInterval } from '../utils/point';

export const Filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuture(point.dueDate.startDate) || isPointExpiringToday(point.dueDate.startDate) || isInterval(point.dueDate)),
  [FilterType.PAST]: (points) => points.filter((point) => isPast(point.dueDate.endDate) || isInterval(point.dueDate)),
};
