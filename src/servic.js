const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class Service {
  #endPoint = null;
  #authorization = null;

  constructor(endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  get points() {
    return this.#load({url: 'points'})
      .then(Service.parseResponse);
  }

  get services() {
    return this.#load({url: 'offers'})
      .then(Service.parseResponse);
  }

  get destinations() {
    return this.#load({url: 'destinations'})
      .then(Service.parseResponse);
  }

  updatePoint = async (point) => {
    const response = await this.#load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptedToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'})
    });

    const parsedResponse = await Service.parseResponse(response);

    return parsedResponse;
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
      Service.checkStatus(response);
      return response;
    } catch (err) {
      Service.catchError(err);
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