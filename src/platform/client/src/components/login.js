import React from 'react';
import axios from 'axios';
// Import CSS
import './shared.css';
import './login.css';
// Import components
import NotAuthCard from './notAuthCard';

// Configure HTTP vs HTTPS
var method;
if (process.env.NODE_ENV === 'development') {
    method = 'http://';
} else {
    method = 'https://';
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formUsername: '',
            formPassword: '',
            notAuthCardState: {
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
    handleUsernameChange(event) {
        this.setState({
            formUsername: event.target.value
        });
    }
    handlePasswordChange(event) {
        this.setState({
            formPassword: event.target.value
        });
    }
    // Handle auth buttons
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
        }).then((res) => {
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
                })
            } else {
                console.log('components/login.js: data.isAuth is neither true nor false.');
            }
        });
    }
    handleRegister() {

    }
    render() {
        return (
            <>
                <div className="container-fluid">
                    <div className="row whole-page text-center">
                        <div className="col-md-4"></div>
                        <div className="col-md-4 my-auto">
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
                                    <button className="submit-btn btn btn-primary">Register</button>
                                    <button onClick={this.handleClick} className="back-btn btn btn-primary">Go back</button>
                                </div>
                            </div>
                            <NotAuthCard notAuthCardState={this.state.notAuthCardState}/>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </div>
            </>
        );
    }
}

export default Login;
