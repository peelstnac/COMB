import React from 'react';
import ReactDOM from 'react-dom';
import { store, persistor } from './store';
import { Provider, connect } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

// Import components
import App from './App';

// Redux boilerplate

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);