import { actions, messageType, PORT_NAME } from './types';
import { ActionsBase } from './actions-base';

export class ActionsPopup extends ActionsBase {
  private static _instance: ActionsPopup;

  constructor() {
    super();

    if (ActionsPopup._instance) {
      return ActionsPopup._instance;
    }

    if (!(this instanceof ActionsPopup)) {
      return new ActionsPopup();
    }

    ActionsPopup._instance = this;
  }

  get port(): chrome.runtime.Port {
    if (!this._port) {
      if (!chrome.tabs) {
        throw new Error('No tabs extension error');
      }

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        this._port = chrome.tabs.connect(tabs[0].id as number, { name: PORT_NAME });

        this._port.onMessage.addListener(msg => {
          this._subscribers.forEach(fn => fn(msg));
        });
      });
    }
    return this._port;
  }

  sendMessage(msg: messageType) {

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      this._port = chrome.tabs.connect(tabs[0].id as number, { name: PORT_NAME });

      this._port.postMessage(msg);

      this._port.onMessage.addListener(msg => {
        this._subscribers.forEach(fn => fn(msg));
      });
    });
    // this.port.postMessage(msg);
  }

  start() {
    this.sendMessage({ action: actions.START });
    // if (chrome.browserAction) {
    //   chrome.browserAction.setBadgeText({ text: 'rec' });
    //   chrome.browserAction.setBadgeBackgroundColor({ color: '#FF0000' });
    // }
  }

  pause() {
    this.sendMessage({ action: actions.PAUSE });
  }

  stop() {
    this.sendMessage({ action: actions.STOP });
  }
}
