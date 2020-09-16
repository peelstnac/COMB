import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { updateAuth, AuthType } from '../actions/updateAuth';
import { switchPage } from '../actions/switchPage';
// Import assets
import right_img from './assets/1.png';

export interface DefaultState {
    page: number,
    auth: AuthType
}

export const mapState = (state: DefaultState) => {
    var { page, auth } = state;
    return ({
        page: page,
        auth: auth
    });
}

export const mapDispatch = (dispatch: any) => {
    return ({
        switchPage: (page: number) => {
            dispatch(switchPage(page));
        },
        updateAuth: (data: AuthType) => {
            dispatch(updateAuth(data));
        }
    });
}

const connector = connect(mapState, mapDispatch);
type LandingPropType = ConnectedProps<typeof connector>;


const Landing: React.FC<LandingPropType> = (props) => {
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

export default connector(Landing);