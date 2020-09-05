// THIS IS A TEMP FILE FOR TESTING, CHANGE LATER
import React from 'react';
import axios from 'axios';
import io from 'socket.io-client';
var method;
if (process.env.NODE_ENV === 'development') {
    method = 'http://';
} else {
    method = 'https://';
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        axios.get(method + 'localhost:4000/auth/socket', { withCredentials: true }).then((res) => {
            var { data } = res;
            if (data.secret.length > 0) {
                const socket = io(method + 'localhost:4000');
                // Send the secret over
                socket.emit('secret', data.secret);
            }
        });
    }
    render() {
        return(
            <>
                <h1>Dashboard</h1>
            </>
        );        
    }

}

export default Dashboard;