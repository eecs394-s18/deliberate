import { createStore, combineReducers } from 'redux';
import { reducer, initialState } from './index.js'

export const configureStore = () => {
  const store = createStore(
    reducer, 
    initialState,
  );

  return store;
}

export default configureStore;