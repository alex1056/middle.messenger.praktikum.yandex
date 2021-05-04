import { TState, TAction } from './types';
import { Actions } from './actions';

type StoreSubscriberMethod = any;
// type StoreSubscription = any;
type TReducer = Function;

export class Store {
  private state: TState = {};

  //   private subscribers: StoreSubscriberMethod[] = [];
  private subscribers: { [key: string]: any[] } = {};

  static _instance = {} as Store;

  constructor(private reducer: TReducer, private initialState: TState) {
    //   constructor(private initialState: TState) {
    this.state = reducer({ ...this.initialState }, { type: '__INIT__' });
    this.reducer = reducer;
  }

  //   subscribe<F extends StoreSubscriberMethod>(fn: F): StoreSubscription {
  //     this.subscribers.push(fn);
  //     return {
  //       unsubscribe: function () {
  //         this.subscribers = this.subscribers.filter((subscriber: StoreSubscriberMethod) => subscriber !== fn);
  //       }.bind(this),
  //     };
  //   }

  //   dispatch(action: TAction) {
  //     this.state = this.reducer(this.state, action);
  //     this.subscribers.forEach((subscriber: StoreSubscriberMethod) => subscriber(this.state));
  //   }

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
      throw new Error(`Нет события: ${action.type}`);
    } else {
      this.subscribers[action.type].forEach((subscriber: StoreSubscriberMethod) => subscriber(this.state));
    }
    if (!this.subscribers[Actions.ANY_ACTION]) {
      throw new Error(`Нет события: ${Actions.ANY_ACTION}`);
    } else {
      this.subscribers[Actions.ANY_ACTION].forEach((subscriber: StoreSubscriberMethod) => subscriber(this.state));
    }
  }

  getState() {
    return this.state;
  }
}
