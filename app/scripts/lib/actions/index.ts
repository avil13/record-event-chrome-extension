import actions from './actions';

export class ActionsWrapper {
  start() {
    this.sendMessage({ action: actions.START });

    if (chrome.browserAction) {
      chrome.browserAction.setBadgeText({ text: 'rec' });
      chrome.browserAction.setBadgeBackgroundColor({ color: '#FF0000' });
    }
  }

  stop() {
    this.sendMessage({ action: actions.STOP });
  }

  sendMessage(msg: any) {
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
}
