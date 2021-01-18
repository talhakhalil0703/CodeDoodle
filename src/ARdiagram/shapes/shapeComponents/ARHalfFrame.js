import React from 'react';

export default class ARHalfFrame extends React.Component {
    state = {
        variables: []
    };

    render() {
        return (
            <React.Fragment>
                <h3>{this.props.name}</h3>
            </React.Fragment>
        );
    }
        
}