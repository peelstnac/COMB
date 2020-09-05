// THIS IS A TEMP FILE FOR TESTING, CHANGE LATER
import React from 'react';
import axios from 'axios';
import io from 'socket.io-client';
// Import CSS
import './dashboard.css';
var method;
if (process.env.NODE_ENV === 'development') {
    method = 'http://';
} else {
    method = 'https://';
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            console: []
        }
    }
    componentDidMount() {
        axios.get(method + 'localhost:4000/auth/socket', { withCredentials: true }).then((res) => {
            var { data } = res;
            console.log(data.connectionCode);
            if (data.secret.length > 0) {
                const socket = io(method + 'localhost:4000');
                // Send the secret over
                socket.emit('secret', data.secret);
                socket.on('console', (data) => {
                    this.setState(({ console }) => ({
                        console: [data, ...console]
                    }));
                    console.log(1);
                });
            }
        });
    }
    render() {
        return(
            <>
                <h1>Dashboard</h1>
                <div className="console">
                    {this.state.console.map((e, i) => {
                        return <div key={i}>{e}</div>;
                    })}
                </div>
            </>
        );        
    }

}

export default Dashboard;