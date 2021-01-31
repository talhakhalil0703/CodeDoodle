import React, { Component } from "react";
<<<<<<< HEAD

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
=======
import { render } from "react-dom";

function ARHeapArea() {
return (
  <React.Fragment>
      <h1>Heap</h1>
  </React.Fragment>
  );
>>>>>>> 3f7fd5cfee57ed86b4f531337f440f7de46cce10
}

export default ARHeapArea;