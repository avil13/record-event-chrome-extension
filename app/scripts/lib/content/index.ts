import { normalizeActionsList } from './lib/normalize-actions-list';
import { getCssPath } from './lib/get-css-path';
import { events } from './lib/events';
import { ActionType } from './types';
import { ActionsContent } from '../actions/actions-content';
import { actions } from '../actions/types';
import throttle from '../../utils/trottle';
// import { getCodeByActions } from './lib/get-code-by-actions';

const actionsContent = new ActionsContent();

const sendMessage = (list: ActionType[]) => {
  console.log('[list]=>', list);
  actionsContent.sendMessage({
    action: actions.LIST,
    list: list
  });
};

export class ListContentActions {
  private static _actionsList: ActionType[] = [];

  get actionsList(): ActionType[] {
    return ListContentActions._actionsList;
  }

  set actionsList(val: ActionType[]) {
    ListContentActions._actionsList = val;
  }

  /**
   *
   * @param list
   */
  sendList(list: ActionType[]) {
    sendMessage(list);
  }

  /**
   *
   * @param options
   */
  activate(options: { isReset: boolean }) {
    if (options.isReset === true) {
      this.actionsList = [];
    }

    this.sendList(this.actionsList);

    let event: string;

    for (let k in events) {
      if (events.hasOwnProperty(k)) {
        // @ts-ignore
        event = events[k];

        window.addEventListener(event, this.watchEventCallback, true);
      }
    }
  }

  /**
   *
   * @param options
   */
  diactivate(options: { isReset: boolean }) {
    this.sendList(this.actionsList);

    if (options.isReset === true) {
      this.actionsList = [];
    }

    let event: string;

    for (let k in events) {
      if (events.hasOwnProperty(k)) {
        // @ts-ignore
        event = events[k];

        window.removeEventListener(event, this.watchEventCallback, true);
      }
    }
  }

  /**
   *
   */
  getList() {
    this.sendList(this.actionsList);
    return this.actionsList;
  }

  /**
   *
   * @param ev
   */
  private watchEventCallback(ev: MouseEvent & { path: Element[] }) {
    const { path, type, target } = ev;
    const value = (target as HTMLInputElement).value || '';

    this.actionsList.push({
      event: type,
      value,
      selector: getCssPath(path),
      location: window.location.href,
      time: Date.now()
    });

    this.actionsList = normalizeActionsList(this.actionsList);
    this.sendList(this.actionsList);
    // console.log(getCodeByActions(this.actionsList));
  }
}
