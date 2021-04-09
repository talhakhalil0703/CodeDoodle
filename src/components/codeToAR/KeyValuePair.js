import { BorderStyle } from "@material-ui/icons";
import React from "react";
import CodePlayer from "./CodePlayer";

class KeyValuePair extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: this.props.name };
    this.selector = React.createRef();
  }

  componentDidMount() {
    //this.props.addMembers(this.props.varID, this.selector.current.getBoundingClientRect());
    this.props.addElementRef(this.props.varID, this.selector);
    if (this.props.type === "pointer") {
      this.props.addPointer(this.props.target, this.props.varID);
    } else if (this.props.type === "reference") {
      this.props.addReference(this.props.target, this.props.varID);
    }
  }

  componentDidUpdate() {
    //this.props.addMembers(this.props.varID, this.selector.current.getBoundingClientRect());
    if (this.props.type === "pointer") {
      this.props.addPointer(this.props.target, this.props.varID);
    } else if (this.props.type === "reference") {
      this.props.addReference(this.props.target, this.props.varID);
    }
  }

  render() {
    return (
      <tr>
        <td style={{ zIndex: 10 }}>
          <b>{this.props.name}</b>
        </td>
        <td
          style={{ borderStyle: "solid", padding: 4, borderWidth: 1, textAlign: "center", background: "#B6E3F6" }}
          ref={this.selector}
        >
          {this.props.children}
        </td>
      </tr>
    );
  }
}

export default KeyValuePair;
