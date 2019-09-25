import { ActionsWrapper } from './actions-wrapper';
import { actions, messageType } from './actions';

export class ActionsContentWrapper extends ActionsWrapper {
  static sendMessage(msg: messageType) {
    chrome.runtime.sendMessage(msg, function(response) {
      // console.log(response);
    });
  }

  sendMessage(msg: messageType) {
    ActionsContentWrapper.sendMessage(msg);
  }
}
