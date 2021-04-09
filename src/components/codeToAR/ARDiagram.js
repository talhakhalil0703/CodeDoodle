import React from "react";
import MethodFrame from "./MethodFrame";
import Member from "./Member";

const sectionStyle = {
  textAlign: "center",
};

class ARDiagram extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stackRender: [], ARInfo: {}, members: [], heapRender: [] };
    this.stackRender = [];
    this.heapRender = [];
    this.staticRender = [];
    this.pointers = {};
    this.references = {};
    this.members = {};
    this.arrows = [];
    this.elementRefs = {};
    this.selfRef = React.createRef();
    this.lineSeperation = 5;
    this.staticRef = React.createRef();
    this.heapRef = React.createRef();
  }

  getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  addElementRef = (id, ref) => {
    this.elementRefs[id] = ref;
  };

  //Function assumes pointers are already added to member list, need to change and populate entire list then
  //use pointer object to find the corresponding things and draw arrows.
  addMembers = (id, boundingBox) => {
    this.members[id] = boundingBox;
  };

  addPointer = (target, source) => {
    this.pointers[source] = target;
  };

  addReference = (target, source) => {
    this.references[source] = target;
  };

  drawArrows = () => {
    for (const prop in this.pointers) {
      this.createArrow(prop, this.pointers[prop]);
    }
    for (const prop in this.references) {
      this.createCircle(prop, this.references[prop]);
    }
  };

  clamp = (x, low, up) => {
    return Math.max(low, Math.min(up, x));
  };

  getNearestPointInPerimeter(rect, x, y) {
    x = this.clamp(x, rect.left, rect.right);
    y = this.clamp(y, rect.top, rect.bottom);

    let dl = Math.abs(x - rect.left),
      dr = Math.abs(x - rect.right),
      dt = Math.abs(y - rect.top),
      db = Math.abs(y - rect.bottom);

    let m = Math.min(dl, dr, dt, db);

    if (m === dt) return { x: x, y: rect.top };
    else if (m === db) return { x: x, y: rect.bottom };
    else if (m === dl) return { x: rect.left, y: y };
    return { x: rect.right, y: y };
  }

  getLinePathFinding = (start, end) => {
    const x1 = start.x + start.width / 2 + window.pageXOffset,
      y1 = start.y + start.height / 2 + window.pageYOffset;
    let x2 = x1,
      y2 = start.y + start.height + window.pageYOffset;
    //closestEdge = this.getNearestPointInPerimeter(end, x1, y1),
    //lastPointX = closestEdge.x + window.pageXOffset,
    //lastPointY = closestEdge.y + window.pageYOffset;

    let x3 = 0,
      y3 = 0,
      x4 = 0,
      y4 = 0,
      lastPointX = 0,
      lastPointY = 0;
    if (start.x >= end.x) {
      lastPointX = end.right + window.pageXOffset;
    } else {
      lastPointX = end.left + window.pageXOffset;
    }
    lastPointY = end.y + end.height / 5 + window.pageYOffset;
    if (lastPointX - x1 >= 0) {
      x3 =
        this.heapRef.current.getBoundingClientRect().left +
        window.pageXOffset -
        45 +
        this.arrows.length * this.lineSeperation;
    } else {
      x3 =
        this.staticRef.current.getBoundingClientRect().right +
        window.pageXOffset -
        this.arrows.length * this.lineSeperation -
        5;
    }
    y3 = y2;
    x4 = x3;
    y4 = lastPointY;
    return { x1, y1, x2, y2, x3, y3, x4, y4, lastPointX, lastPointY };
  };

  createCircle = (source, target) => {
    const start = this.members[source],
      end = this.members[target];
    if (start !== undefined && end !== undefined) {
      const coords = this.getLinePathFinding(start, end),
        color = this.getRandomColor();
      this.arrows.push(
        <svg
          height={this.selfRef.current.getBoundingClientRect().bottom + window.pageYOffset}
          width="100%"
          style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
        >
          <defs>
            <marker id="circleHead" markerWidth="10" markerHeight="10" refX="3" refY="3" orient="auto">
              <circle
                cx="3"
                cy="3"
                r="2.5"
                stroke="black"
                strokeWidth="1"
                refX="2.5"
                refY="2.5"
                fill="white"
                orient="auto"
              ></circle>
            </marker>
          </defs>
          <line stroke={color} strokeWidth="2" x1={coords.x1} y1={coords.y1} x2={coords.x2} y2={coords.y2}></line>
          <line stroke={color} strokeWidth="2" x1={coords.x2} y1={coords.y2} x2={coords.x3} y2={coords.y3}></line>
          <line stroke={color} strokeWidth="2" x1={coords.x3} y1={coords.y3} x2={coords.x4} y2={coords.y4}></line>
          <line
            stroke={color}
            strokeWidth="2"
            x1={coords.x4}
            y1={coords.y4}
            x2={coords.lastPointX}
            y2={coords.lastPointY}
            markerEnd="url(#circleHead)"
          ></line>
        </svg>
      );
    }
  };
  createArrow = (source, target) => {
    const start = this.members[source],
      end = this.members[target],
      color = this.getRandomColor();

    if (start !== undefined && end !== undefined) {
      // const x1 = start.x + start.width / 2 + window.pageXOffset,
      //   y1 = start.y + start.height / 2 + window.pageYOffset,
      //   closestEdge = this.getNearestPointInPerimeter(end, x1, y1),
      //   x2 = closestEdge.x + window.pageXOffset,
      //   y2 = closestEdge.y + window.pageYOffset;
      const coords = this.getLinePathFinding(start, end);

      this.arrows.push(
        <svg
          height={this.selfRef.current.getBoundingClientRect().bottom + window.pageYOffset}
          width="100%"
          style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
        >
          <defs>
            <marker id="arrowhead" markerWidth="5" markerHeight="5" refX="5" refY="2.5" orient="auto">
              <polygon points="0 0, 5 2.5, 0 5"></polygon>
            </marker>
          </defs>
          <line stroke={color} strokeWidth="2" x1={coords.x1} y1={coords.y1} x2={coords.x2} y2={coords.y2}></line>
          <line stroke={color} strokeWidth="2" x1={coords.x2} y1={coords.y2} x2={coords.x3} y2={coords.y3}></line>
          <line stroke={color} strokeWidth="2" x1={coords.x3} y1={coords.y3} x2={coords.x4} y2={coords.y4}></line>
          <line
            stroke={color}
            strokeWidth="2"
            x1={coords.x4}
            y1={coords.y4}
            x2={coords.lastPointX}
            y2={coords.lastPointY}
            markerEnd="url(#arrowhead)"
          ></line>
        </svg>
      );
    } else if (target == 0) {
      const x1 = start.x + start.width / 2 + window.pageXOffset,
        y1 = start.y + start.height / 2 + window.pageYOffset;
      let x2 = x1,
        y2 = start.y + start.height + window.pageYOffset,
        x3 =
          this.heapRef.current.getBoundingClientRect().left +
          window.pageXOffset -
          45 +
          this.arrows.length * this.lineSeperation,
        y3 = y2;
      this.arrows.push(
        <svg
          height={this.selfRef.current.getBoundingClientRect().bottom + window.pageYOffset}
          width="100%"
          style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
        >
          <marker id="nullhead" markerWidth="5" markerHeight="20" refX="" refY="10" orient="auto">
            <line stroke={"black"} strokeWidth="4" x1={0} y1={0} x2={0} y2={20}></line>
            <line stroke={"black"} strokeWidth="4" x1={5} y1={5} x2={5} y2={15}></line>
          </marker>
          <line stroke={color} strokeWidth="2" x1={x1} y1={y1} x2={x2} y2={y2}></line>
          <line stroke={color} strokeWidth="2" x1={x2} y1={y2} x2={x3} y2={y3} markerEnd="url(#nullhead)"></line>
        </svg>
      );
    }
  };

  updateRender() {
    let stackRender = [],
      heapRender = [],
      staticRender = [];

    if (Array.isArray(this.props.ARInfo)) {
      let tempStack = [];
      this.props.ARInfo[this.props.step].stack.forEach((stackFrame) => {
        tempStack.push(
          <tr>
            <td style={{ textAlign: "right" }}>
              <h2>{stackFrame.identifier}</h2>
            </td>
            <td>
              <MethodFrame
                stackFrameInfo={stackFrame}
                key={"MethodFrame" + stackFrame.identifier}
                addMembers={this.addMembers}
                addPointer={this.addPointer}
                addReference={this.addReference}
                addElementRef={this.addElementRef}
              ></MethodFrame>
            </td>
          </tr>
        );
      });
      stackRender.push(
        <table style={{ margin: 20 }}>
          <tbody>{tempStack}</tbody>
        </table>
      );
      this.props.ARInfo[this.props.step].heap.forEach((heapFrame) => {
        let frame = [];
        let lastid = 0;
        heapFrame.forEach((obj) => {
          lastid = obj.id;
          frame.push(
            <Member
              variable={obj}
              key={"MEMBER-" + Date.now() + " " + obj.id}
              addMembers={this.addMembers}
              addPointer={this.addPointer}
              addReference={this.addReference}
              addElementRef={this.addElementRef}
            ></Member>
          );
        });
        heapRender.push(
          <table
            key={"HEAPTABLE" + Date.now() + " " + lastid}
            style={{ borderStyle: "solid", margin: 5, borderWidth: 1, background: "#B6E3F6", padding: 10 }}
          >
            <tbody>{frame}</tbody>
          </table>
        );
      });
      this.props.ARInfo[this.props.step].static.forEach((staticFrame) => {
        let frame = [];
        let lastid = 0;
        staticFrame.forEach((obj) => {
          lastid = obj.id;
          frame.push(
            <Member
              variable={obj}
              key={"STATICMEMBER-" + Date.now() + " " + obj.id}
              addMembers={this.addMembers}
              addPointer={this.addPointer}
              addReference={this.addReference}
              addElementRef={this.addElementRef}
            ></Member>
          );
        });
        staticRender.push(
          <table
            key={"STATICTABLE-" + Date.now() + " " + lastid}
            style={{ borderStyle: "solid", margin: 5, borderWidth: 1, background: "#B6E3F6", padding: 10 }}
          >
            <tbody>{frame}</tbody>
          </table>
        );
      });
    }
    this.staticRender = staticRender;
    this.stackRender = stackRender;
    this.heapRender = heapRender;

    return (
      <React.Fragment>
        <table style={{ height: "100%", width: "100%" }}>
          <tbody>
            <tr>
              <td style={{ padding: 50, background: "#7E3D3A" }} ref={this.staticRef}>
                <h1 style={sectionStyle}>Static</h1>
                {this.staticRender}
              </td>
              <td style={{ background: "#493843" }}>
                <h1 style={sectionStyle}>Stack</h1>
                {this.stackRender}
              </td>
              <td style={{ padding: 50, background: "#61988E" }} ref={this.heapRef}>
                <h1 style={sectionStyle}>Heap</h1>
                {this.heapRender}
              </td>
            </tr>
          </tbody>
        </table>
        {/* <div style={{ margin: 30, padding: 10 }}>{this.staticRender}</div>
        <div>{this.stackRender}</div>
        <div style={{ margin: 30, padding: 10 }}>{this.heapRender}</div> */}
      </React.Fragment>
    );
  }

  updateArrowLocations = () => {
    this.members = [];
    this.arrows = [];
    for (let prop in this.elementRefs) {
      this.addMembers(prop, this.elementRefs[prop].current.getBoundingClientRect());
    }
    this.drawArrows();
    this.forceUpdate();
  };

  async componentWillUnmount() {
    window.removeEventListener("resize", this.updateArrowLocations);
  }

  async componentDidMount() {
    await this.setState({ ARInfo: this.props.ARInfo });
    for (let prop in this.elementRefs) {
      this.addMembers(prop, this.elementRefs[prop].current.getBoundingClientRect());
    }
    this.drawArrows();
    this.forceUpdate();
    window.addEventListener("resize", this.updateArrowLocations);
  }

  componentDidUpdate() {}

  render() {
    return (
      <div style={{ height: "100%", width: "100%" }} ref={this.selfRef}>
        <div style={{ height: "100%", width: "100%", backgroundColor: "#041b24" }}>{this.updateRender()}</div>
        <div>{this.arrows}</div>
      </div>
    );
  }
}

export default ARDiagram;
