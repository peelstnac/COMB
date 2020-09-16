import React from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { List, ListRowProps } from 'react-virtualized/dist/commonjs/List';

import { connect, ConnectedProps } from 'react-redux';
import { updateAuth, authType } from '../actions/updateAuth';
import { switchPage } from '../actions/switchPage';
var method: string;
if (process.env.NODE_ENV === 'development') {
    method = 'http://';
} else {
    method = 'https://';
}

// Redux stuff start

interface defaultState {
    page: number,
    auth: authType
}

const mapState = (state: defaultState) => {
    var { page, auth } = state;
    return ({
        page: page,
        auth: auth
    });
}

const mapDispatch = (dispatch: any) => {
    return ({
        switchPage: (page: number) => {
            dispatch(switchPage(page));
        },
        updateAuth: (data: authType) => {
            dispatch(updateAuth(data));
        }
    });
}

const connector = connect(mapState, mapDispatch);
type DashboardPropType = ConnectedProps<typeof connector>;

// Redux stuff end 

type DashboardStateType = {
    connectionCode: string,
    consoleLeft: JSX.Element[],
    consoleRight: JSX.Element[],
    autoScrollLeft: string,
    autoScrollRight: string,
    consoleHeight: number,
    consoleWidth: number
}

class Dashboard extends React.Component<DashboardPropType, DashboardStateType> {
    state: DashboardStateType;
    cnt: number;
    cntLeftValue: number;
    consoleMapper: {
        [key: number]: number
    };
    consoleListLeft: any;
    consoleListRight: any;

    constructor(props: DashboardPropType) {
        super(props);
        this.state = {
            connectionCode: '',
            consoleLeft: [],
            consoleRight: [],
            autoScrollLeft: "Turn off autoscroll",
            autoScrollRight: "Turn off autoscroll",
            consoleHeight: 800, // Default height
            consoleWidth: 500 // Default width
        }
        this.renderConsoleRowLeft = this.renderConsoleRowLeft.bind(this);
        this.renderConsoleRowRight = this.renderConsoleRowRight.bind(this);

        this.handleAutoScrollLeft = this.handleAutoScrollLeft.bind(this);
        this.handleAutoScrollRight = this.handleAutoScrollRight.bind(this);

        this.consoleLeftJump = this.consoleLeftJump.bind(this);

        this.handleBack = this.handleBack.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        this.cnt = 1;
        // TODO fix variable names
        this.cntLeftValue = 0;
        this.getcnt = this.getcnt.bind(this);
        this.cntval = this.cntval.bind(this);
        this.cntLeft = this.cntLeft.bind(this);
        this.cntvalLeft = this.cntvalLeft.bind(this);
        // Don't put this as part of state due to buffered updates
        this.consoleMapper = {

        };
    }

    componentDidMount() {
        // Get dimensions for the consoles
        // TODO add responsiveness
        var consoleLeft: HTMLElement | null = document.getElementById('console-left');
        if (consoleLeft !== null) {
            this.setState({
                // Account for 30px padding
                consoleHeight: consoleLeft.clientHeight - 60,
                consoleWidth: consoleLeft.clientWidth - 60
            });
        }
        // Check permissions
        axios.get(method + 'localhost:4000/auth/socket', { withCredentials: true }).then((res) => {
            var { data } = res;
            if (data.secret.length > 0) {
                this.setState({
                    connectionCode: data.connectionCode.toString()
                });
                const socket = io(method + 'localhost:4000');
                // Send the secret over
                socket.emit('secret', data.secret);
                socket.on('console', (data: string) => {
                    // Parse the data
                    // console.log(data);
                    var arr = data.split(/\r?\n/);
                    var resLeft: JSX.Element[] = [];
                    var resRight: JSX.Element[] = [];

                    for (let i = 0; i < arr.length; i++) {
                        let tokens = arr[i].split(' ');
                        // console.log(tokens);
                        if (tokens.length === 1) {
                            switch (tokens[0]) {
                                case "0":
                                    resLeft.push(<div className="ethernet-title">Ethernet Header | {this.cntval()} </div>);
                                    this.cntLeft();
                                    break;
                                case "1":
                                    resLeft.push(<div className="ip-title">IPv4 Header</div>);
                                    this.cntLeft();
                                    break;
                                case "2":
                                    resLeft.push(<div className="tcp-title">TCP Header</div>);
                                    this.consoleMapper[this.getcnt()] = this.cntLeft();
                                    break;
                                default:

                                    continue;
                            }
                            continue;
                        }
                        switch (tokens[0]) {
                            case "0.1":
                                resLeft.push(<div ><span className="dest">Destination MAC Address:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "0.2":
                                resLeft.push(<div ><span className="src">Source MAC Address:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "0.3":
                                resLeft.push(<div ><span className="tag">Protocol ID:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                // Right console
                                resRight.push(<div className="console-right-head tcp-title">
                                    TCP Protocol | {this.cntval()}
                                </div>);
                                break;
                            case "1.1":
                                resLeft.push(<div ><span className="tag">Header length:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "1.2":
                                resLeft.push(<div ><span className="tag">IP Version:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "1.3":
                                resLeft.push(<div ><span className="dest">Destination:</span> {tokens[1]}</div>);
                                resRight.push(<div ><span className="dest">Destination:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "1.4":
                                resLeft.push(<div ><span className="src">Source:</span> {tokens[1]}</div>);
                                resRight.push(<div ><span className="src">Source:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "1.5":
                                resLeft.push(<div ><span className="tag">Type of Service:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "1.6":
                                resLeft.push(<div ><span className="tag">Total Length:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "1.7":
                                resLeft.push(<div ><span className="tag">Header length:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "1.8":
                                resLeft.push(<div ><span className="tag">Time to Live:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "1.9":
                                resLeft.push(<div ><span className="tag">Protocol:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "1.10":
                                resLeft.push(<div ><span className="tag">Checksum:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "2.1":
                                resLeft.push(<div ><span className="dest">Destination Port:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "2.2":
                                resLeft.push(<div ><span className="src">Source Port:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "2.3":
                                resLeft.push(<div ><span className="tag">seq:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "2.4":
                                resLeft.push(<div ><span className="tag">ack_seq:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "2.5":
                                resLeft.push(<div ><span className="tag">res1:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "2.6":
                                resLeft.push(<div ><span className="tag">res2:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "2.7":
                                resLeft.push(<div ><span className="tag">doff:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "2.8":
                                resLeft.push(<div ><span className="tag">fin:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "2.9":
                                resLeft.push(<div ><span className="tag">syn:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "2.10":
                                resLeft.push(<div ><span className="tag">rst:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "2.11":
                                resLeft.push(<div ><span className="tag">psh:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "2.12":
                                resLeft.push(<div ><span className="tag">ack:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "2.13":
                                resLeft.push(<div ><span className="tag">urg:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "2.14":
                                resLeft.push(<div ><span className="tag">window:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "2.15":
                                resLeft.push(<div ><span className="tag">check:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            case "2.16":
                                resLeft.push(<div ><span className="tag">urg_ptr:</span> {tokens[1]}</div>);
                                this.cntLeft();
                                break;
                            default:
                            // console.log("WHY WAS DEFAULT TRIGGERED?");
                            // console.log(tokens[0]);
                        }
                    }
                    // console.log(res);
                    this.setState((state: DashboardStateType) => {
                        var { consoleLeft, consoleRight } = state;
                        return ({
                            consoleLeft: [...consoleLeft, ...resLeft],
                            consoleRight: [...consoleRight, ...resRight]
                        })
                    });
                });
            }
        });
    }

    componentDidUpdate() {
        if (this.state.autoScrollLeft === "Turn off autoscroll") {
            this.consoleListLeft.scrollToRow(this.state.consoleLeft.length);
        }
        if (this.state.autoScrollRight === "Turn off autoscroll") {
            this.consoleListRight.scrollToRow(this.state.consoleRight.length);
        }
    }

    renderConsoleRowLeft({ index, key, style }: ListRowProps) {
        return (
            <div key={key} style={style} className="" >
                {this.state.consoleLeft[index]}
            </div>
        );
    }

    renderConsoleRowRight({ index, key, style }: ListRowProps) {
        return (
            <div onClick={() => { this.consoleLeftJump(this.consoleMapper[Math.floor(index / 3) + 1]); }} key={key} style={style} className="">
                {this.state.consoleRight[index]}
            </div>
        );
    }

    handleAutoScrollLeft() {
        this.setState((state: DashboardStateType) => {
            var buttonText = "";
            if (this.state.autoScrollLeft === "Turn off autoscroll") {
                buttonText = "Turn on autoscroll";
            } else {
                buttonText = "Turn off autoscroll";
            }
            return {
                autoScrollLeft: buttonText
            };
        });
    }

    handleAutoScrollRight() {
        this.setState((state: DashboardStateType) => {
            var buttonText = "";
            if (this.state.autoScrollRight === "Turn off autoscroll") {
                buttonText = "Turn on autoscroll";
            } else {
                buttonText = "Turn off autoscroll";
            }
            return {
                autoScrollRight: buttonText
            };
        });
    }

    consoleLeftJump(to: number) {
        // Turn off auto scrolling for left
        if (this.state.autoScrollLeft === "Turn off autoscroll") {
            this.handleAutoScrollLeft();
        }
        // Go to index
        this.consoleListLeft.scrollToRow(to);
    }

    handleBack() {
        this.props.switchPage(1);
    }

    handleLogout() {
        let p = axios.get(method + 'localhost:4000/auth/logout', { withCredentials: true });
        Promise.resolve(p).then((res) => {
            this.props.switchPage(1);
        });
    }

    // Console counter to map right to left
    getcnt() {
        return this.cnt++;
    }

    cntval() {
        return this.cnt;
    }

    cntLeft() {
        return this.cntLeftValue++;
    }

    cntvalLeft() {
        return this.cntLeftValue;
    }

    render() {
        return (
            <>
                <div className="dashboard-layout">
                    <div className="dashboard-navbar">
                        <h2 id="dashboard-title">Dashboard</h2>
                        <p>Your connection cide is {this.state.connectionCode}. Click on the protocol labels on the right console to display more information on the left.</p>
                        <button className="nav-btn" id="dashboard-logout" onClick={this.handleLogout}>Logout</button>
                        <button className="nav-btn" id="dashboard-go-back" onClick={this.handleBack}>Go Back</button>
                    </div>

                    <div className="dashboard-console-left">
                        <div id="console-left">
                            <List
                                ref={(el) => { this.consoleListLeft = el }}
                                width={this.state.consoleWidth}
                                height={this.state.consoleHeight}
                                rowHeight={30}
                                rowRenderer={this.renderConsoleRowLeft}
                                rowCount={this.state.consoleLeft.length}
                                overscanRowCount={12}

                            />
                        </div>

                        <button className="dashboard-auto-scroll" onClick={this.handleAutoScrollLeft}>{this.state.autoScrollLeft}</button>
                    </div>
                    <div className="dashboard-console-right">
                        <div id="console-right">
                            <List
                                ref={(el) => { this.consoleListRight = el }}
                                width={this.state.consoleWidth}
                                height={this.state.consoleHeight}
                                rowHeight={30}
                                rowRenderer={this.renderConsoleRowRight}
                                rowCount={this.state.consoleRight.length}
                                overscanRowCount={12}

                            />
                        </div>

                        <button className="dashboard-auto-scroll" onClick={this.handleAutoScrollRight}>{this.state.autoScrollRight}</button>
                    </div>
                </div>
            </>
        );
    }
}

export default connector(Dashboard);