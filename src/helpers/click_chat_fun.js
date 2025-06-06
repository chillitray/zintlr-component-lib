import { isBrowser } from './isBrowser';

export const click_chat_fun = () => {
  if (isBrowser()) {
    var elements = document.getElementsByClassName('cc-157aw cc-1kgzy');
    if (elements && elements.length > 0) {
      elements[0].click();
    }
  }
};
