import React from 'react';
// to get store for each view
import { Provider } from 'react-redux';
// store states
import configureStore from './store/configure-store';
// middleWare for asyn
import rootSaga from './sagas/index';
// root layout view
import Router from './page/Router';  

// config store
const store = configureStore();

// run root saga
store.runSaga(rootSaga);

// set store to view
const Root = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default Root;
