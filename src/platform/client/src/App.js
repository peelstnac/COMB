import React from 'react';
import { connect } from 'react-redux';
// Import components
import landing from './components/landing';
import login from './components/login';
import Dashboard from './components/dashboard';
// Import actions
import switchPage from './actions/switchPage';
import updateAuth from './actions/updateAuth';

// Redux boilerplate
const landingMapStateToProps = (state) => {
    let { page, auth } = state;
    return({
        page: page,
        auth: auth
    });
}
const landingMapDispatchToProps = (dispatch) => {
    return({
      switchPage: (page) => {
        dispatch(switchPage(page));
      },
      updateAuth: (data) => {
          dispatch(updateAuth(data));
      }
    });
}
const Landing = connect(landingMapStateToProps, landingMapDispatchToProps)(landing);
const Login = connect(landingMapStateToProps, landingMapDispatchToProps)(login);

class App extends React.Component {
    render() {
        switch (this.props.page) {
            case 1:
                return(
                    <Landing />
                );
            case 2:
                return (
                    <Login />
                );
            case 3:
                return (
                    <Dashboard />
                );
            default:
                return(
                    <Landing />
                );
        }
    }
}

export default App;