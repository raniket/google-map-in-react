import React from 'react';
import ReactDOM from 'react-dom';
// import ErrorBoundary from './utils/ErrorBoundary';
import './index.css';
import App from './App.jsx';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger'
import reducer from './reducers';
import rootSaga from './sagas';


const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(sagaMiddleware, logger);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(middleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render((
  <Provider store={store} >
    <App />
  </Provider>
), document.getElementById('root'));
