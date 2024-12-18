export class AlreadyExistsError extends Error {
  constructor(object: string) {
    super(`${object} already exists`);
  }
}
