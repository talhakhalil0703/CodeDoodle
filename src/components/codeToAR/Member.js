import React from "react";
import KeyValuePair from "./KeyValuePair";
import CodePlayer from "./CodePlayer";

class Member extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.member_render = [];
    this.id = this.props.variable.id;
    this.parseInfo();
  }

  componentDidMount() {
    this.parseInfo();
  }

  componentDidUpdate() {
    this.parseInfo();
  }

  parseInfo() {
    let temp = [];

    if (this.props.variable.type == "class") {
      let member_renders = [];
      this.props.variable.value.forEach((ele) => {
        member_renders.push(
          <Member
            variable={ele}
            key={"KeyValuePairMember-" + ele.id}
            addMembers={this.props.addMembers}
            addPointer={this.props.addPointer}
            addReference={this.props.addReference}
          ></Member>
        );
      });
      temp.push(
        <KeyValuePair
          name={this.props.variable.identifier}
          key={"KeyValuePair-" + this.props.variable.id}
          varID={this.props.variable.id}
          addMembers={this.props.addMembers}
          addPointer={this.props.addPointer}
          addReference={this.props.addReference}
          type="class"
        >
          <table>
            <tbody>{member_renders}</tbody>
          </table>
        </KeyValuePair>
      );
    } else if (this.props.variable.type == "primative" || this.props.variable.type_name == "char") {
      temp.push(
        <KeyValuePair
          name={this.props.variable.identifier}
          key={"KeyValuePair-" + this.props.variable.id}
          varID={this.props.variable.id}
          addMembers={this.props.addMembers}
          addPointer={this.props.addPointer}
          addReference={this.props.addReference}
          type="primative"
        >
          {this.props.variable.value}
        </KeyValuePair>
      );
    } else if (this.props.variable.type == "pointer") {
      temp.push(
        <KeyValuePair
          name={this.props.variable.identifier}
          key={"KeyValuePair-" + this.props.variable.id}
          varID={this.props.variable.id}
          addMembers={this.props.addMembers}
          addPointer={this.props.addPointer}
          addReference={this.props.addReference}
          type="pointer"
          target={this.props.variable.value}
        >
          <svg height="10" width="10">
            <circle cx="5" cy="5" r="5" stroke="black" strokeWidth="1" fill="black"></circle>
          </svg>
        </KeyValuePair>
      );
    } else if (this.props.variable.type == "reference") {
      <KeyValuePair
        name={this.props.variable.identifier}
        key={"KeyValuePair-" + this.props.variable.id}
        varID={this.props.variable.id}
        addMembers={this.props.addMembers}
        addPointer={this.props.addPointer}
        addReference={this.props.addReference}
        type="reference"
        target={this.props.variable.value}
      >
        <svg height="15" width="15">
          <circle cx="7.5" cy="7.5" r="5" stroke="black" strokeWidth="1" fill="black"></circle>
        </svg>
      </KeyValuePair>;
    } else {
    }
    this.member_render = temp;
  }
  render() {
    return <React.Fragment>{this.member_render}</React.Fragment>;
  }
}

export default Member;
