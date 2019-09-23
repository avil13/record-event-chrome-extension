import { events } from './lib/events';

export interface ActionType {
    event: typeof events;
    selector: string;
    value: string;
    location: string;
    time: number;
}
