/* import prism themes */
import 'prismjs/themes/prism-solarizedlight.css';
// import 'prismjs/themes/prism.css';

import { h } from 'preact';
// @ts-ignore
const html = require('preact-html');
// @ts-ignore
const Prism = require('prismjs');


const Code = ({ language = '', className = '', ...rest }) => {

    const code = rest.children && rest.children.length > 0 ? rest.children[0] : (rest.code || '');
    language = language || 'js';

    return (
        <pre
            class={ [`language-${language}`, rest.class, className].filter(Boolean).join(' ') }
        >
            <code class={`language-${language}`}>
                { html(Prism.highlight(code, Prism.languages[language])) }
            </code>
        </pre>
    );
};

export default Code;
