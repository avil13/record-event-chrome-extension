import { h, render, Component } from 'preact';
import Code from '../modules/Code';

import Store from '../store';
import { getCodeByActions } from '../../content/lib/get-code-by-actions';

const store = new Store();

// Create your app
const code = getCodeByActions(store.$.list);

interface IndexPageState {
  code: string;
}

export default class IndexPage extends Component<{}, IndexPageState> {
  constructor() {
    super();
    this.state = {
      code: 'xxx'
    };

    store.on('list', (list) => {
      console.log('list :', list);
    });
  }

  render(props: {}, state: IndexPageState) {
    return (
      <div>
        <Code code={state.code}/>
      </div>
    );
  }
}
