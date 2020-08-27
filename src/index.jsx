// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
// import { Provider } from 'react-redux';
import '../assets/application.scss';
import { Provider } from './context';

import faker from 'faker';
import gon from 'gon';
import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('gon', gon);

const isNameSet = cookies.get('name') !== undefined;
if (!isNameSet) {
  const randomName = faker.name.findName();
  cookies.set('name', randomName);
}
const name = cookies.get('name');

const { channels, messages, currentChannelId } = gon;


ReactDOM.render(
  <Provider value={ name }>
    <App channels={channels} messages={messages} currentChannelId={currentChannelId}/>
  </Provider>,
  document.querySelector('#chat')
);
