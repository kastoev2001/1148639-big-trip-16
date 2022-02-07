import dayjs from 'dayjs';
window.date = dayjs;
export const getOverallPrice = (price, services) => {
  let overallPrice = price;

  if (services) {
    for (const service of services) {
      overallPrice += service.price;
    }

    return overallPrice;
  }

  return price;
};

export const getDateDiff = (dateDiff) => {
  const DAY_IN_HOURS = 24;
  const HOUR_IN_MINUTES = 60;
  const DISCHARGE = 2;

  const dayCount = Math.floor((dateDiff / HOUR_IN_MINUTES) / DAY_IN_HOURS);
  const hourCount = Math.floor(dateDiff / HOUR_IN_MINUTES) % DAY_IN_HOURS;
  const minuteCount = dateDiff % HOUR_IN_MINUTES;

  const day = String(dayCount).length === DISCHARGE ? dayCount : `0${dayCount}`;
  const hour = String(hourCount).length === DISCHARGE ? hourCount : `0${hourCount}`;
  const minute = String(minuteCount).length === DISCHARGE ? minuteCount : `0${minuteCount}`;

  if (dayCount !== 0) {
    const timeInDays = `${day}D ${hour}H ${minute}M`;

    return timeInDays;
  } else if (hourCount !== 0) {
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

