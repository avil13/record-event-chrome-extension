
export enum actions {
  START = 'START',
  STOP = 'STOP',
  PAUSE = 'PAUSE',
  GET_LIST = 'GET_LIST',
  LIST = 'LIST',
}


export type messageType = {
  action: keyof typeof actions;
  list?: any[];
  [key: string]: any;
};
