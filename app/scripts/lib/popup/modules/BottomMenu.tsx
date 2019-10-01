import { h, render, Component } from 'preact';
import { ActionsPopup } from '../../actions/actions-popup';


export default class BottomMenu extends Component {
  action: ActionsPopup;

  constructor () {
    super();
    this.action = new ActionsPopup();
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
