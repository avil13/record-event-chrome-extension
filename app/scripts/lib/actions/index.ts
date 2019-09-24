export class ActionsWrapper {
  private static instance: ActionsWrapper;

  constructor() {
    if (ActionsWrapper.instance) {
      return ActionsWrapper.instance;
    }

    ActionsWrapper.instance = new ActionsWrapper();

    return ActionsWrapper.instance;
  }

  start() {
    chrome.browserAction.setBadgeText({ text: 'rec' });
    chrome.browserAction.setBadgeBackgroundColor({ color: '#FF0000' });
  }

  stop() {}
}
