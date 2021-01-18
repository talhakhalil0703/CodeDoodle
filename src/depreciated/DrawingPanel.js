import React, { Component } from 'react';
import './DrawingPanel.css';

import DrawingIcons from '../components/DrawingIcons';

import Stack from './Stack';
import Heap from './Heap';
import Static from './Static';

class DrawingPanel extends Component {

    constructor(props) {
        super(props);

        this.handleStackChange = this.handleStackChange.bind(this);
        this.generateDiagram = this.generateDiagram.bind(this);
    }

    handleStackChange(frames) {
        this.props.onStackChange(frames);
    }

    generateDiagram() {
        const { stack } = this.props;
        var str = `Stack:
`;
        stack.forEach(stack => {
            str += `    Name: ${stack.name}
        Local Vars:
`;
            stack.local.forEach(loc => {
                str += `            Type: ${loc.type}
            Name: ${loc.name}
            Value: ${loc.value}
`;
            });

            str += `        Args:
`;

            stack.args.forEach(arg => {
                str += `            Type: ${arg.type}
            Name: ${arg.name}
            Value: ${arg.value}`;
            });
        });

        alert(str);
    }

    render() {
        const { stack, heap, stat } = this.props;
        return (
            <div className='diagram-panel'>

                <div className='diagram-panel-header'>
                    <button className='btn' onClick={this.generateDiagram}>Generate Code</button>
                </div>

                <div className='drawing-panel'>
                    <DrawingIcons />
                    <div className='drawing-area'>
                        <Stack
                            stack={stack}
                            onStackChange={this.handleStackChange}
                        />
                        <Heap
                            heap={heap}
                        />
                        <Static
                            stat={stat}
                        />
                    </div>
                </div>

            </div>
        );
    }
}

export default DrawingPanel;