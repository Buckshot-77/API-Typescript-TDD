export class ServerError extends Error {
  constructor() {
    super('There was an internal server error. Please, try again later.');
    this.name = 'ServerError';
  }
}
