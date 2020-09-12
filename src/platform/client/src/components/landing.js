import React from 'react';
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
                <div className="landing-wrapper">
                    <div className="landing-left">
                        <div className="landing-left-box">
                            <h1 id="landing-title">COMB</h1>
                            <h3 id="landing-subtitle">Packet sniffing made easy.</h3>
                            <button onClick={this.handleClick} id="landing-login" class="fancy-button bg-gradient1"><span>Join now</span></button>
                        </div>

                    </div>
                    <div className="landing-right">
                        <img id="landing-right-image" src={right_img} alt="Depicting a computer network."></img>
                    </div>
                </div>
            </>
        );
    }
}

export default Landing;