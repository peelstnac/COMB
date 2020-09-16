import React from 'react';

type NotAuthCardPropType = {
    notAuthCardState: {
        msg: string,
        err: boolean | string
    }
}
export const NotAuthCard: React.FC<NotAuthCardPropType> = (props) => {
    var notAuthCardState = props.notAuthCardState;
    if (notAuthCardState.msg.length === 0) {
        return (
            <></>
        );
    } else {
        return (
            <div className="alert alert-danger" role="alert">
                {notAuthCardState.msg}
            </div>
        );
    }
}