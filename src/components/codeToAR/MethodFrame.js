import React from "react";
import KeyValuePair from "./KeyValuePair";
import Member from "./Member";

class MethodFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = { locals: [], args: [], identifier: "" };
  }

  async parseMethod() {
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
        ></Member>
      );
    });
    await this.setState({ locals: locals, args: args, identifier: this.props.stackFrameInfo.identifier });
  }

  componentDidMount() {
    this.parseMethod();
  }

  render() {
    return (
      <div style={{ display: "flex", margin: 30 }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <h2>{this.state.identifier}</h2>
        </div>
        <div style={{ margin: 30, padding: 10, borderStyle: "solid" }}>
          <div>
            <h4 style={{ margin: 0 }}>Locals</h4>
            <table>
              <tbody>{this.state.locals}</tbody>
            </table>
          </div>
          <div>
            <h4 style={{ margin: 0 }}>Args</h4>
            <table>
              <tbody>{this.state.args}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default MethodFrame;
