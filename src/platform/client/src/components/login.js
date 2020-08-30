import React from 'react';
// Import CSS
import './shared.css';
import './login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    // Switch page to landing
    handleClick() {
        this.props.switchPage(1);
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
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="username">Email address</label>
                                            <input type="text" className="form-control" id="username" placeholder="Enter username..." />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className="form-control" id="password" placeholder="Enter password..." />
                                        </div>
                                        <button className="submit-btn btn btn-primary">Login</button>
                                        <button className="submit-btn btn btn-primary">Register</button>
                                    </form> 
                                    <button onClick={this.handleClick} className="back-btn btn btn-primary">Go back</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </div>
            </>
        );
    }
}

export default Login;
