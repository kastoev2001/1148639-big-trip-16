import AbstractView from './site-abstract-view';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dayjs from 'dayjs';

import { getDateDiff } from '../utils/point';
import { cloneArrayOfObjects } from '../utils/commonds';


const TypeStatistic = {
  MONEY: 'MONEY',
  TYPE: 'TYPE',
  TIME: 'TIME'
};
const BAR_HEIGHT = 55;
const FontSize = {
  TITLE: 23,
  TICKS: 13,
  DATALABELS: 13
};
const PADDING_TICKS = 5;
const POSITION_TITLE = 'left';
const Anchor = {
  DATASETS: 'start',
  DATALABELS: 'end'
};
const Align = {
  DATALABELS: 'start'
};
const MinWidthBar = {
  [TypeStatistic.TYPE]: 50,
  [TypeStatistic.TIME]: 100,
  [TypeStatistic.MONEY]: 50
};
const BAR_THICKNESS = 44;

const Color = {
  WHITE: '#ffffff',
  BLACK: '#000000'
};

const getcountTimesPoints = (types, points) => {
  const typesPoints = types
    .map((type) => points.filter((point) => point.type.name.toUpperCase() === type));

  const dates = typesPoints.map((typePoints) => {
    const dateMin = Math.min.apply(null, typePoints.map((point) => point.dueDate.startDate));
    let date = dayjs(dateMin);

    for (const point of typePoints) {
      date = date.add(point.dueDate.endDate.diff(point.dueDate.startDate, 'minute'), 'minute');
    }
    return dayjs(date).diff(dateMin, 'minute');
  });

  return dates;
};

const getTypesPoints = (points) => points.map((point) => point.type.name.toUpperCase()).filter((type, i, arr) => arr.indexOf(type) === i);

const renderMoneyChart = (moneyCtx, points) => {
  const types = getTypesPoints(points);

  const countPricesTypesPoints = types
    .map((type) => points.filter((point) => point.type.name.toUpperCase() === type))
    .map((typesPoints) => typesPoints.reduce((a, b) => a + b.price,0));

  moneyCtx.height =  `${BAR_HEIGHT * types.length}`;

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [{
        data: countPricesTypesPoints,
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
          align: Align.DATALABELS,
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

const renderTypeChart = (typeCtx, points) => {

  const types = getTypesPoints(points);

  const countTypesPoints = types
    .map((type) => points.filter((point) => point.type.name.toUpperCase() === type))
    .map((typesPoints) => typesPoints.reduce((a) => a + 1,0));

  typeCtx.height = `${BAR_HEIGHT * types.length}`;

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [{
        data: countTypesPoints,
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
          align: Align.DATALABELS,
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

const renderTimeChart = (timeCtx, points) => {

  const types = getTypesPoints(points);

  const countTimePoints = getcountTimesPoints(types, points);

  timeCtx.height = `${BAR_HEIGHT * types.length}`;

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [{
        data: countTimePoints,
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
          align: Align.DATALABELS,
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
    const moneyElement = this.element.querySelector('#money');
    const typeElement = this.element.querySelector('#type');
    const timeElement = this.element.querySelector('#time');

    renderMoneyChart(moneyElement, this.#points);
    renderTypeChart(typeElement, this.#points);
    renderTimeChart(timeElement, this.#points);
  }
}
