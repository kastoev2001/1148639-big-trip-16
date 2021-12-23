import dayjs from 'dayjs';

export const isFuture = (dueDate) => dueDate && dayjs().isBefore(dueDate, 'D');
export const isPast = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');
export const isPointExpiringToday = (dueDate) => dueDate && dayjs(dueDate).isSame(dayjs(), 'D');

export const sortPoints = (data) => [...data].sort((a, b) => b.dueDate.startDate - a.dueDate.startDate);

export const getDateDiff = (endDate, startDate) => {
	const currentDate = dayjs();

	const dayDiff = endDate.diff(startDate, 'day') + 1;
	const hourDiff = (endDate.diff(startDate, 'hour') % 24)
	const minuteDiff = (endDate.diff(startDate, 'minute') % 60)


  const dateDiff =	dayjs(`${currentDate.year()}-${currentDate.month()}-${dayDiff} ${hourDiff}:${minuteDiff}`);

	const dateDiffFormat = (dateDiff.date() > 1)
	? `${dateDiff.subtract(1, 'day').format('DD')}Д ${dateDiff.format('hh')}Ч ${dateDiff.format('mm')}М`
	: (dateDiff.hour() !== 0)
	? `${dateDiff.format('hh')}Ч ${dateDiff.format('mm')}М`
	: `${dateDiff.format('mm')}M`;

	return dateDiffFormat;
}