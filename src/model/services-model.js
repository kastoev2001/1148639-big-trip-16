export default class ServicesModel {
  #services = [];
  #service = null;

  constructor(service) {
    this.#service = service;
  }

  get get() {
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
      services: service.offers,
    };

    return adaptedService;
  }
}
