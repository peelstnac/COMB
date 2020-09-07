import React from 'react';
// Import CSS
import './shared.css';
import './landing.css';
// Import assets
import right_img from './assets/1.png';

// Create landing page with login button
class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    // Switch the page to the login
    handleClick() {
        this.props.switchPage(2);
    }
    render() {
        return (
            <>
                <div className="container-fluid whole-page">
                    <div className="row whole-page">
                        <div className="col-md-1"></div>
                        <div className="col-md-5 my-auto text-center">
                            <h1 className="title">
                                COMB
                        </h1>
                            <h2 id="bottom-text">
                                Packet sniffing made easy.
                        </h2>
                            <button id="login-btn" onClick={this.handleClick} type="button" className="btn btn-primary btn-lg">Login</button>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-4 my-auto">
                            <img id="right-image" alt="Image depicting technology relating to packet sniffing" src={right_img} />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Landing;