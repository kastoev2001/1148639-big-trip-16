
import dayjs from 'dayjs';
import { getRandomInteger, deepClone } from '../utils/commonds';
import {Types, Cities} from '../const';
import { nanoid } from 'nanoid';

const generateType = function () {
  const randomIndex = getRandomInteger(0, Types.length - 1);

  const type = deepClone(Types[randomIndex]);

  if (type.services) {
    type.services.forEach((service) => {
      service.isChecked = Boolean(getRandomInteger());
    });
  }
  return type;
};

const generateCity = function () {

  const randomIndex = getRandomInteger(0, Cities.length - 1);

  return Cities[randomIndex];
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

  return {
    startDate,
    endDate,
  };
};

export const generatePoint = () => ({
  id: nanoid(),
  type: generateType(),
  city: generateCity(),
  dueDate: generateDate(),
  price: getRandomInteger(20, 100),
  isFavorite: Boolean(getRandomInteger()),
});
