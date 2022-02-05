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
  const dayCount = Math.floor(dateDiff / 60 / 24);
  const hourCount = Math.floor(dateDiff / 60) % 24;
  const minuteCount = dateDiff % 60;

  const day = String(dayCount).length === 2 ? dayCount : `0${dayCount}`;
  const hour = String(hourCount).length === 2 ? hourCount : `0${hourCount}`;
  const minute = String(minuteCount).length === 2 ? minuteCount : `0${minuteCount}`;

  if (day > 0) {
    const timeInDays = `${day}D ${hour}H ${minute}M`;

    return timeInDays;
  } else if (hour > 0) {
    const timeInHours = `${hour}H ${minute}M`;

    return timeInHours;
  }

  const timeInMinutes = `${minute}M`;

  return timeInMinutes;
};

export const isInterval = (dueDate) => dueDate && dayjs().isAfter(dueDate.startDate, 'minute') && dayjs().isBefore(dueDate.endDate, 'minute');
export const isFuture = (dueDate) => dueDate && dayjs().isBefore(dueDate, 'minute');
export const isPast = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'minute');
export const isPointExpiringToday = (dueDate) => dueDate && dayjs(dueDate).isSame(dayjs(), 'minute');
export const isDateLess = (startDate, endDate) => startDate.isAfter(endDate);

export const sortPoints = (data) => [...data].sort((a, b) => a.dueDate.startDate - b.dueDate.startDate);
export const sortPrices = (data) => [...data].sort((a, b) => getOverallPrice(b.price, b.type.services) - getOverallPrice(a.price, a.type.services));
export const sortTimes = (data) => [...data].sort((a, b) => b.dueDate.endDate.diff(b.dueDate.startDate, 'minute') - a.dueDate.endDate.diff(a.dueDate.startDate, 'minute'));

