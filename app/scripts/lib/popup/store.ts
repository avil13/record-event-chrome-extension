import { ActionsPopup } from '../actions/actions-popup';
import { messageType, actions } from '../actions/types';
import { ActionType } from '../content/types';

// ActionsPopup

export interface StateType {
  id: number;
  list: ActionType[];
  [key: string]: any;
}

export default class Store {
  private static _instance: Store;

  private readonly action: ActionsPopup;

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

    this.action = new ActionsPopup();

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
    (this._state as any) = { ...this.state };
    (this.state as any) = {};

    for (let key in this._state) {
      if (this.state.hasOwnProperty(key)) {
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
    if (this._state[key] === undefined) {
      throw new Error(`"${key}" - wrong state name`);
    }
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
