import React from 'react';
import { connect } from 'react-redux';
// Import components
import landing from './components/landing';
import login from './components/login';
// Import actions
import switchPage from './actions/switchPage';

// Redux boilerplate
const landingMapStateToProps = (state) => {
    let { page } = state;
    return({
        page: page
    });
}
const landingMapDispatchToProps = (dispatch) => {
    return({
      switchPage: (page) => {
        dispatch(switchPage(page));
      }
    });
}
const Landing = connect(landingMapStateToProps, landingMapDispatchToProps)(landing);
const Login = connect(landingMapStateToProps, landingMapDispatchToProps)(login);

class App extends React.Component {
    constructor(props) {
        super(props);
    }
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
            default:
                return(
                    <Landing />
                );
        }
    }
}

export default App;