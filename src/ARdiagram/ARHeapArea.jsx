import React, { Component } from "react";

class ARHeapArea extends Component {

  handleDrop(text, heap) {

    console.log(heap);

    if (text === 'stack') {
      alert('stack frames cant be dropped here...')
    } else {
      alert(text);
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Heap</h1>
      </React.Fragment >
    );
  }
}

export default ARHeapArea;