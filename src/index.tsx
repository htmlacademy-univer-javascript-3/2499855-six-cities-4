import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { store } from './store';
import { Provider } from 'react-redux';
import { checkAuth } from './store/api-actions';

store.dispatch(checkAuth());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
