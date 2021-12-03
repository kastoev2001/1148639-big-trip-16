import {getRandomInteger} from '../utils';

export const createJointTripTemplate = function (points) {

  const sities = points.map((point) => point.city).join(' — ');

  const startDate = Math.ceil(getRandomInteger(0, 15));
  const endtDate = Math.ceil(getRandomInteger(15, 30));

  return (`<section class="trip-main__trip-info  trip-info">
	<div class="trip-info__main">
		<h1 class="trip-info__title">${sities}</h1>

		<p class="trip-info__dates">Mar ${startDate} — ${endtDate}</p>
	</div>

	<p class="trip-info__cost">
		Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
	</p>
</section>`);
};
