import React from "react";
import KeyValuePair from "./KeyValuePair";
import Member from "./Member";

class MethodFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = { locals: [], args: [], identifier: "" };
  }

  parseMethod() {
    let locals = [],
      args = [];
    this.props.stackFrameInfo.vars.forEach((ele) => {
      locals.push(
        <Member
          variable={ele}
          key={"MEMBER-" + ele.id}
          addMembers={this.props.addMembers}
          addPointer={this.props.addPointer}
          addReference={this.props.addReference}
          addElementRef={this.props.addElementRef}
        ></Member>
      );
    });
    this.props.stackFrameInfo.args.forEach((ele) => {
      args.push(
        <Member
          variable={ele}
          key={"MEMBER-" + ele.id}
          addMembers={this.props.addMembers}
          addPointer={this.props.addPointer}
          addReference={this.props.addReference}
          addElementRef={this.props.addElementRef}
        ></Member>
      );
    });
    return (
      <React.Fragment>
        <div>
          <h4 style={{ margin: 0 }}>Locals</h4>
          <table>
            <tbody>{locals}</tbody>
          </table>
        </div>
        <hr></hr>
        <div>
          <h4 style={{ margin: 0 }}>Args</h4>
          <table>
            <tbody>{args}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
    //await this.setState({ locals: locals, args: args, identifier: this.props.stackFrameInfo.identifier });
  }

  componentDidMount() {
    this.parseMethod();
  }

  render() {
    return (
      <div style={{ margin: 30, padding: 10, borderStyle: "solid", background: "#B6E3F6" }}>{this.parseMethod()}</div>
    );
  }
}

export default MethodFrame;
