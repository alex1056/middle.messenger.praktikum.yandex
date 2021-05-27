import { Store } from './store';
import { reducer } from './reducer';
import { isEmpty } from '../../utils/is-empty';

export function createStore(): Store {
  const data = localStorage.getItem('app-state');

  let dataParsed = {};
  if (data) {
    dataParsed = { ...JSON.parse(data) };
  }

  if (!Store._instance || isEmpty(Store._instance)) {
    Store._instance = new Store(reducer, dataParsed);
  }
  return Store._instance;
}
