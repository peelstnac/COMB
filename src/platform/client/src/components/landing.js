import React from 'react';
// Import CSS
import './landing.css';
// Import assets
import right_img from './assets/1.png';

// Create landing page with login button
const Landing = () => {
    return(
        <>
        <div class="container-fluid whole-page">
            <div class="row whole-page">
                <div class="col-md-1"></div>
                <div class="col-md-5 my-auto text-center flexbox-container">
                    <h1 class="title">
                        COMB
                    </h1>
                    <h2 id="bottom-text">
                        Packet sniffing made easy.
                    </h2>
                    <button id="login-btn" type="button" class="btn btn-primary btn-lg">Login</button>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-4 my-auto">
                    <img id="right-image" src={right_img} />
                </div>
            </div>
        </div>
        </>
    );
}

export default Landing;