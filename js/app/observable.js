class Observervable {
  constructor () {
    this.observers = [];
  }

  trigger (params) {
    this.observers.forEach((observer) => observer.call(observer, params));
  }

  addObserver (event, observer) {
    this.observers.push(observer);
  }
}
