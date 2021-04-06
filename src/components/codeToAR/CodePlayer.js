import React from "react";
import MethodFrame from "./MethodFrame";
import Member from "./Member";
import { Code } from "@material-ui/icons";

//Pass down the json information from fetch call to back down as a prop.ARInfo
class CodePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stackRender: [], ARInfo: {}, members: [], heapRender: [] };
    this.stackRender = [];
    this.heapRender = [];
    this.staticRender = [];
    this.step = 0;
    this.pointers = {};
    this.references = {};
    this.members = {};
    this.arrows = [];
  }

  addMembers = (id, boundingBox) => {
    this.members[id] = boundingBox;
    if (this.pointers[id] !== undefined) {
      console.log(`${id}, ${this.pointers[id]}`);
      this.createArrow(this.pointers[id], id);
    }
  };

  addPointer = (target, source) => {
    this.pointers[target] = source;
    this.createArrow(source, target);
  };

  addReference = (target, source) => {
    this.references[target] = source;
    this.createArrow(source, target);
  };

  createArrow = (source, target) => {
    const start = this.members[source],
      end = this.members[target];
    if (start !== undefined && end !== undefined) {
      let x1 = start.x + start.width / 2,
        y1 = start.y + start.height / 2,
        x2 = end.x,
        y2 = end.y + end.height / 2;
      this.arrows.push(
        <svg
          height="100%"
          width="100%"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        >
          <line stroke="black" strokeWidth="2" x1={x1} y1={y1} x2={x2} y2={y2}></line>
        </svg>
      );
      this.forceUpdate();
    }
  };
  async advance() {
    this.arrows = [];
    this.pointers = {};
    this.references = {};
    this.members = {};
    this.step += 1;
    if (this.step >= this.state.ARInfo.length - 1) {
      this.step = this.state.ARInfo.length - 1;
    }
    this.updateRender();
    this.forceUpdate();
  }

  async reverse() {
    this.arrows = [];
    this.pointers = {};
    this.references = {};
    this.members = {};
    this.step -= 1;
    if (this.step < 0) {
      this.step = 0;
    }
    this.updateRender();
    this.forceUpdate();
  }

  updateRender() {
    let stackRender = [],
      heapRender = [],
      staticRender = [];

    if (Array.isArray(this.props.ARInfo)) {
      this.props.ARInfo[this.step].stack.forEach((stackFrame) => {
        stackRender.push(
          <MethodFrame
            stackFrameInfo={stackFrame}
            key={"MethodFrame" + stackFrame.identifier}
            addMembers={this.addMembers}
            addPointer={this.addPointer}
            addReference={this.addReference}
          ></MethodFrame>
        );
      });
      this.props.ARInfo[this.step].heap.forEach((heapFrame) => {
        let frame = [];
        let lastid = 0;
        heapFrame.forEach((obj) => {
          lastid = obj.id;
          frame.push(
            <Member
              variable={obj}
              key={"MEMBER-" + Date.now()}
              addMembers={this.addMembers}
              addPointer={this.addPointer}
              addReference={this.addReference}
            ></Member>
          );
        });
        heapRender.push(
          <table key={"HEAPTABLE" + Date.now()}>
            <tbody>{frame}</tbody>
          </table>
        );
      });
      this.props.ARInfo[this.step].static.forEach((staticFrame) => {
        let frame = [];
        let lastid = 0;
        staticFrame.forEach((obj) => {
          lastid = obj.id;
          frame.push(
            <Member
              variable={obj}
              key={"STATICMEMBER-" + Date.now()}
              addMembers={this.addMembers}
              addPointer={this.addPointer}
              addReference={this.addReference}
            ></Member>
          );
        });
        staticRender.push(
          <table key={"STATICTABLE" + Date.now()}>
            <tbody>{frame}</tbody>
          </table>
        );
      });
    }
    this.staticRender = staticRender;
    this.stackRender = stackRender;
    this.heapRender = heapRender;
  }

  componentDidUpdate() {}

  async componentDidMount() {
    this.updateRender();
    console.log(this.props.ARInfo);
    await this.setState({ ARInfo: this.props.ARInfo });
  }

  render() {
    return (
      <div key={`CODEPLAYER-${this.step}`} style={{ height: "100%", width: "100%" }}>
        <div>
          <button
            onClick={() => {
              this.advance();
            }}
          >
            Advance
          </button>
          <button
            onClick={() => {
              this.reverse();
            }}
          >
            Reverse
          </button>
        </div>
        <div style={{ display: "flex", height: "100%", width: "100%", backgroundColor: "#ccc" }}>
          <div style={{ margin: 30, padding: 10 }}>{this.staticRender}</div>
          <div>{this.stackRender}</div>
          <div style={{ margin: 30, padding: 10 }}>{this.heapRender}</div>
        </div>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          {this.arrows}
        </div>
      </div>
    );
  }
}

export default CodePlayer;
