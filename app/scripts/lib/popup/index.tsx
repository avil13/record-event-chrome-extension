import { h, render, Component } from 'preact';
import Code from './modules/Code';

// Create your app
const code = `
// hello world
const x = 2;
let y = 1;
var z = () => 0;


// Inject your application into the an element with the id
// Make sure that such an element exists in the dom ;

const app = <div>
  <h1>Hi man</h1>
  <Code code={code}/>
</div>;
`;

const app = <div>
  <h1>Hi man</h1>
  <Code code={code}/>
</div>;

// Inject your application into the an element with the id `app`.
// Make sure that such an element exists in the dom ;)
render(app, document.getElementById('app') as HTMLInputElement);
