// THIS IS A TEMP FILE FOR TESTING, CHANGE LATER
import React from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import List from 'react-virtualized/dist/commonjs/List';
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
            connectionCode: '',
            console: [],
            autoScroll: "Turn off autoscroll",
            height: 800, // Default height
            width: 500 // Default width
        }
        this.renderRow = this.renderRow.bind(this);
        this.handleAutoScroll = this.handleAutoScroll.bind(this);
        this.handleBack = this.handleBack.bind(this);

        this.cnt = 0;
        this.getcnt = this.getcnt.bind(this);
    }
    getcnt() {
        return this.cnt++;
    }
    componentDidMount() {
        // Get height
        this.setState({
            height: document.getElementById('console').clientHeight,
            width: document.getElementById('console').clientWidth
        });

        console.log(document.getElementById('console').clientWidth);

        axios.get(method + 'localhost:4000/auth/socket', { withCredentials: true }).then((res) => {
            var { data } = res;
            console.log(data.connectionCode);
            if (data.secret.length > 0) {
                this.setState({
                    connectionCode: data.connectionCode.toString()
                });
                const socket = io(method + 'localhost:4000');
                // Send the secret over
                socket.emit('secret', data.secret);
                socket.on('console', (data) => {
                    // Parse the data
                    console.log(data);
                    var arr = data.split(/\r?\n/);
                    var res = [];
                    for (let i = 0; i < arr.length; i++) {
                        let tokens = arr[i].split(' ');
                        console.log(tokens);
                        if (tokens.length === 1) {
                            switch (tokens[0]) {
                                case "0":
                                    res.push(<div  className="ethernet-title">Ethernet Header--------------------------------</div>);
                                    break;
                                case "1":
                                    res.push(<div  className="ip-title">IPv4 Header------------------------------------</div>);
                                    break;
                                case "2":
                                    res.push(<div  className="tcp-title">TCP Header-------------------------------------</div>);
                                    break;
                                default:

                                    continue;
                            }
                            continue;
                        }
                        switch (tokens[0]) {
                            case "0.1":
                                res.push(<div ><span className="dest">Destination MAC Address:</span> {tokens[1]}</div>);
                                break;
                            case "0.2":
                                res.push(<div ><span className="src">Source MAC Address:</span> {tokens[1]}</div>);
                                break;
                            case "0.3":
                                res.push(<div ><span className="tag">Protocol ID:</span> {tokens[1]}</div>);
                                break;
                            case "1.1":
                                res.push(<div ><span className="tag">Header length:</span> {tokens[1]}</div>);
                                break;
                            case "1.2":
                                res.push(<div ><span className="tag">IP Version:</span> {tokens[1]}</div>);
                                break;
                            case "1.3":
                                res.push(<div ><span className="dest">Destination:</span> {tokens[1]}</div>);
                                break;
                            case "1.4":
                                res.push(<div ><span className="src">Source:</span> {tokens[1]}</div>);
                                break;
                            case "1.5":
                                res.push(<div ><span className="tag">Type of Service:</span> {tokens[1]}</div>);
                                break;
                            case "1.6":
                                res.push(<div ><span className="tag">Total Length:</span> {tokens[1]}</div>);
                                break;
                            case "1.7":
                                res.push(<div ><span className="tag">Header length:</span> {tokens[1]}</div>);
                                break;
                            case "1.8":
                                res.push(<div ><span className="tag">Time to Live:</span> {tokens[1]}</div>);
                                break;
                            case "1.9":
                                res.push(<div ><span className="tag">Protocol:</span> {tokens[1]}</div>);
                                break;
                            case "1.10":
                                res.push(<div ><span className="tag">Checksum:</span> {tokens[1]}</div>);
                                break;
                            case "2.1":
                                res.push(<div ><span className="dest">Destination Port:</span> {tokens[1]}</div>);
                                break;
                            case "2.2":
                                res.push(<div ><span className="src">Source Port:</span> {tokens[1]}</div>);
                                break;
                            case "2.3":
                                res.push(<div ><span className="tag">seq:</span> {tokens[1]}</div>);
                                break;
                            case "2.4":
                                res.push(<div ><span className="tag">ack_seq:</span> {tokens[1]}</div>);
                                break;
                            case "2.5":
                                res.push(<div ><span className="tag">res1:</span> {tokens[1]}</div>);
                                break;
                            case "2.6":
                                res.push(<div ><span className="tag">res2:</span> {tokens[1]}</div>);
                                break;
                            case "2.7":
                                res.push(<div ><span className="tag">doff:</span> {tokens[1]}</div>);
                                break;
                            case "2.8":
                                res.push(<div ><span className="tag">fin:</span> {tokens[1]}</div>);
                                break;
                            case "2.9":
                                res.push(<div ><span className="tag">syn:</span> {tokens[1]}</div>);
                                break;
                            case "2.10":
                                res.push(<div ><span className="tag">rst:</span> {tokens[1]}</div>);
                                break;
                            case "2.11":
                                res.push(<div ><span className="tag">psh:</span> {tokens[1]}</div>);
                                break;
                            case "2.12":
                                res.push(<div ><span className="tag">ack:</span> {tokens[1]}</div>);
                                break;
                            case "2.13":
                                res.push(<div ><span className="tag">urg:</span> {tokens[1]}</div>);
                                break;
                            case "2.14":
                                res.push(<div ><span className="tag">window:</span> {tokens[1]}</div>);
                                break;
                            case "2.15":
                                res.push(<div ><span className="tag">check:</span> {tokens[1]}</div>);
                                break;
                            case "2.16":
                                res.push(<div ><span className="tag">urg_ptr {this.getcnt()}:</span> {tokens[1]}</div>);
                                break;
                            default:
                                console.log("WHY WAS DEFAULT TRIGGERED?");
                                console.log(tokens[0]);
                        }
                    }
                    console.log(res);
                    this.setState(({ console }) => ({
                        console: [...console, ...res]
                    }));
                });
            }
        });
    }
    componentDidUpdate() {
        if (this.state.autoScroll === "Turn off autoscroll") {
            this.consoleList.scrollToRow(this.state.console.length);
        }
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

    renderRow({ index, key, style }) {
        return (
            <div key={key} style={style} className="" >
                {this.state.console[index]}
            </div>
        );
    }

    render() {
        return (
            <>
                <div className="container-fluid whole-page">
                    <div className="row whole-page">
                        <div id="subc" className="col-md-6 wrapper">
                            <div id="console" className="console card">
                                <List
                                    ref={(el) => {this.consoleList = el}}
                                    width={this.state.width}
                                    height={this.state.height}
                                    rowHeight={30}
                                    rowRenderer={this.renderRow}
                                    rowCount={this.state.console.length}
                                    overscanRowCount={0}
                                
                                />
                            </div>
                            <button id="go-back" className="btn btn-primary" onClick={this.handleBack}>Go Back</button>
                            <button id="auto-scroll" className="btn btn-primary" onClick={this.handleAutoScroll}>{this.state.autoScroll}</button>
                            <p id="connection-code">Your connection code is {this.state.connectionCode}. This does not need
                            to be private, but it is best to keep it so.</p>
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