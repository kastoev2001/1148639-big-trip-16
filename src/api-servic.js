const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class ApiService {
  #endPoint = null;
  #authorization = null;

  constructor(endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  get points() {
    return this.#load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get services() {
    return this.#load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this.#load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  #load = async ({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) => {
    headers.append('Authorization', this.#authorization);

    const response = await fetch(
      `${this.#endPoint}/${url}`,
      {method, body, headers},
    );

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  }

  static parseResponse = (response) => response.json();

  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  #adaptedToServer = (point) => ({
    id: point.id,
    type: point.type.name,
    'base_price': point.price,
    'date_from': point.dueDate.startDate !== null ? point.dueDate.startDate.toDate().toISOString() : null,
    'date_to': point.dueDate.endDate !== null ? point.dueDate.endDate.toDate().toISOString() : null,
    destination: point.destination,
    'is_favorite': point.isFavorite,
    offers: point.type.services !== null ? point.type.services : []
  })

  static catchError = (err) => {
    throw err;
  }
}
