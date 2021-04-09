import React from "react";
import MethodFrame from "./MethodFrame";
import Member from "./Member";
import ARDiagram from "./ARDiagram";
import "./CodePlayer.css";

//Pass down the json information from fetch call to back down as a prop.ARInfo
class CodePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.step = 0;
  }

  async advance() {
    this.step += 1;
    if (this.step >= this.props.ARInfo.length - 1) {
      this.step = this.props.ARInfo.length - 1;
    }
    this.props.setActiveLine(this.props.ARInfo[this.step].line);
    this.forceUpdate();
  }

  async reverse() {
    this.step -= 1;
    if (this.step < 0) {
      this.step = 0;
    }
    this.props.setActiveLine(this.props.ARInfo[this.step].line);
    this.forceUpdate();
  }

  componentDidUpdate() {}

  componentDidMount() {
    this.step = 0;
    this.forceUpdate();
    this.props.setActiveLine(this.props.ARInfo[this.step].line);
  }

  render() {
    return (
      <div key={`CODEPLAYER`} style={{ height: "100%", width: "100%" }}>
        <div style={{ position: "fixed", bottom: 10, right: 10 }}>
          <button
            onClick={() => {
              this.reverse();
            }}
            className="player-btn"
          >
            <i class="arrow left" />
          </button>
          <button
            onClick={() => {
              this.advance();
            }}
            className="player-btn"
          >
            <i class="arrow right" />
          </button>
        </div>
        <ARDiagram key={"ARD" + this.step} step={this.step} ARInfo={this.props.ARInfo}></ARDiagram>
      </div>
    );
  }
}

export default CodePlayer;
