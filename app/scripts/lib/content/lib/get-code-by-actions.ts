import { ActionType } from '../types';
import { generateCode } from './generate-code';


export function getCodeByActions(list: ActionType[]) {
    let result = '';

    result += generateCode({ event: '_start', selector: 'body' });
    result += generateCode({ event: '_wait', selector: 'body' });

    result += list.map(v => '  ' + generateCode(v)).join('\n');

    result += generateCode({ event: '_end', selector: 'body' });

    return result;
}
