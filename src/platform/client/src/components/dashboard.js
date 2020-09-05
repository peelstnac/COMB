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
            console: [],
            autoScroll: "Turn off autoscroll"
        }
        this.handleAutoScroll = this.handleAutoScroll.bind(this);
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
                        console: [...console, data]
                    }));
                    console.log(1);
                });
            }
        });
    }
    componentDidUpdate() {
        if (this.state.autoScroll === "Turn off autoscroll") this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    handleAutoScroll() {
        this.setState((state) => {
            var buttonText = "";
            if (this.state.autoScroll === "Turn off autoscroll") {
                buttonText = "Turn on autoscroll";
            } else {
                buttonText = "Turn off autoscroll";
            }
            return {
                autoScroll: buttonText
            };
        })
    }
    render() {
        return (
            <>
                <h1>Dashboard</h1>
                <div className="console">
                    {this.state.console.map((e, i) => {
                        return <div key={i}>{e}</div>;
                    })}
                    <div
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </div>
                <button onClick={this.handleAutoScroll}>{this.state.autoScroll}</button>
            </>
        );
    }

}

export default Dashboard;