import { ActionsPopupWrapper } from '../actions/actions-popup-wrapper';
import { messageType, actions } from '../actions/actions';
import { ActionType } from '../content/types';

// ActionsPopupWrapper

export type StateType = {
  _id: number;
  list: ActionType[];
};

export default class Store {
  private static _instance: Store;

  private readonly action: ActionsPopupWrapper;

  private readonly state: StateType = {
    _id: 0,
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
        this.setList(ev.list);
      }
    });
  }

  private set updatedKey(key: keyof StateType) {
    if (this.subscribers[key]) {
      this.subscribers[key].forEach(fn => {
        fn(this.state[key]);
      });
    }
  }

  //

  on(key: string, handler: (v?: any) => void) {
    if (this.subscribers[key] === undefined) {
      this.subscribers[key] = [];
    }
    this.subscribers[key].push(handler);
  }

  // Mutations
  setList(list: ActionType[]) {
    this.state.list = list;
    this.updatedKey = 'list';
  }

  // Getters
  get list(): ActionType[] {
    return this.state.list;
  }

  get id() {
    return this.state._id;
  }
}
