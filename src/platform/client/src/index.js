import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider, connect } from 'react-redux'

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
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);