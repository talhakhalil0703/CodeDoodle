import React, { Component } from 'react';
import './LineNum.css';

/* 
    This component makes up the line numbers and breakpoints.
    Each component manages state about whether or not its breakpoint should be active.

    Recevies props:
     - num: the line number to be displayed
     - onClick: access to CodeEditors onClick function
*/
class LineNum extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isActive: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    /* When any part of a line number is clicked, change the state (basically an on/off switch) */
    handleClick() {
        this.setState(state => ({
            isActive: !state.isActive
        }));

        this.props.onClick(this.props.num);
    }

    render() {
        const { num } = this.props;
        return (
            <div className='a-line'>
                <div className={this.state.isActive ? 'active-breakpoint' : 'breakpoint'} onClick={this.handleClick} />
                <div className='line-num' onClick={this.handleClick}>
                    {num}
                </div>
            </div >
        );
    }
}

export default LineNum;