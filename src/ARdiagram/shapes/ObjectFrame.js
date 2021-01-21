import React from 'react';
import './ObjectFrame.css'
import '../../GeneralDiagrams/HandDrawnBoxes.css'
import EditableText from '../../GeneralDiagrams/EditableText'
import Variable from '../../components/Variable';

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

  constructor(props) {
    super(props);

    this.handleVariableArea = this.handleVariableArea.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleVarChange = this.handleVarChange.bind(this);
    this.halfFrame = React.createRef();

    this.state = {
      value: []
    }
  }

  /* adds event listeners for dragover and drop for local and args areas on component mount */
  componentDidMount() {
    const halfFrame = this.halfFrame.current;
    halfFrame.addEventListener('dragover', this.handleDragOver);
    halfFrame.addEventListener('drop', this.handleHalfFrame);
  }

  /* handles dragover */
  handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  /* generates a new default name on variable creation (i.e. so everything isnt named 'a') */
  getDefaultName(c, length) {
    return String.fromCharCode(c.charCodeAt(0) + length);
  }

  /* handles dropping a new variable into the variable area */
  handleVariableArea(e) {
    e.preventDefault();
    e.stopPropagation();

    var text = e.dataTransfer.getData('Text');
    const id = this.props.id;

    if (text === 'object') {
      alert('objects cant be dropped here...')
    } else {

      var halfFrame= this.props.halfFrame;
      var name = this.getDefaultName('a', halfFrame.length);

      var new_var = {
        type: text,
        name: name,
        value: '???'
      };

      halfFrame.push(new_var);
      this.props.onClassListChange(id, halfFrame);
    }
  }

  /* handles name change of a ObjectFrame */
  handleNameChange(name) {
    const id = this.props.id;
    this.props.onNameChange(id, name);
  }

  /* handles all changes that can happen to a local variable, value or name */
  handleVarChange(var_id, name, val) {
    const stack_id = this.props.id;
    var halfFrame = this.props.halfFrame;

    halfFrame[var_id].name = name;
    halfFrame[var_id].value = val;

    //this.props.onObjectChange(stack_id, loc);
  }

  render() {
    return (
      <React.Fragment>
        <EditableText onChange={this.handleNameChange} value={this.props.name} editClassName="classCreatorName" />
        <div className="objectBox handDrawnBox3">
            <div className="handDrawnBox3Inner">
              <div ref={this.halfFrame} className="objectInnerDroppableArea">
                <ul className='local-variables'>
                    {this.state.value.map((variable, index) => {
                        return (
                            <li key={index}>
                                <Variable
                                    id={index}
                                    type={variable.type}
                                    name={variable.name}
                                    value={variable.value}
                                    onChange={this.handleVarChange}
                                />
                            </li>
                        );
                    })}
                </ul>
              </div>
            </div>
        </div>
      </React.Fragment>
    );
  }
}