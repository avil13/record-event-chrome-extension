// Enable chromereload by uncommenting this line:
import 'chromereload/devonly';

import { ListContentActions } from './lib/content';
import { actions } from './lib/actions/types';
import { ActionsContent } from './lib/actions/actions-content';

const listActions = new ListContentActions();
const actionsContent = new ActionsContent();

// При активации запускаем слежение за эвентами
actionsContent.onMessage((request, sender, sendResponse) => {
  // console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension');
  // if (request.greeting === 'hello') sendResponse({ farewell: 'goodbye' });
  switch (request.action) {
    case actions.START:
        listActions.activate({ isReset: true });
      break;
    case actions.STOP:
        listActions.diactivate({ isReset: true });
      break;
    case actions.PAUSE:
        listActions.diactivate({ isReset: false });
      break;
    case actions.GET_LIST:
        listActions.getList();
      break;
  }
});

// устанавливаем событие отмены слежки в случае если вкладка потеряла фокус то запись ставится на паузу
document.addEventListener('visibilitychange', ev => {
  listActions.diactivate({ isReset: true });
});
