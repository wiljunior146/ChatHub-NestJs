export class InvalidObjectIdException extends Error {
  constructor () {
    super('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters');
  }
}
