import React from 'react';

type RegisterStatusCardPropType = {
    registerStatusCardState: {
        success: boolean,
        msg: string,
        err: boolean | string        
    }
};

const RegisterStatusCard: React.FC<RegisterStatusCardPropType> = (props) => {
    var state = props.registerStatusCardState;
    if (state.success === false && state.msg.length === 0) {
        return (
            <></>
        );
    }
    else if (state.success === true) {
        return (
            <>
                <div className="alert alert-success" role="alert">
                    Successfully registered account. Please log in.
                </div>
            </>
        );
    } else {
        if (state.err) {
            console.log(state.err);
        }
        return (
            <>
                <div className="alert alert-danger" role="alert">
                    Failed to register account. Reason: {state.msg}.
                </div>
            </>
        );
    }
}

export default RegisterStatusCard;