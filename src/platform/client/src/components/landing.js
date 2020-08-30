import React from 'react';
// Import CSS
import './shared.css';
import './landing.css';
// Import assets
import right_img from './assets/1.png';

// Create landing page with login button
const Landing = () => {
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
                        <button id="login-btn" type="button" className="btn btn-primary btn-lg">Login</button>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-4 my-auto">
                        <img id="right-image" src={right_img} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Landing;