import {actions, messageType } from './actions';

export class ActionsPopupWrapper {
  static sendMessage(msg: messageType) {
    if (!chrome.tabs) {
      throw new Error('No tabs extension error');
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      // @ts-ignore
      chrome.tabs.sendMessage(tabs[0].id, msg, function(response: any) {
        console.log(response);
      });
    });
  }

  sendMessage(msg: messageType) {
    ActionsPopupWrapper.sendMessage(msg);
  }

  start() {
    this.sendMessage({ action: actions.START });

    if (chrome.browserAction) {
      chrome.browserAction.setBadgeText({ text: 'rec' });
      chrome.browserAction.setBadgeBackgroundColor({ color: '#FF0000' });
    }
  }

  pause() {
    this.sendMessage({ action: actions.PAUSE });
  }

  stop() {
    this.sendMessage({ action: actions.STOP });
  }
}
