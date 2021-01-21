import React, { Component } from 'react';
import './DrawingPanel.css';

class Heap extends Component {

    handleDrop(text, heap) {

        console.log(heap);

        if (text === 'stack') {
            alert('stack frames cant be dropped here...')
        } else {
            alert(text);
        }
    }

    render() {
        return (
            <div className='heap'>
                <h3>Heap</h3>
            </div>
        );
    }
}

export default Heap;