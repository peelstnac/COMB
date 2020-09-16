import React from 'react';
import axios from 'axios';
// Import components
import { NotAuthCard } from './notAuthCard';
import { RegisterStatusCard } from './registerStatusCard';
// Configure HTTP vs HTTPS
var method: string;
if (process.env.NODE_ENV === 'development') {
    method = 'http://';
} else {
    method = 'https://';
}

export class Login extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            formUsername: '',
            formPassword: '',
            notAuthCardState: {
                msg: '',
                err: false
            },
            registerStatusCardState: {
                success: false,
                msg: '',
                err: false
            }
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }
    // Switch page to landing
    handleClick() {
        this.props.switchPage(1);
    }
    // Set local state to input values
    handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            formUsername: event.target.value
        });
    }
    handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            formPassword: event.target.value
        });
    }
    // Handle auth buttons
    // TODO: handle promise rejection
    handleLogin() {
        let username = this.state.formUsername;
        let password = this.state.formPassword;
        this.setState({
            formUsername: '',
            formPassword: ''
        });
        axios.post(method + 'localhost:4000/auth/login', {
            username: username,
            password: password
        }, { withCredentials: true }).then((res) => {
            var { data } = res;
            if (data.isAuth === false) {
                this.setState({
                    // Auth failed
                    notAuthCardState: {
                        msg: data.msg,
                        err: data.err
                    }
                });
            }
            else if (data.isAuth === true) {
                // Auth succeeded
                this.setState({
                    notAuthCardState: {
                        msg: '',
                        err: false
                    }
                });
                // Invoke updateAuth
                this.props.updateAuth({
                    isAuth: true,
                    username: username
                });
                // Switch page to dashboard
                this.props.switchPage(3);
            } else {
                console.log('components/login.js: data.isAuth is neither true nor false.');
            }
        });
    }
    handleRegister() {
        let username = this.state.formUsername;
        let password = this.state.formPassword;
        this.setState({
            formUsername: '',
            formPassword: ''
        });
        axios.post(method + 'localhost:4000/auth/register', {
            username: username,
            password: password
        }, { withCredentials: true }).then((res) => {
            var { data } = res;
            if (data.success === true) {
                this.setState({
                    registerStatusCardState: {
                        success: true,
                        msg: '',
                        err: false
                    }
                });
            } else {
                if (data.err) {
                    this.setState({
                        registerStatusCardState: {
                            success: false,
                            msg: data.msg,
                            err: data.err
                        }
                    });
                } else {
                    this.setState({
                        registerStatusCardState: {
                            success: false,
                            msg: data.msg,
                            err: data.err
                        }
                    });
                }
            }
        });
    }
    render() {
        return (
            <>
                <div className="container-fluid">
                    <div className="login-wrapper">
                            <div className="card">
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="username">Email address</label>
                                        <input onChange={this.handleUsernameChange} value={this.state.formUsername} type="text" className="form-control" id="username" placeholder="Enter username..." />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input onChange={this.handlePasswordChange} value={this.state.formPassword} type="password" className="form-control" id="password" placeholder="Enter password..." />
                                    </div>
                                    <button onClick={this.handleLogin} className="submit-btn btn btn-primary">Login</button>
                                    <button onClick={this.handleRegister} className="submit-btn btn btn-primary">Register</button>
                                    <button onClick={this.handleClick} className="back-btn btn btn-primary">Go back</button>
                                </div>
                            </div>
                            <NotAuthCard notAuthCardState={this.state.notAuthCardState} />
                            <RegisterStatusCard registerStatusCardState={this.state.registerStatusCardState} />
                    </div>
                </div>
            </>
        );
    }
}
