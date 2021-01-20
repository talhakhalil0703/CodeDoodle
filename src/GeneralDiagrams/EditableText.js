import React from 'react'

export default class EditableText extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.name,
            type: props.type || 'text',
            value: props.value || '',
            editClassName: props.editClassName,
            edit: false
        }

        this.getWidth = this.getWidth.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    edit = () => {
        this.setState(() => ({
            edit: this.state.edit !== false
        }))
    }

    getWidth() {

        var width = this.state.value.length;
        width = width * 8;
        var css = {
            width: width
        }

        return css;
    }

    handleChange(event) {
        var new_value = event.target.value;
        this.props.onChange(new_value);
        this.setState({ value: new_value });
    }

    render() {
        return (
            this.state.edit === true &&
            <input
                style={this.getWidth()}
                maxLength="30"
                name={this.state.name}
                type={this.state.type}
                value={this.state.value}
                className={this.state.editClassName}
                autoFocus
                onFocus={event => {
                    const value = event.target.value
                    event.target.value = ''
                    event.target.value = value
                    this.setState({ backup: this.state.value })
                }}
                onChange={this.handleChange}

                onKeyDown={event => {
                    if (event.key === 'Enter') {
                        this.setState({ edit: false })
                    }
                }}
                onKeyUp={event => {
                    if (event.key === 'Escape') {
                        this.setState({ edit: false, value: this.state.backup })
                    }
                }}
            />
            ||
            <span onClick={event => {
                this.setState({ edit: this.state.edit !== true })
            }}>
                {this.state.value}
            </span>
        )
    }
}