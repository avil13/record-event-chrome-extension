export class ActionsWrapper {
  static onMessage(cb: (request: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => void) {
    if (chrome.runtime) {
      chrome.runtime.onMessage.addListener(cb);
    } else {
      console.log('No onMessage listener');
    }
  }

  onMessage(cb: (request: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => void) {
    ActionsWrapper.onMessage(cb);
  }
}
