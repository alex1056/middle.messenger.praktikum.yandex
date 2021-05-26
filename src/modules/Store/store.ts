import { TState, TAction } from './types';
// import { Actions } from './actions';

type StoreSubscriberMethod = any;
// type StoreSubscription = any;
type TReducer = Function;

export class Store {
  private state: TState = {};

  private subscribers: { [key: string]: any[] } = {};

  static _instance = {} as Store;

  constructor(private reducer: TReducer, private initialState: TState) {
    this.state = reducer({ ...this.initialState }, { type: '__INIT__' });
    this.reducer = reducer;
  }

  subscribe(action: string, callback: Function) {
    if (!this.subscribers[action]) {
      this.subscribers[action] = [];
    }
    this.subscribers[action].push(callback);
    return {
      unsubscribe: function () {
        this.subscribers[action] = this.subscribers[action].filter(
          (subscriber: StoreSubscriberMethod) => subscriber !== callback,
        );
      }.bind(this),
    };
  }

  dispatch(action: TAction) {
    this.state = this.reducer(this.state, action);

    if (!this.subscribers[action.type]) {
      // console.log(`Нет события: ${action.type}`);
    } else {
      this.subscribers[action.type].forEach((subscriber: StoreSubscriberMethod) => subscriber(this.state));
    }
    localStorage.setItem('app-state', JSON.stringify(this.state));
  }

  getState() {
    return this.state;
  }
}
