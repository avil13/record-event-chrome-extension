// Enable chromereload by uncommenting this line:
import 'chromereload/devonly';

import { activate, diactivate, getList } from './lib/content';
import actions from './lib/actions/actions';

// console.log(`'Allo 'Allo! Content script`);

const sendMessage = (data: any) => {
  chrome.runtime.sendMessage(data, function(response) {
    // console.log(response);
  });
};

// При активации запускаем слежение за эвентами
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension');
  // if (request.greeting === 'hello') sendResponse({ farewell: 'goodbye' });

  // debugger;
  if (request.action === actions.START) {
    activate(sendMessage);
  } else if (request.action === actions.STOP) {
    diactivate({ isReset: true });
  } else if (request.action === actions.PAUSE) {
    diactivate({ isReset: false });
  } else if (request.action === actions.GET_LIST) {
    getList();
  }
});

// устанавливаем событие отмены слежки в случае если вкладка потеряла фокус то запись ставится на паузу
document.addEventListener('visibilitychange', ev => {
  diactivate({ isReset: true });
});
