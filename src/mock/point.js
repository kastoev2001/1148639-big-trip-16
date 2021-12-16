
import dayjs from 'dayjs';
import { getRandomInteger, generateId } from '../utils/commonds';
import {TYPE_POINT} from '../const';

const COUNT_PICS = 5;

const generateDescription = function () {

  const DESCRIPTIONS = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit', null,
    'Cras aliquet varius magna, non porta ligula feugiat eget.', null,
    'Fusce tristique felis at fermentum pharetra.', null,
    'Aliquam id orci ut lectus varius viverra.', null,
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', null
  ];

  const randomIndex = getRandomInteger(0,DESCRIPTIONS.length - 1);

  return DESCRIPTIONS[randomIndex];
};

const renserPics =function () {
  const requestUrl = [];

  for (let i = 0; i < COUNT_PICS; i++) {

    requestUrl.push(`http://picsum.photos/248/152?${(Math.floor(10 * Math.random()))}`);

  }
  return requestUrl;
};

const generateType = function () {

  const randomIndex = getRandomInteger(0, TYPE_POINT.length - 1);

  return TYPE_POINT[randomIndex];
};

const generateCities = function () {

  const CITIES = [
    'Amsterdam',
    'Chamonix',
    'Moscow',
    'Obninsk',
    'New-York'
  ];

  const randomIndex = getRandomInteger(0, CITIES.length - 1);

  return CITIES[randomIndex];
};

const generateService = function () {
  const services = [[
    {
      id: generateId(),
      get service() {
        return 'Add luggage';
      },
      price: 30,
      isChecked: Boolean(getRandomInteger())
    },{
      id: generateId(),
      get service()  {
        return 'Switch to comfort class';
      },
      price: 100,
      isChecked: Boolean(getRandomInteger())
    },{
      id: generateId(),
      get service()  {
        return 'choose seats';
      },
      price: 5,
      isChecked: Boolean(getRandomInteger())
    }

  ], null, [{
    id: generateId(),
    get service() {
      return 'Travel by train';
    },
    price: 40,
    isChecked: Boolean(getRandomInteger())
  },{
    id: generateId(),
    get service() {
      return  'Add meal';
    },
    price: 15,
    isChecked: Boolean(getRandomInteger())
  },{
    id: generateId(),
    get service()  {
      return 'add luggage';
    },
    price: 30,
    isChecked: Boolean(getRandomInteger())
  },{
    id: generateId(),
    get service()  {
      return 'Travel by train';
    },
    price: 40,
    isChecked: Boolean(getRandomInteger())
  }
  ]];

  const randomIndex = getRandomInteger(0, services.length - 1);
  return services[randomIndex];
};

const generateDate = function () {
  const StartDate = {
    DAY: 3,
    HOUR: 13,
    MINUTE: 35
  };

  const generateStartDate = function () {

    const daysGap = getRandomInteger(-StartDate.DAY, StartDate.DAY);
    const hoursGap = getRandomInteger(0, StartDate.HOUR);
    const minutesGap = getRandomInteger(0, StartDate.MINUTE);

    const resultStartDate = dayjs()
      .add(daysGap, 'day')
      .add(hoursGap, 'hour')
      .add(minutesGap, 'minute');

    return resultStartDate;
  };

  const generateEndDate = function () {
    const EndDate = {
      DAY: 7,
      HOUR: 24,
      MINUTE: 60
    };

    const daysGap = getRandomInteger(StartDate.DAY, EndDate.DAY);
    const hoursGap = getRandomInteger(StartDate.HOUR, EndDate.HOUR);
    const minutesGap = getRandomInteger(StartDate.MINUTE, EndDate.MINUTE);

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

export const generatePoint = () => {
  const initialPrice = getRandomInteger(20, 100);

  return {
    pics: renserPics(),
    type: generateType(),
    city: generateCities(),
    services: generateService(),
    description: generateDescription(),
    dueDate: generateDate(),
    get price() {
      let overallPrice = initialPrice;
      if (this.services !== null) {
        this.services.map((services) => {
          if (services.isChecked) {
            overallPrice += services.price;
          }
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
    isFavorite: Boolean(getRandomInteger()),
  };
};
