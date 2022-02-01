export default class DestinationsModel {
  #destinations = [];
  #apiService = null;

  constructor(apiService) {
    this.#apiService = apiService;
  }

  get destinations() {
    return this.#destinations;
  }

  init = async () => {
    try {
      const destinations = await this.#apiService.destinations;

      this.#destinations = destinations;
    } catch(err) {
      this.#destinations = [];
    }
  }
}
