import { createStore } from 'redux';
import todoApp from './reducers';

const addLoggingToDispatch = (store) => {
  /* eslint-disable no-console */
  const rawDispatch = store.dispatch;
  if (!console.group) {
    return rawDispatch;
  }

  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
  /* eslint-enable no-console */
}

const configureStore = () => {
  const store = createStore(todoApp);

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }

  return store;
};

export default configureStore;
