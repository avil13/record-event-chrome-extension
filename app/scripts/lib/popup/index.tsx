import { h, render, Component } from 'preact';
import { Router, Link } from 'preact-router';
// @ts-ignore
import { createHashHistory } from 'history';

import IndexPage from './pages';
import BottomMenu from './modules/BottomMenu';

import Store from './store';

const store = new Store();

const Main = (
<div>
  <nav class='navigation-bar top box'>
    <Link activeClassName='active' class='btn' href='/'>Home</Link>
    <Link activeClassName='active' class='btn' href='/foo'>Foo</Link>
    <Link activeClassName='active' class='btn' href='/bar'>Bar</Link>
  </nav>
  <Router history={createHashHistory()}>
    <IndexPage path='/' />
  </Router>
  <div className='navigation-bar bottom box'>
    <BottomMenu />
  </div>
</div>
);

// Inject your application into the an element with the id `app`.
// Make sure that such an element exists in the dom ;)
render(Main, document.getElementById('app') as HTMLInputElement);
