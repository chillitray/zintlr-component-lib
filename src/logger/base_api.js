import { withGlobalLogging } from './api-wrapper';

export default class BaseApiHandler {
  static wrap(handler) {
    return withGlobalLogging(handler);
  }
}
