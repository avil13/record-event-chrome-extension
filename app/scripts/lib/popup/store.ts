import { ActionsPopupWrapper } from '../actions/actions-popup-wrapper';
import { messageType, actions } from '../actions/actions';
import { ActionType } from '../content/types';

// ActionsPopupWrapper

export interface StateType {
  id: number;
  list: ActionType[];
  [key: string]: any;
}

export default class Store {
  private static _instance: Store;

  private readonly action: ActionsPopupWrapper;

  private readonly _state: { [key: string]: Function[] } = {};

  private readonly state: StateType = {
    id: 0,
    list: []
  };

  private readonly subscribers: {
    [key: string]: Function[];
  } = {};

  constructor() {
    if (Store._instance) {
      return Store._instance;
    }

    if (!(this instanceof Store)) {
      return new Store();
    }

    this.state._id = Math.random();

    this.action = new ActionsPopupWrapper();

    Store._instance = this;

    this.boot();
  }

  private boot() {
    this.action.onMessage((ev: messageType) => {
      if (ev.action === actions.LIST && ev.list) {
        this.$.list = ev.list;
      }
    });

    const self = this;

    for (let key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        this._state[key] = this.state[key];

        if (this.subscribers[key] === undefined) {
          this.subscribers[key] = [];
        }

        Object.defineProperty(this._state, key, {
          enumerable: true,
          get() {
            return self._state[key];
          },
          set(v) {
            self._state[key] = v;
            self.subscribers[key].forEach(fn => {
              fn(self._state[key]);
            });
          }
        });
      }
    }
  }

  get $() {
    return this.state;
  }

  //
  on(key: string, handler: (v?: any) => void) {
    if (this.subscribers[key] === undefined) {
      this.subscribers[key] = [];
    }
    this.subscribers[key].push(handler);
  }

  off(key: string, handler: (v?: any) => void) {
    if (this.subscribers[key].includes(handler)) {
      const index = this.subscribers[key].indexOf(handler);
      this.subscribers[key].splice(index, 1);
    }
  }
}
