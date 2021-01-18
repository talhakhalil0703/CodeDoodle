import React, { Component } from 'react';

import './ARDiagramDrawArea.css';

import HeapArea from './ARHeapArea';
import StackArea from './ARStackArea';
import StaticArea from './ARStaticArea';

import DrawingIcons from '../components/DrawingIcons';

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
class ARDiagramDrawArea extends Component {

  constructor(props) {
    super(props);

    this.handleStackChange = this.handleStackChange.bind(this);
    this.generateDiagram = this.generateDiagram.bind(this);
  }

  /* sends all stack info to parent to be updated */
  handleStackChange(frames) {
    this.props.onStackChange(frames);
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
    const { stack, heap, stat } = this.props;
    return (
      <div id="drawArea" >

        <div className='diagram-panel-header'>
          <button className='btn' onClick={this.generateDiagram}>Generate Code</button>
        </div>

        <div className='drawing-panel'>
          <DrawingIcons />
          <div className='drawing-area'>
            <div className="drawSection" id="stackArea">
              <StackArea
                stack={stack}
                onStackChange={this.handleStackChange}
              />
            </div>
            <div className="drawSection" id="heapArea">
              <HeapArea
                heap={heap}
              />
            </div>
            <div className="drawSection" id="staticArea">
              <StaticArea
                stat={stat}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ARDiagramDrawArea;