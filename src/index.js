import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import ContextProviders from './context';
import {Provider} from 'react-redux'
import store from './store'
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore.js';

const persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
    <React.StrictMode>
    <BrowserRouter>
    <ContextProviders>
    <App />
    </ContextProviders>
    </BrowserRouter>
    </React.StrictMode>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
