import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '../assets/application.scss';
import { configureStore } from '@reduxjs/toolkit';
import faker from 'faker';
import cookies from 'js-cookie';
import gon from 'gon';
import Context from './context';
import App from './components/App.jsx';
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

const { channels, currentChannelId, messages } = gon;

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    channelsInfo: {
      channels,
      currentChannelId,
    },
    messages,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <Context.Provider value={ name }>
      <App/>
    </Context.Provider>
  </Provider>,
  document.querySelector('#chat'),

);
