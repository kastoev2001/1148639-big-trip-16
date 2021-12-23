import dayjs from 'dayjs';

export const isFuture = (dueDate) => dueDate && dayjs().isBefore(dueDate, 'D');
export const isPast = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');
export const isPointExpiringToday = (dueDate) => dueDate && dayjs(dueDate).isSame(dayjs(), 'D');

export const sortPoints = (data) => [...data].sort((a, b) => b.dueDate.startDate - a.dueDate.startDate);
export const sortPrices = (data) => [...data].sort((a, b) => b.price.overallPrice - a.price.overallPrice);
export const sortTimes = (data) => [...data].sort((a, b) =>	b.dueDate.endDate.diff(b.dueDate.startDate, 'minute') - a.dueDate.endDate.diff(a.dueDate.startDate, 'minute'));

export const getDateDiff = (endDate, startDate) => {
  const currentDate = dayjs();

  const dayDiff = endDate.diff(startDate, 'day') + 1;
  const hourDiff = (endDate.diff(startDate, 'hour') % 24);
  const minuteDiff = (endDate.diff(startDate, 'minute') % 60);


  const dateDiff =	dayjs(`${currentDate.year()}-${currentDate.month()}-${dayDiff} ${hourDiff}:${minuteDiff}`);

  if (dateDiff.date() > 1) {
    return `${dateDiff.subtract(1, 'day').format('DD')}Д ${dateDiff.format('hh')}Ч ${dateDiff.format('mm')}М`;
  } else if (dateDiff.hour() !== 0) {
    return `${dateDiff.format('hh')}Ч ${dateDiff.format('mm')}М`;
  } else {
    return `${dateDiff.format('mm')}M`;
  }
};
