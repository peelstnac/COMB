import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
// Import components
import Landing from './components/landing';
import Login from './components/login';
import Dashboard from './components/dashboard';
// Import CSS
import './main.css';

type DefaultState = {
    page: number
};

const mapState = (state: {page: number}) => {
    return({
        page: state.page
    });
}

const mapDispatch = (dispatch: any) => {
    return ({
  
    });
}

const connector = connect(mapState, mapDispatch);
type AppPropType = ConnectedProps<typeof connector>;

const App: React.FC<AppPropType> = (props) => {
    switch (props.page) {
        case 1:
            return (
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
            return (
                <Landing />
            );
    }
}

export default connector(App);