import React from 'react';

class NotAuthCard extends React.Component {
    render() {
        var notAuthCardState = this.props.notAuthCardState;
        if (notAuthCardState.msg.length === 0) {
            return(
                <></>
            );
        } else {
            return(
                <div className="alert alert-danger" role="alert">
                    {notAuthCardState.msg}
                </div>
            );
        }
    }
}

export default NotAuthCard;