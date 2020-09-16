import React from 'react';
import { connect } from 'react-redux';
// Import components
import { Landing } from './components/landing';
import { Login } from './components/login';
import Dashboard from './components/dashboard';
// Import actions
import { switchPage } from './actions/switchPage';
import { updateAuth } from './actions/updateAuth';
// Import CSS
import './main.css';

// Redux boilerplate
const landingMapStateToProps = (state) => {
    let { page, auth } = state;
    return ({
        page: page,
        auth: auth
    });
}
const landingMapDispatchToProps = (dispatch) => {
    return ({
        switchPage: (page) => {
            dispatch(switchPage(page));
        },
        updateAuth: (data) => {
            dispatch(updateAuth(data));
        }
    });
}
const LandingRedux = connect(landingMapStateToProps, landingMapDispatchToProps)(Landing);
const LoginRedux = connect(landingMapStateToProps, landingMapDispatchToProps)(Login);

class App extends React.Component {
    render() {
        switch (this.props.page) {
            case 1:
                return (
                    <LandingRedux />
                );
            case 2:
                return (
                    <LoginRedux />
                );
            case 3:
                return (
                    <Dashboard />
                );
            default:
                return (
                    <LandingRedux />
                );
        }
    }
}

export default App;