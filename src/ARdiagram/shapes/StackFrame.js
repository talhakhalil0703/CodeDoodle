import React, { Component } from 'react';
import './StackFrame.css'
import '../../GeneralDiagrams/HandDrawnBoxes.css'
import ARHalfFrame from './shapeComponents/ARHalfFrame'
import EditableText from '../../GeneralDiagrams/EditableText'
import Droppable from '../../components/Droppable';

/*  
  StackFrame component makes up a stackframe on the application, creates a local and argument half-frame
  Manages no state

  Receives props:
   - id: a unique identifier of this stackframe
   - name: the name of this stackframe
   - local: the local variables of this stackframe
   - args: the arguments of this stackframe
   - onNameChange: access to ARStackAreas onNameChange function
   - onLocalChange: access to ARStackAreas onLocalChange functionv
   - onArgsChange: access to ARStackAreas onArgsChange function
*/

const DroppableHalfFrame = Droppable(ARHalfFrame);

export default class StackFrame extends Component {

  constructor(props) {
    super(props);

    this.handleLocal = this.handleLocal.bind(this);
    this.handleArgs = this.handleArgs.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  /* handles dropping a new variable into the local variable area */
  handleLocal(local) {
    const id = this.props.id;
    this.props.onLocalChange(id, local);
  }

  /* handles dropping a new variable into the args variable area */
  handleArgs(args) {
    const id = this.props.id;
    this.props.onArgsChange(id, args);
  }

  /* handles name change of a stackframe */
  handleNameChange(name) {
    const id = this.props.id;
    this.props.onNameChange(id, name);
  }

  render() {
    const { name, local, args, classes, drawInfoOpen, arrowConnectionPointsOpen } = this.props;
    return (
      <React.Fragment>
        <EditableText
          onChange={this.handleNameChange}
          value={name}
          editClassName="stackframeName"
        />

        <div className="handDrawnBox3">
          <div className="inner3">

            <div ref={this.local} className="frame local">
              <DroppableHalfFrame
                name="Local"
                value={local}
                classes={classes}
                drawInfoOpen={drawInfoOpen}
                arrowConnectionPointsOpen={arrowConnectionPointsOpen}
                toggleArrowConnectionPoints={this.props.toggleArrowConnectionPoints}
                handleDrop={this.handleLocal}
                handleChange={this.handleLocal}
              />
            </div>

            <div ref={this.args} className="frame arguments">
              <DroppableHalfFrame
                name="Arguments"
                value={args}
                classes={classes}
                drawInfoOpen={false}
                arrowConnectionPointsOpen={arrowConnectionPointsOpen}
                toggleArrowConnectionPoints={this.props.toggleArrowConnectionPoints}
                handleDrop={this.handleArgs}
                handleChange={this.handleArgs}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}