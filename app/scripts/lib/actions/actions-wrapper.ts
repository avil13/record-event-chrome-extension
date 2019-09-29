import { messageType } from './actions';

export class ActionsWrapper {
  protected _subscribers: Array<(msg: messageType) => void> = [];

  protected _port: chrome.runtime.Port;

  static onMessage(cb: (request: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => void) {
    if (chrome.runtime) {
      chrome.runtime.onMessage.addListener(cb);
    } else {
      console.log('No onMessage listener');
    }
  }

  onMessage(fn: (msg: messageType) => void) {
    if (this._subscribers.includes(fn) === false) {
      this._subscribers.push(fn);
    } else {
      console.log(`${fn} - already used`);
    }
  }
}
