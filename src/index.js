import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './components/app/App';
import AppReducer from './components/app/appReducer';

// TODO: upgrade to Sagas if have

const middleware = [
  thunk
];

const store = createStore(AppReducer, {}, applyMiddleware(...middleware));

ReactDOM.render(
  <Provider store = {store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
