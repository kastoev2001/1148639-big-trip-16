import dayjs from 'dayjs';

export const getOverallPrice = (price, services) => {
  let overallPrice = Number(price);

  if (services !== null) {
    for (const service of services) {
      overallPrice += service.price;
    }

    return overallPrice;
  }

  return price;
};

export const getDateDiff = (dateDiff) => {
  const day = Math.floor(dateDiff / 60 / 24);
  const hour = Math.floor(dateDiff / 60) % 24;
  const minute = dateDiff % 60;

  if (day > 0) {
    return `${day}Д ${hour}Ч ${minute}М`;
  } else if (hour > 0) {
    return `${hour}Ч ${minute}М`;
  }

  return `${minute}M`;
};

export const isInterval = (dueDate) => dueDate && dayjs().isAfter(dueDate.startDate, 'minute') && dayjs().isBefore(dueDate.endDate, 'minute');
export const isFuture = (dueDate) => dueDate && dayjs().isBefore(dueDate, 'minute');
export const isPast = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'minute');
export const isPointExpiringToday = (dueDate) => dueDate && dayjs(dueDate).isSame(dayjs(), 'minute');
export const isDateLess = (startDate, endDate) => startDate.isAfter(endDate);

export const sortPoints = (data) => [...data].sort((a, b) => a.dueDate.startDate - b.dueDate.startDate);
export const sortPrices = (data) => [...data].sort((a, b) => getOverallPrice(b.price, b.type.services) - getOverallPrice(a.price, a.type.services));
export const sortTimes = (data) => [...data].sort((a, b) => b.dueDate.endDate.diff(b.dueDate.startDate, 'minute') - a.dueDate.endDate.diff(a.dueDate.startDate, 'minute'));

