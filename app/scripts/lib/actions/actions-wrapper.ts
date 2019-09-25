export class ActionsWrapper {
  static onMessage(cb: (request: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => void) {
    chrome.runtime.onMessage.addListener(cb);
  }

  onMessage(cb: (request: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => void) {
    ActionsWrapper.onMessage(cb);
  }
}
