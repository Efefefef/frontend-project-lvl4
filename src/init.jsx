import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import cookies from 'js-cookie';
import faker from 'faker';
import { configureStore } from '@reduxjs/toolkit';
import gon from 'gon';
import io from 'socket.io-client';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import rootReducer from './reducers';
import routes from './routes';
import Context from './context';
import App from './components/App';


export default () => {
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

  const socket = io(routes.host);
  socket.on('newMessage', (msg) => {
    const {
      data: {
        attributes: {
          body, channelId, nickname, id,
        },
      },
    } = msg;
    store.dispatch({
      type: 'messages/addMessage',
      payload: {
        body, channelId, nickname, id,
      },
    });
  });

  ReactDOM.render(
    <Provider store={store}>
      <Context.Provider value={ name }>
        <App/>
      </Context.Provider>
    </Provider>,
    document.querySelector('#chat'),
  );
};
