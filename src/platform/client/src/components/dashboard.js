// THIS IS A TEMP FILE FOR TESTING, CHANGE LATER
import React from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
// Import CSS
import './shared.css';
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
        this.handleBack = this.handleBack.bind(this);
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
                    // Parse the data
                    var arr = data.split(/\r?\n/);
                    var res = [];
                    for (let i = arr.length - 1; i >= 0; i--) {
                        let tokens = arr[i].split();
                        if (tokens.length === 1) {
                            switch(tokens[0]) {
                                case 0:
                                    res.push(<div key={uuidv4()} className="ethernet-title">Ethernet Header--------------------------------</div>);
                                    break;
                                case 1:
                                    res.push(<div key={uuidv4()} className="ip-title">IPv4 Header------------------------------------</div>);
                                    break;
                                case 2:
                                    res.push(<div key={uuidv4()} className="tcp-title">TCP Header-------------------------------------</div>);
                                    break;
                                default:
                                    continue;
                            }
                            continue;
                        }
                        switch (tokens[0]) {
                            case "0.1":
                                res.push(<div key={uuidv4}><span className="dest">Destination MAC Address:</span> {tokens[1]}</div>);
                                break;
                            case "0.2":
                                res.push(<div key={uuidv4}><span className="src">Source MAC Address:</span> {tokens[1]}</div>);
                                break;
                            case "0.3":
                                res.push(<div key={uuidv4}><span className="tag">Protocol ID:</span> {tokens[1]}</div>);
                                break;
                            case "1.1":
                                res.push(<div key={uuidv4}><span className="tag">Header length:</span> {tokens[1]}</div>);
                                break;
                            case "1.2":
                                res.push(<div key={uuidv4}><span className="tag">IP Version:</span> {tokens[1]}</div>);
                                break;
                            case "1.3":
                                res.push(<div key={uuidv4}><span className="dest">Destination:</span> {tokens[1]}</div>);
                                break;
                            case "1.4":
                                res.push(<div key={uuidv4}><span className="src">Source:</span> {tokens[1]}</div>);
                                break;
                            case "1.5":
                                res.push(<div key={uuidv4}><span className="tag">Type of Service:</span> {tokens[1]}</div>);
                                break;
                            case "1.6":
                                res.push(<div key={uuidv4}><span className="tag">Total Length:</span> {tokens[1]}</div>);
                                break;
                            case "1.7":
                                res.push(<div key={uuidv4}><span className="tag">Header length:</span> {tokens[1]}</div>);
                                break;
                            case "1.8":
                                res.push(<div key={uuidv4}><span className="tag">Time to Live:</span> {tokens[1]}</div>);
                                break;
                            case "1.9":
                                res.push(<div key={uuidv4}><span className="tag">Protocol:</span> {tokens[1]}</div>);
                                break;
                            case "1.10":
                                res.push(<div key={uuidv4}><span className="tag">Checksum:</span> {tokens[1]}</div>);
                                break;
                            case "2.1":
                                res.push(<div key={uuidv4}><span className="dest">Destination Port:</span> {tokens[1]}</div>);
                                break;
                            case "2.2":
                                res.push(<div key={uuidv4}><span className="src">Source Port:</span> {tokens[1]}</div>);
                                break;
                        }
                    }
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
    handleBack() {
        this.props.switchPage(1);
    }
    render() {
        return (
            <>
                <div className="container-fluid whole-page">
                    <div className="row whole-page">
                        <div className="col-md-6 wrapper">
                            <div className="console card">
                                {this.state.console.map((e, i) => {
                                    return <div key={i}>{e}</div>;
                                })}
                                <div
                                    ref={(el) => { this.messagesEnd = el; }}>
                                </div>
                            </div>
                            <button id="go-back" className="btn btn-primary" onClick={this.handleBack}>Go Back</button>
                            <button id="auto-scroll" className="btn btn-primary" onClick={this.handleAutoScroll}>{this.state.autoScroll}</button>

                        </div>
                        <div className="col-md-6">
                        </div>


                    </div>
                </div>
            </>
        );
    }
}

export default Dashboard;