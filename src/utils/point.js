import dayjs from 'dayjs';

export const isFuture = (dueDate) => dueDate && dayjs().isBefore(dueDate, 'D');
export const isPast = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');
export const isPointExpiringToday = (dueDate) => dueDate && dayjs(dueDate).isSame(dayjs(), 'D');

export const sortPoints = (data) => [...data].sort((a, b) => b.dueDate.startDate - a.dueDate.startDate);
