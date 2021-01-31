import React, { Component } from 'react';
import './DrawingPanel.css';

class Static extends Component {

    handleDrop(text, stat) {

        console.log(stat);

        if (text === 'stack') {
            alert('stack frames cant be dropped here...');
        } else {
            alert(text);
        }
    }

    render() {
        return (
            <div className='static'>
                <h3>Static</h3>
            </div>
        );
    }
}

export default Static;