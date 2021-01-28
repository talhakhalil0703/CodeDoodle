import React, { Component } from 'react';
import './DrawingPanel.css';

import DrawingIcons from '../components/DrawingIcons';

import Stack from './Stack';
import Heap from './Heap';
import Static from './Static';
import Toggalable from '../components/Toggalable';
import Droppable from '../components/Droppable';

const DroppableStack = Droppable(Stack);
const DroppableHeap = Droppable(Heap);
const DroppableStatic = Droppable(Static);

class DrawingPanel extends Component {

    constructor(props) {
        super(props);

        this.handleStackChange = this.handleStackChange.bind(this);
        this.handleHeapChange = this.handleHeapChange.bind(this);
        this.handleStaticChange = this.handleStaticChange.bind(this);
        this.generateDiagram = this.generateDiagram.bind(this);
    }

    handleStackChange(data) {
        this.props.onStackChange(data);
    }

    handleHeapChange(data) {
        console.log(data);
    }

    handleStaticChange(data) {
        console.log(data);
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
            Value: ${arg.value}
`;
            });
        });

        alert(str);
    }

    render() {
        const { stack, heap, stat, stackOpen, heapOpen, staticOpen } = this.props;
        return (
            <div className='diagram-panel'>

                <div className='diagram-panel-header'>
                    <button className='btn' onClick={this.generateDiagram}>Generate Code</button>
                </div>

                <div className='drawing-panel'>
                    <DrawingIcons />
                    <div className='drawing-area'>

                        <Toggalable toggle={stackOpen}>
                            <DroppableStack
                                value={stack}
                                handleDrop={this.handleStackChange}
                                handleChange={this.handleStackChange}
                            />
                        </Toggalable>

                        <Toggalable toggle={heapOpen}>
                            <DroppableHeap
                                value={heap}
                                handleDrop={this.handleHeapChange}
                            />
                        </Toggalable>

                        <Toggalable toggle={staticOpen}>
                            <DroppableStatic
                                stat={stat}
                                handleDrop={this.handleStaticChange}
                            />
                        </Toggalable>

                    </div>
<<<<<<< HEAD
                </div >

            </div >
=======
                </div>

            </div>
>>>>>>> 17_General_UI
        );
    }
}

export default DrawingPanel;