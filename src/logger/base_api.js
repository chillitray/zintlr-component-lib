import { withGlobalLogging } from './api-wrapper';

export class BaseApiHandler {
  static wrap(handler) {
    return withGlobalLogging(handler);
  }
}
