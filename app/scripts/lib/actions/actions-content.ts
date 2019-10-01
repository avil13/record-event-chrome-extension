import { actions, messageType, PORT_NAME } from './types';
import { ActionsBase } from './actions-base';

export class ActionsContent  extends ActionsBase {
  private static _instance: ActionsContent;

  constructor () {
    super();

    if (ActionsContent._instance) {
      return ActionsContent._instance;
    }

    if (!(this instanceof ActionsContent)) {
      return new ActionsContent();
    }

    ActionsContent._instance = this;
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
