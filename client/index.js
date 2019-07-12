import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import store from './store';
import { Provider, connect } from 'react-redux';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
