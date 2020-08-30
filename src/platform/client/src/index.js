import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider, connect } from 'react-redux'

// Import components
import app from './App';

// Import actions
import switchPage from './actions/switchPage';

// Redux boilerplate
const appMapStateToProps = (state) => {
  const { page } = state;
  return ({
    page: page
  });
}
const appMapDispatchToProps = (dispatch) => {
  return({
    switchPage: (page) => {
      dispatch(switchPage(page));
    }
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