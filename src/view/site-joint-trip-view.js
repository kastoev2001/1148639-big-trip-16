import dayjs from 'dayjs';
import AbstractView from './site-abstract-view';

const getNotPassedPath = function (points) {
  const sities = points.map((point) => point.city);

  const sortPoints = sities
    .map((city, i, arr) =>  {
      const instantElement = city;
      const nextElement = arr[i + 1];

      if (instantElement !== nextElement) {
        return instantElement;
      } else {
        return null;
      }

    })
    .filter((city) => city !== null)
    .join(' — ');


  return (
    `<h1 class="trip-info__title">${sortPoints}</h1>`
  );
};

const getStartAndEndTrip = function (points) {

  const endTimePoint = dayjs(points[0].dueDate.startDate).format('MMM D');
  const startTimePoint = dayjs(points[0].dueDate.startDate).format('MMM') !== dayjs(points[points.length - 1].dueDate.startDate).format('MMM')
    ? dayjs(points[points.length - 1].dueDate.startDate).format('MMM D')
    :	dayjs(points[points.length - 1].dueDate.startDate).format('D');

  return(
    `<p class="trip-info__dates"> ${endTimePoint} — ${startTimePoint}</p>`
  );
};

const createJointTripTemplate = function (points) {

  return (
    `<section class="trip-main__trip-info  trip-info">
   	<div class="trip-info__main">
			 ${getNotPassedPath(points)}
			${getStartAndEndTrip(points)}
		</div>
   
   	<p class="trip-info__cost">
   		Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
   	</p>
   </section>`
  );
};

export default class JointTripView extends AbstractView {
  #points = null;

  constructor(points) {
		super();
    this.#points = points;
  }

  get template() {
    return createJointTripTemplate(this.#points);
  }
}
