
import dayjs from 'dayjs';

const getRandomInteger = (first = 0, last = 1) => {
  const lower = Math.ceil(Math.min(first, last));
  const upper = Math.floor(Math.max(first, last));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
function generateDescription() {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.'
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

function renserPics() {
  let requestUrl = `http://picsum.photos/248/152?${(10 * Math.random())}`;

  return requestUrl;
};

function generateType() {
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

function generateCities() {
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
 
function generateService() {
  const services = [{
			services: ['Add meal', 'Add luggage'],
			prices: [20, 30]
		},{
			services: null,
			prices: null

		},{
			services: ['Switch to comfort'],
				prices: [80]
	}];
	
  const randomIndex = getRandomInteger(0, services.length - 1);
	return services[randomIndex];
};

function generateDate() {
	const startDaysGap = 3;
	const startHoursGap = 13
	const startMinutesGap = 35;


	function generateStartDate() {
	
		const daysGap = getRandomInteger(0, startDaysGap);
		const hoursGap = getRandomInteger(0, startHoursGap);
		const minutesGap = getRandomInteger(0, startMinutesGap);

		const resultStartDate = dayjs()
		.add(daysGap, 'day')
		.add(hoursGap, 'hour')
		.add(minutesGap, 'minute');
	
		return resultStartDate;
	};
	
	function generateEndDate() {
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
	}

	const startDate = generateStartDate();
	const endDate = generateEndDate();

	const gapDate = {
		day: endDate.diff(startDate, 'day'),
		hour: endDate.diff(startDate, 'hour') % 24,
		minute: endDate.diff(startDate, 'minute') % 60
	};

	return {
		startDate: {
			day: startDate.date(),
			hour: startDate.hour(),
			minute: startDate.minute(),
		},
		endDate: {
			day: endDate.date(),
			hour: endDate.hour(),
			minute: endDate.minute(),
		},
		gapDate
	}

}

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
		if (this.services.prices !== null) {
			this.services.prices.forEach(elem => {
				overallPrice += elem;
			})
			
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