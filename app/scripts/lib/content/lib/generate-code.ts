import { events } from './events';
import { ActionType } from '../types';

type CodeGenType = ActionType
    | { event: '_start' | '_end' | '_wait'; selector: string; value?: string };

export function generateCode(param: CodeGenType): string {
    if (!param.selector) {
        return '';
    }

    const el = `$('${param.selector}')`;
    const w = `await wait('${param.selector}');\n`;

    switch (param.event) {
        case '_start':
            return `(async () => {\n  const $ = document.querySelector.bind(document);`;

        case '_end':
            return `\n})()`;

        case '_wait':
            return `
const wait = (selector) => {
    return new Promise((resolve, reject) => {
        let countOfRepeat = 10;
        const intervalId = setInterval(() => {
            if (countOfRepeat < 0) {
                clearInterval(intervalId);
                reject(new Error(\`Can't find "\${selector}"\`));
            }

            if ($(selector)) {
                resolve($(selector));
                clearInterval(intervalId);
            }
        }, 200);
    });
};

`;

        case events.CLICK:
            return `${w}${el}.click();`;

        case events.DBLCLICK:
            return `${w}  ${el}.dispatchEvent(new MouseEvent('dblclick', {
  'view': window,
  'bubbles': true,
  'cancelable': true
}));`;

        case events.CHANGE:
        case events.INPUT:
        case events.SELECT:
            return `${w}${el}.value = '${param.value}';`;
    }

    return '';
}
