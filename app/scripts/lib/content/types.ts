import { events } from './lib/events';

export interface ActionType {
    event: string;
    selector: string;
    value: string;
    location: string;
    time: number;
}
