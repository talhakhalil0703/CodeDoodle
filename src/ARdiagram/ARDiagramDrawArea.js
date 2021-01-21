import React, { Component } from 'react';
import './ARDiagramDrawArea.css';

import ARHeapArea from './ARHeapArea';
import ARStackArea from './ARStackArea';
import ARStaticArea from './ARStaticArea';

import DrawingIcons from '../components/DrawingIcons';
import Droppable from '../components/Droppable';
import Toggalable from '../components/Toggalable'

/* 
    ARDiagramDrawArea has the:
     - drawing icons (i.e. int, double etc.)
     - stack section
     - heap section
     - static section (stat)

    Receives props:
     - stack: all info in the stack section
     - heap: all info in the heap section
     - stat: all info in the static section
     - onStackChange: access to CodeDoodles onStackChange function
     - onHeapChange: access to CodeDoodles onHeapChange function (not yet implemented)
     - onStatChange: access to CodeDoodles onStatChange function (not yet implemented)
*/

const DroppableStack = Droppable(ARStackArea);
const DroppableHeap = Droppable(ARHeapArea);
const DroppableStatic = Droppable(ARStaticArea);

class ARDiagramDrawArea extends Component {

  constructor(props) {
    super(props);

    this.handleStackChange = this.handleStackChange.bind(this);
    this.handleHeapChange = this.handleHeapChange.bind(this);
    this.handleStaticChange = this.handleStaticChange.bind(this);
    this.generateDiagram = this.generateDiagram.bind(this);
  }

  /* sends all stack info to parent to be updated */
  handleStackChange(frames) {
    this.props.onStackChange(frames);
  }

  handleHeapChange(heap) {
    console.log(heap);
  }

  handleStaticChange(stat) {
    console.log(stat);
  }

  /* formats stack information for alert, this will very likely be changed entirely */
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
    const { stack, heap, stat, stackOpen, heapOpen, staticOpen, classes, onClassesChange } = this.props;
    return (
      <div id="drawArea" >

        <div className='diagram-panel-header'>
          <button className='btn' onClick={this.generateDiagram}>Generate Code</button>
        </div>

        <div className='drawing-panel'>
          <DrawingIcons 
            classList={classes} 
            onClassListChange={onClassesChange}
            showButton={true}
          />
          <div className='drawing-area'>

            <Toggalable toggle={stackOpen} alt={null}>
              <div className="drawSection" id="stackArea">
                <DroppableStack
                  value={stack}
                  handleDrop={this.handleStackChange}
                  handleChange={this.handleStackChange}
                />
              </div>
            </Toggalable>

            <Toggalable toggle={heapOpen} alt={null}>
              <div className="drawSection" id="heapArea">
                <DroppableHeap
                  heap={heap}
                  handleDrop={this.handleHeapChange}
                />
              </div>
            </Toggalable>

            <Toggalable toggle={staticOpen} alt={null}>
              <div className="drawSection" id="staticArea">
                <DroppableStatic
                  stat={stat}
                  handleDrop={this.handleStaticChange}
                />
              </div>
            </Toggalable>

          </div>
        </div>
      </div>
    );
  }
}

export default ARDiagramDrawArea;