import React from 'react';
// Import components
import Landing from './components/landing';
import Login from './components/login';

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