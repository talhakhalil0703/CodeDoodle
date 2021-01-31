import React from 'react';
import './ObjectFrame.css'
import '../../GeneralDiagrams/HandDrawnBoxes.css'
import EditableText from '../../GeneralDiagrams/EditableText'
import Variable from '../../components/Variable';
import ARHalfFrame from './shapeComponents/ARHalfFrame'
import Droppable from '../../components/Droppable';

const DroppableHalfFrame = Droppable(ARHalfFrame)

/*  
  ObjectFrame component makes up a ObjectFrame on the application, creates a local and argument half-frame
  Manages no state

  Receives props:
   - id: a unique identifier of this ObjectFrame
   - name: the name of this ObjectFrame
   - local: the local variables of this ObjectFrame
   - args: the arguments of this ObjectFrame
   - onNameChange: access to ARStackAreas onNameChange function
   - onLocalChange: access to ARStackAreas onLocalChange functionv
   - onArgsChange: access to ARStackAreas onArgsChange function
*/
export default class ObjectFrame extends React.Component {
  render() {
    return (
      <React.Fragment>
<<<<<<< HEAD
        <EditableText
          onChange={this.props.onNameChange}
          value={this.props.name}
          editClassName="classCreatorName"
        />

        <div className="objectBox handDrawnBox3">
          <div className="inner3">
            <div ref={this.halfFrame} className="objectInnerDroppableArea">
              <DroppableHalfFrame
                name=""
                value={this.props.value}
                classes={this.props.classes}
                handleDrop={this.props.handleDrop}
                handleChange={this.props.handleChange}
              />
            </div>
          </div>
=======
        <EditableText 
          onChange={this.props.onNameChange} 
          value={this.props.name} 
          editClassName="classCreatorName" 
        />

        <div className="objectBox handDrawnBox3">
            <div className="inner3">
              <div ref={this.halfFrame} className="objectInnerDroppableArea">
                <DroppableHalfFrame
                  name=""
                  value={this.props.value}
                  handleDrop={this.props.handleDrop}
                  handleChange={this.props.handleChange}
                />
              </div>
            </div>
>>>>>>> f13cdb2ac4c8e59720c7d0e1487b305cf0af06f8
        </div>
      </React.Fragment>
    );
  }
}