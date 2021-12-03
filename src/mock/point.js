
import {nanoid} from '../nanoid';
import dayjs from 'dayjs';
import { getRandomInteger } from '../utils';

const COUNT_PICS = 5;

// const getRandomInteger = (first = 0, last = 1) => {
//   const lower = Math.ceil(Math.min(first, last));
//   const upper = Math.floor(Math.max(first, last));

//   return Math.floor(lower + Math.random() * (upper - lower + 1));
// };
const generateDescription = function () {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit', null,
    'Cras aliquet varius magna, non porta ligula feugiat eget.', null,
    'Fusce tristique felis at fermentum pharetra.', null,
    'Aliquam id orci ut lectus varius viverra.', null,
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', null
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const renserPics =function () {
  const requestUrl = [];

  for (let i = 0; i < COUNT_PICS; i++) {

    requestUrl.push(`http://picsum.photos/248/152?${(Math.floor(10 * Math.random()))}`);

  }
  return requestUrl;
};

const generateType = function () {
  const waypoints = [
    'Taxi',
    'Bus',
    'Train',
    'Ship',
    'Drive',
    'Flight',
    'Check-in',
    'Sightseeing',
    'Restaurant'
  ];

  const randomIndex = getRandomInteger(0, waypoints.length - 1);

  return waypoints[randomIndex];
};

const generateCities = function () {
  const cities = [
    'Amsterdam',
    'Chamonix',
    'Moscow',
    'Obninsk',
    'New-York'
  ];

  const randomIndex = getRandomInteger(0, cities.length - 1);

  return cities[randomIndex];
};

const generateService = function () {
  const services = [[
    {
      id: nanoid(),
      service: 'Add luggage',
      price: 30,
      isChecked: Boolean(getRandomInteger())
    },{
      id: nanoid(),
      service: 'Switch to comfort class',
      price: 100,
      isChecked: Boolean(getRandomInteger())
    },{
      id: nanoid(),
      service: 'choose seats',
      price: 5,
      isChecked: Boolean(getRandomInteger())
    }

  ], null ,[{
    id: nanoid(),
    service: 'Travel by train',
    price: 40,
    isChecked: Boolean(getRandomInteger())
  },{
    id: nanoid(),
    service: 'Add meal',
    price: 15,
    isChecked: Boolean(getRandomInteger())
  },{
    id: nanoid(),
    service: 'add luggage',
    price: 30,
    isChecked: Boolean(getRandomInteger())
  },{
    id: nanoid(),
    service: 'Travel by train',
    price: 40,
    isChecked: Boolean(getRandomInteger())
  }
  ]];

  const randomIndex = getRandomInteger(0, services.length - 1);
  return services[randomIndex];
};

const generateDate = function () {
  const startDaysGap = 3;
  const startHoursGap = 13;
  const startMinutesGap = 35;

  const generateStartDate = function () {

    const daysGap = getRandomInteger(-startDaysGap, startDaysGap);
    const hoursGap = getRandomInteger(0, startHoursGap);
    const minutesGap = getRandomInteger(0, startMinutesGap);

    const resultStartDate = dayjs()
      .add(daysGap, 'day')
      .add(hoursGap, 'hour')
      .add(minutesGap, 'minute');

    return resultStartDate;
  };

  const generateEndDate = function () {
    const endDaysGap = 7;
    const endHoursGap = 24;
    const endMinutesGap = 60;

    const daysGap = getRandomInteger(startDaysGap, endDaysGap);
    const hoursGap = getRandomInteger(startHoursGap, endHoursGap);
    const minutesGap = getRandomInteger(startMinutesGap, endMinutesGap);

    const resultEndDate = dayjs()
      .add(daysGap, 'day')
      .add(hoursGap, 'hour')
      .add(minutesGap, 'minute');

    return resultEndDate;
  };

  const startDate = generateStartDate();
  const endDate = generateEndDate();

  const gapDate = {
    day: endDate.diff(startDate, 'day'),
    hour: endDate.diff(startDate, 'hour') % 24,
    minute: endDate.diff(startDate, 'minute') % 60
  };

  return {
    startDate,
    endDate,
    gapDate
  };
};

export const generatePoint = () => ({
  pics: renserPics(),
  type: generateType(),
  city: generateCities(),
  services: generateService(),
  description: generateDescription(),
  dueDate: generateDate(),
  get price() {
    const initialPrice = getRandomInteger(20, 100);
    let overallPrice = initialPrice;
    if (this.services !== null) {
      this.services.map((element) => {
        overallPrice += element.price;
      });
      return {
        initialPrice,
        overallPrice
      };
    } else {
      return {
        initialPrice,
        overallPrice: null
      };
    }
  },
  isFavorites: Boolean(getRandomInteger()),
});
