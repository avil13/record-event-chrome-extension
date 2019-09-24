import { h, render, Component } from 'preact';
import { ActionsWrapper } from '../../actions';


export default class BottomMenu extends Component {
  action: ActionsWrapper;

  constructor () {
    super();
    this.action = new ActionsWrapper();
  }

  runRecord() {
    this.action.start();
  }

  render() {
    return (
      <div>
        <button onClick={this.runRecord.bind(this)} type='button' className='btn'>Record</button>
        <button type='button' className='btn'>Copy</button>
        <button type='button' className='btn'>Clear</button>
      </div>
    );
  }
}
