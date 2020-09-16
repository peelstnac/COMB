import React from 'react';

// Import assets
import right_img from './assets/1.png';

// Import interfaces
import { pageType } from '../actions/switchPage';

type landingPropsType = {
    switchPage: (page: number) => pageType;
}

export const Landing: React.FC<landingPropsType> = (props) => {
    // Switch the page to the login
    const handleClick: () => void = () => {
        props.switchPage(2);
    }
        return (
            <>
                <div className="landing-wrapper">
                    <div className="landing-left">
                        <div className="landing-left-box">
                            <h1 id="landing-title">COMB</h1>
                            <h3 id="landing-subtitle">Packet sniffing made easy.</h3>
                            <button onClick={handleClick} id="landing-login" className="fancy-button bg-gradient1"><span>Join now</span></button>
                        </div>

                    </div>
                    <div className="landing-right">
                        <img id="landing-right-image" src={right_img} alt="Depicting a computer network."></img>
                    </div>
                </div>
            </>
        );
}