import AbstractView from './abstract-view';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dayjs from 'dayjs';

import { getDateDiff } from '../utils/point';
import { cloneArrayOfObjects } from '../utils/commonds';

const PADDING_TICKS = 5;
const BAR_HEIGHT = 55;
const BAR_THICKNESS = 44;
const ALING_DATALABELS = 'start';
const POSITION_TITLE = 'left';

const TypeStatistic = {
  MONEY: 'MONEY',
  TYPE: 'TYPE',
  TIME: 'TIME',
};
const FontSize = {
  TITLE: 23,
  TICKS: 13,
  DATALABELS: 13,
};
const Anchor = {
  DATASETS: 'start',
  DATALABELS: 'end',
};
const MinWidthBar = {
  [TypeStatistic.TYPE]: 50,
  [TypeStatistic.TIME]: 100,
  [TypeStatistic.MONEY]: 50,
};

const Color = {
  WHITE: '#ffffff',
  BLACK: '#000000',
};

const getTypesPoints = (points) => points.map((point) => point.type.name.toUpperCase()).filter((type, i, arr) => arr.indexOf(type) === i);

const getDates = (points) => {
  const typesPoints = getTypesPoints(points);
  const pointsByType = typesPoints
    .map((type) => points.filter((point) => point.type.name.toUpperCase() === type));
  let dates = pointsByType.map((pointsType, i) => {
    const dateMin = Math.min.apply(null, pointsType.map((point) => point.dueDate.startDate));
    let date = dayjs(dateMin);

    for (const point of pointsType) {
      date = date.add(point.dueDate.endDate.diff(point.dueDate.startDate, 'minute'), 'minute');
    }
    return {
      type: typesPoints[i],
      date: dayjs(date).diff(dateMin, 'minute'),
    };
  });

  dates = [...dates].sort((a, b) => b.date - a.date);

  return dates;
};

const getTypes = (points) => {
  const typesPoints = getTypesPoints(points);
  const pointsByType = typesPoints.map((type) => points.filter((point) => point.type.name.toUpperCase() === type));

  let types = pointsByType.map((pointsType, i) => ({
    type: typesPoints[i],
    count: pointsType.reduce((a) => a + 1, 0),
  }));

  types = [...types].sort((a, b) => b.count - a.count);

  return types;
};

const getMoneys = (points) => {
  const typesPoints = getTypesPoints(points);
  const pointsByType = typesPoints.map((type) => points.filter((point) => point.type.name.toUpperCase() === type));

  let moneys = pointsByType.map((pointsType, i) => ({
    type: typesPoints[i],
    price: pointsType.reduce((a, b) => a + b.price, 0),
  }));

  moneys = [...moneys].sort((a, b) => b.price - a.price);

  return moneys;
};


const renderMoneyChart = (moneyCtx, statisticDate) => {
  const types = statisticDate.map((type) => type.type);
  const prices = statisticDate.map((price) => price.price);

  moneyCtx.height = `${BAR_HEIGHT * types.length}`;

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [{
        data: prices,
        backgroundColor: Color.WHITE,
        hoverBackgroundColor: Color.WHITE,
        anchor: Anchor.DATASETS,
        barThickness: BAR_THICKNESS,
        minBarLength: MinWidthBar[TypeStatistic.MONEY],
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: FontSize.DATALABELS,
          },
          color: Color.BLACK,
          anchor: Anchor.DATALABELS,
          align: ALING_DATALABELS,
          formatter: (date) => `${date}`,
        },
      },
      title: {
        display: true,
        text: TypeStatistic.MONEY,
        fontColor: Color.BLACK,
        fontSize: FontSize.TITLE,
        position: POSITION_TITLE,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: Color.BLACK,
            padding: PADDING_TICKS,
            fontSize: FontSize.TICKS,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTypeChart = (typeCtx, statisticDate) => {
  const types = statisticDate.map((type) => type.type);
  const countTypes = statisticDate.map((count) => count.count);

  typeCtx.height = `${BAR_HEIGHT * types.length}`;

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [{
        data: countTypes,
        backgroundColor: Color.WHITE,
        hoverBackgroundColor: Color.WHITE,
        anchor: Anchor.DATASETS,
        barThickness: BAR_THICKNESS,
        minBarLength: MinWidthBar[TypeStatistic.TYPE],
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: FontSize.DATALABELS,
          },
          color: Color.BLACK,
          anchor: Anchor.DATALABELS,
          align: ALING_DATALABELS,
          formatter: (date) => `${date}x`,
        },
      },
      title: {
        display: true,
        text: TypeStatistic.TYPE,
        fontColor: Color.BLACK,
        fontSize: FontSize.TITLE,
        position: POSITION_TITLE,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: Color.BLACK,
            padding: PADDING_TICKS,
            fontSize: FontSize.TICKS,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTimeChart = (timeCtx, statisticDate) => {
  const types = statisticDate.map((type) => type.type);
  const dates = statisticDate.map((date) => date.date);

  timeCtx.height = `${BAR_HEIGHT * types.length}`;

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [{
        data: dates,
        backgroundColor: Color.WHITE,
        hoverBackgroundColor: Color.WHITE,
        anchor: Anchor.DATASETS,
        barThickness: BAR_THICKNESS,
        minBarLength: MinWidthBar[TypeStatistic.TIME],
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: FontSize.DATALABELS,
          },
          color: Color.BLACK,
          anchor: Anchor.DATALABELS,
          align: ALING_DATALABELS,
          formatter: getDateDiff,
        },
      },
      title: {
        display: true,
        text: TypeStatistic.TIME,
        fontColor: Color.BLACK,
        fontSize: FontSize.TITLE,
        position: POSITION_TITLE,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: Color.BLACK,
            padding: PADDING_TICKS,
            fontSize: FontSize.TICKS,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatisticsView = () => (
  `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="money" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="type" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="time" width="900"></canvas>
    </div>
  </section>`
);

export default class StatisticsView extends AbstractView {
  #points = null;

  constructor(points) {
    super();

    this.#points = [...cloneArrayOfObjects(points)];

    this.#setCharts();
  }

  get template() {
    return createStatisticsView();
  }

  #setCharts = () => {
    const points = cloneArrayOfObjects(this.#points);

    const StatisticDate = {
      [TypeStatistic.MONEY]: getMoneys(points),
      [TypeStatistic.TYPE]: getTypes(points),
      [TypeStatistic.TIME]: getDates(points),
    };

    const moneyElement = this.element.querySelector('#money');
    const typeElement = this.element.querySelector('#type');
    const timeElement = this.element.querySelector('#time');

    renderMoneyChart(moneyElement, StatisticDate[TypeStatistic.MONEY]);
    renderTypeChart(typeElement, StatisticDate[TypeStatistic.TYPE]);
    renderTimeChart(timeElement, StatisticDate[TypeStatistic.TIME]);
  }
}
