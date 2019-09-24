import { normalizeActionsList } from './lib/normalize-actions-list';
import { getCssPath } from './lib/get-css-path';
import { events } from './lib/events';
import { ActionType } from './types';
// import { getCodeByActions } from './lib/get-code-by-actions';

let actionsList: ActionType[] = [];

function watchEventCallback(ev: MouseEvent & { path: Element[] }) {
  const { path, type, target } = ev;
  const value = (target as HTMLInputElement).value || '';

  actionsList.push({
    event: type,
    value,
    selector: getCssPath(path),
    location: window.location.href,
    time: Date.now()
  });

  actionsList = normalizeActionsList(actionsList);

  // console.log(getCodeByActions(actionsList));
}

export function activate(callback: (data: any) => void) {
  let event: string;

  for (let k in events) {
    if (events.hasOwnProperty(k)) {
      // @ts-ignore
      event = events[k];

      window.addEventListener(event, watchEventCallback, true);
    }
  }
}

export function diactivate() {
  let event: string;

  for (let k in events) {
    if (events.hasOwnProperty(k)) {
      // @ts-ignore
      event = events[k];

      window.removeEventListener(event, watchEventCallback, true);
    }
  }
}
