import { generatePics, generateServices } from './utils/point';

export const SortType = {
  DEFAULT: 'default',
  TIME_DOWN: 'time',
  PRICE_DOWN: 'price'
};

export const UserAction = {
  UPDATE_POINT: 'update_point',
  ADD_POINT: 'add_point',
  DELETE_POINT: 'delete_point'
};

export const UpdateType = {
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'mojor'
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

export const MenuItem = {
  TABLE: 'table',
  STATS: 'stats'
};

export const Types = [
  {
    name: 'Taxi',
    services: generateServices()
  },
  {
    name: 'Bus',
    services: generateServices()
  },
  {
    name: 'Train',
    services: generateServices()
  },
  {
    name: 'Ship',
    services: generateServices()
  },
  {
    name: 'Drive',
    services: generateServices()
  },
  {
    name: 'Flight',
    services: generateServices()
  },
  {
    name: 'Check-in',
    services: generateServices()
  },
  {
    name: 'Sightseeing',
    services: generateServices()
  },
  {
    name: 'Restaurant',
    services: generateServices()
  },
];

export const Cities = [{
  name: 'Amsterdam',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  pics: generatePics(),
},{
  name: 'Chamonix',
  description: 'Fusce tristique felis at fermentum pharetra.',
  pics: generatePics(),
},{
  name: 'Moscow',
  description: 'Cras aliquet varius magna, non porta ligula feugiat eget.',
  pics: generatePics(),
},{
  name: 'Obninsk',
  description: null,
  pics: null,
},{
  name: 'New-York',
  description: 'Cras aliquet varius magna, non porta ligula feugiat eget.',
  pics: generatePics(),
},{
  name: 'Paris',
  description: 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  pics: generatePics(),
}];
