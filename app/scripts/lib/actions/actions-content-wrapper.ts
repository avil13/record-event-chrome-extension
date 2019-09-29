import { actions, messageType, PORT_NAME } from './actions';
import { ActionsWrapper } from './actions-wrapper';

export class ActionsContentWrapper  extends ActionsWrapper {
  private static _instance: ActionsContentWrapper;

  constructor () {
    super();

    if (ActionsContentWrapper._instance) {
      return ActionsContentWrapper._instance;
    }

    if (!(this instanceof ActionsContentWrapper)) {
      return new ActionsContentWrapper();
    }

    ActionsContentWrapper._instance = this;
  }

  get port(): chrome.runtime.Port {
    if (!this._port) {
      this._port = chrome.runtime.connect({ name: PORT_NAME });

      this._port.onMessage.addListener((msg) => {
        this._subscribers.forEach((fn) => fn(msg));
      });
    }
    return this._port;
  }

  sendMessage(msg: messageType) {
    this.port.postMessage(msg);
  }
}
