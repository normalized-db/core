import { ValidKey } from '../model/valid-key';

export class NotFoundError extends Error {

  constructor(type: string, key: ValidKey) {
    super(`Could not find "${type}" with key "${key}"`);
  }
}
