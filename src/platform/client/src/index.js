import React from 'react';
import ReactDOM from 'react-dom';
import { store, persistor } from './store';
import { Provider, connect } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

// Import components
import app from './App';

// Redux boilerplate
const appMapStateToProps = (state) => {
  const { page } = state;
  return ({
    page: page
  });
}
const appMapDispatchToProps = (dispatch) => {
  return ({

  });
}
const App = connect(appMapStateToProps, appMapDispatchToProps)(app);

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