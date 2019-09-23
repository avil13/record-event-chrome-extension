import { events } from './events';

export function normalizeActionsList(list) {
    let prevItem = null;
    let nextItem = null;
    const result = [];

    list.forEach((item, index) => {
        prevItem = list[index - 1];
        nextItem = list[index + 1];

        if (!prevItem || !nextItem) {
            result.push(item);
            return;
        }

        const isSameSelector = item.selector === nextItem.selector;
        const isInputEvent = [events.CHANGE, events.INPUT].includes(item.event);
        const isSmallTimeDiff = nextItem.time - item.time < 600;
        // const isSametEvent = item.event === nextItem.event;

        // && isSametEvent
        if (isSameSelector && isInputEvent && isSmallTimeDiff) {
            return;
        }

        result.push(item);
    });

    return result;
}
