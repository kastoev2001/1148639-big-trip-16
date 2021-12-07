import dayjs from 'dayjs';
export const getRandomInteger = (first = 0, last = 1) => {
  const lower = Math.ceil(Math.min(first, last));
  const upper = Math.floor(Math.max(first, last));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const isFuture = (dueDate) => dueDate && dayjs().isBefore(dueDate, 'D');
export const isPast = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');
export const isPointExpiringToday = (dueDate) => dueDate && dayjs(dueDate).isSame(dayjs(), 'D');

export const getSortTime = (a, b) => b - a;
export const getSortPoints = function (points) {
  const sortPointsDates = points
    .map((date) => date.dueDate.startDate)
    .sort((a, b) => b - a);

  const sortPoints = sortPointsDates.map((date) => points.filter((point) => point.dueDate.startDate === date)[0]);

  return sortPoints;
};
