import { h, render, Component } from 'preact';


// Create your app
// const app = h('div', null, 'Hello World!');
const app = <h1>Hi man</h1>;

// Inject your application into the an element with the id `app`.
// Make sure that such an element exists in the dom ;)
render(app, document.getElementById('app') as HTMLInputElement);
