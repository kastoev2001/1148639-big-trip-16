export default class DestinationsModel {
  #destinations = [];
  #service = null;

  constructor(service) {
    this.#service = service;
  }

  get destinations() {
    return this.#destinations;
  }

  init = async () => {
    try {
      const destinations = await this.#service.destinations;

      this.#destinations = destinations;
    } catch(err) {
      this.#destinations = [];
    }
  }
}
