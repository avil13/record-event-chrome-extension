import { h, render, Component } from 'preact';
import { ActionsPopupWrapper } from '../../actions/actions-popup-wrapper';


export default class BottomMenu extends Component {
  action: ActionsPopupWrapper;

  constructor () {
    super();
    this.action = new ActionsPopupWrapper();
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
