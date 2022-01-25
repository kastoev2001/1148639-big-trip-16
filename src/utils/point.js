import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { getRandomInteger } from './commonds';

const COUNT_PICS = 5;

export const getOverallPrice = (price, services) => {
  let overallPrice = Number(price);
  if (services !== null) {
    services.map((service) => {
      if (service.isChecked) {
        overallPrice += service.price;
      }
    });
    return overallPrice;
  } else {
    return price;
  }
};

export const getDateDiff = (endDate, startDate) => {
  const currentDate = dayjs();

  const dayDiff = endDate.diff(startDate, 'day') + 1;
  const hourDiff = (endDate.diff(startDate, 'hour') % 24);
  const minuteDiff = (endDate.diff(startDate, 'minute') % 60);


  const dateDiff =  dayjs(`${currentDate.year()}-${currentDate.month()}-${dayDiff} ${hourDiff}:${minuteDiff}`);

  if (dateDiff.date() > 1) {
    return `${dateDiff.subtract(1, 'day').format('DD')}Д ${dateDiff.format('hh')}Ч ${dateDiff.format('mm')}М`;
  } else if (dateDiff.hour() !== 0) {
    return `${dateDiff.format('hh')}Ч ${dateDiff.format('mm')}М`;
  } else {
    return `${dateDiff.format('mm')}M`;
  }
};


export const generatePics =function () {
  const requestUrl = [];

  for (let i = 0; i < COUNT_PICS; i++) {

    requestUrl.push(`http://picsum.photos/248/152?${(Math.floor(10 * Math.random()))}`);

  }
  return requestUrl;
};

export const generateServices = function () {
  const services = [[
    {
      id: nanoid(),
      service: 'Add luggage',
      price: 30,
      isChecked: false
    },{
      id: nanoid(),
      service: 'Switch to comfort class',
      price: 100,
      isChecked: false
    },{
      id: nanoid(),
      service: 'Choose seats',
      price: 5,
      isChecked: false
    }

  ], null, [{
    id: nanoid(),
    service: 'Travel by train',
    price: 40,
    isChecked: false
  },{
    id: nanoid(),
    service: 'Add meal',
    price: 15,
    isChecked: false
  },{
    id: nanoid(),
    service: 'Add luggage',
    price: 30,
    isChecked: false
  }
  ]];

  const randomIndex = getRandomInteger(0, services.length - 1);

  return services[randomIndex];
};
export const isInterval = (dueDate) => dueDate && dayjs().isAfter(dueDate.startDate, 'D') && dayjs().isBefore(dueDate.endDate, 'D');
export const isFuture = (dueDate) => dueDate && dayjs().isBefore(dueDate, 'D');
export const isPast = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');
export const isPointExpiringToday = (dueDate) => dueDate && dayjs(dueDate).isSame(dayjs(), 'D');
export const isDateLess = (startDate, endDate) => startDate.isAfter(endDate);

export const sortPoints = (data) => [...data].sort((a, b) => b.dueDate.startDate - a.dueDate.startDate);
export const sortPrices = (data) => [...data].sort((a, b) => getOverallPrice(b.price, b.type.services) - getOverallPrice(a.price, a.type.services));
export const sortTimes = (data) => [...data].sort((a, b) =>  b.dueDate.endDate.diff(b.dueDate.startDate, 'minute') - a.dueDate.endDate.diff(a.dueDate.startDate, 'minute'));

