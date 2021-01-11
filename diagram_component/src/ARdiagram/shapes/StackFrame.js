import React from 'react';

import './StackFrame.css'
import ARHalfFrame from './shapeComponents/ARHalfFrame'
import EditableText from '../../GeneralDiagrams/EditableText'

export default class StackFrame extends React.Component {
  state = {
    name: this.props.name
  }

  render(){
    return (
        <React.Fragment>
          <EditableText value={this.state.name} editClassName="stackframeName"/>
          <div className="frame local"><ARHalfFrame name="Local" /></div>
          <div className="frame arguments"><ARHalfFrame name="Arguments" /></div>
        </React.Fragment>
    );
  }
}