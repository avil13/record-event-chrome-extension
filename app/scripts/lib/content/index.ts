import { normalizeActionsList } from './lib/normalize-actions-list';
import { getCssPath } from './lib/get-css-path';
import { events } from './lib/events';
import { ActionType } from './types';
import { getCodeByActions } from './lib/get-code-by-actions';

let actionsList: ActionType[] = [];

let event;

for (let k in events) {
    if (events.hasOwnProperty(k)) {
        event = events[k];
        window.addEventListener(
            event,
            ev => {
                const { path, type, target } = ev;

                actionsList.push({
                    event: type,
                    selector: getCssPath(path),
                    value: target.value || '',
                    location: window.location.href,
                    time: Date.now()
                });

                actionsList = normalizeActionsList(actionsList);

                // console.table(actionsList);

                console.log(getCodeByActions(actionsList));
            },
            true
        );
    }
}
