import { messageType } from './types';

export type onMessageContentCallback = (msg: messageType, sender?: chrome.runtime.MessageSender, sendResponse?: (response?: any) => void) => void;

export class ActionsBase {
  protected _subscribers: onMessageContentCallback[] = [];

  protected _port: chrome.runtime.Port;

  constructor() {
    if (chrome.runtime && chrome.runtime.onMessage) {
      chrome.runtime.onMessage.addListener((message: any, sender: chrome.runtime.MessageSender, sendResponse) => {
        this._subscribers.forEach(fn => {
          console.debug('content-script: message from background', message);
          fn(message, sender, sendResponse);
        });
      });
    } else {
      console.debug('No "chrome.runtime.onMessage"');
    }
  }

  onMessage(fn: onMessageContentCallback) {
    if (this._subscribers.includes(fn) === false) {
      this._subscribers.push(fn);
    } else {
      console.log(`${fn} - already used`);
    }
  }

  sendMessage(msg: messageType) {
    if (chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage(msg, response => {
        console.log(response);
      });
    } else {
      console.debug('No "chrome.runtime.sendMessage"');
    }
  }
}
