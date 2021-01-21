import React from 'react';
import './StackFrame.css'
import '../../GeneralDiagrams/HandDrawnBoxes.css'
import ARHalfFrame from './shapeComponents/ARHalfFrame'
import EditableText from '../../GeneralDiagrams/EditableText'

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
export default class StackFrame extends React.Component {

  constructor(props) {
    super(props);

    this.handleLocal = this.handleLocal.bind(this);
    this.handleArgs = this.handleArgs.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLocalVarChange = this.handleLocalVarChange.bind(this);
    this.handleArgsVarChange = this.handleArgsVarChange.bind(this);
    this.local = React.createRef();
    this.args = React.createRef();
  }

  /* adds event listeners for dragover and drop for local and args areas on component mount */
  componentDidMount() {
    const local = this.local.current;
    local.addEventListener('dragover', this.handleDragOver);
    local.addEventListener('drop', this.handleLocal);

    const args = this.args.current;
    args.addEventListener('dragover', this.handleDragOver);
    args.addEventListener('drop', this.handleArgs);
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

  /* handles dropping a new variable into the local variable area */
  handleLocal(e) {
    e.preventDefault();
    e.stopPropagation();

    var text = e.dataTransfer.getData('Text');
    const id = this.props.id;

    if (text === 'stack') {
      alert('stack frames cant be dropped here...')
    } else {

      var loc = this.props.local;
      var name = this.getDefaultName('a', loc.length);

      var new_var = {
        type: text,
        name: name,
        value: '???'
      };

      loc.push(new_var);
      this.props.onLocalChange(id, loc);
    }
  }

  /* handles dropping a new variable into the args variable area */
  handleArgs(e) {
    e.preventDefault();
    e.stopPropagation();

    var text = e.dataTransfer.getData('Text');
    const id = this.props.id;

    if (text === 'stack') {
      alert('stack frames cant be dropped here...')
    } else {

      var arg = this.props.args;
      var name = this.getDefaultName('a', arg.length);

      var new_var = {
        type: text,
        name: name,
        value: '???'
      };

      arg.push(new_var);
      this.props.onArgsChange(id, arg);
    }
  }

  /* handles name change of a stackframe */
  handleNameChange(name) {
    const id = this.props.id;
    this.props.onNameChange(id, name);
  }

  /* handles all changes that can happen to a local variable, value or name */
  handleLocalVarChange(var_id, name, val) {
    const stack_id = this.props.id;
    var loc = this.props.local;

    loc[var_id].name = name;
    loc[var_id].value = val;

    this.props.onLocalChange(stack_id, loc);
  }

  /* handles all changes that can happen to arguments, value or name */
  handleArgsVarChange(var_id, name, val) {
    const stack_id = this.props.id;
    var arg = this.props.args;

    arg[var_id].name = name;
    arg[var_id].value = val;

    this.props.onArgsChange(stack_id, arg);
  }

  render() {
    const { local, args } = this.props;
    return (
      <React.Fragment>
        <EditableText onChange={this.handleNameChange} value={this.props.name} editClassName="stackframeName" />
        <div className="stackBox handDrawnBox3">
          <div className="handDrawnBox3inner">
            <div ref={this.local} className="frame local">
              <ARHalfFrame
                name="Local"
                value={local}
                onChange={this.handleLocalVarChange}
              />
            </div>
            <div ref={this.args} className="frame arguments">
              <ARHalfFrame
                name="Arguments"
                value={args}
                onChange={this.handleArgsVarChange}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}