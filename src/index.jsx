// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { Provider } from 'react-redux';
import '../assets/application.scss';
import Context from './context';
import {configureStore} from '@reduxjs/toolkit';
import faker from 'faker';
import cookies from 'js-cookie';
import rootReducer from './reducers';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const isNameSet = cookies.get('name') !== undefined;
if (!isNameSet) {
  const randomName = faker.name.findName();
  cookies.set('name', randomName);
}
const name = cookies.get('name');

const store = configureStore({
  reducer: rootReducer
})

ReactDOM.render(
  <Provider store={store}>
    <Context.Provider value={ name }>
      <App/>
    </Context.Provider>
  </Provider>,
  document.querySelector('#chat')

);
