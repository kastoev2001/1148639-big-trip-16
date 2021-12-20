export default class ObserverEvent {
  #scribblers = [];

  subscribe = (callback) => {
    this.#scribblers.push(callback);
  }

  unsubscribe = (callback) => {
    this.#scribblers.filter((element) => callback !== element);
  }

  broadcast = () => {
    this.#scribblers.forEach((callback) => callback());
  }
}
