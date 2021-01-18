import React from 'react'

export default class ClassListItem extends React.Component {
    state = {
        className: this.props.name
    }

    render() {
        return (
            <li>
                {this.state.className}
            </li>
        );
    }
}