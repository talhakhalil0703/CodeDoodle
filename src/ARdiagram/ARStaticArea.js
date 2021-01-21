import React, { Component } from "react";

class ARStaticArea extends Component {

  handleDrop(text, stat) {

    console.log(stat);

    if (text === 'stack') {
      alert('stack frames cant be dropped here...')
    } else {
      alert(text);
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Static</h1>
      </React.Fragment >
    );
  }
}

export default ARStaticArea;