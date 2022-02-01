export default class ServicesModel {
  #services = [];
  #service = null;

  constructor(service) {
    this.#service = service;
  }

  get services() {
    return this.#services;
  }

  init = async () => {
    try {
      const services = await this.#service.services;
      this.#services = services.map(this.#adaptToClient);
    } catch(err) {
      this.#services = [];
    }
  }

  #adaptToClient = (service) => {
    const adaptedService = {
      name: service.type,
      services: service.offers.length !== 0 ? service.offers.map((offer) => ({
        id: offer.id,
        service: offer.title,
        price: offer.price})) : null
    };

    delete adaptedService['title'];

    return adaptedService;

  }
}
