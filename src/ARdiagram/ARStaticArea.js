import React, { Component } from "react";
<<<<<<< HEAD
<<<<<<< HEAD

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
=======
import { render } from "react-dom";
=======
>>>>>>> f13cdb2ac4c8e59720c7d0e1487b305cf0af06f8

class ARStaticArea extends Component {

<<<<<<< HEAD
function ARStaticArea() {
return (
  <React.Fragment>
    <h1>Static</h1>
  </React.Fragment>
  );
>>>>>>> 3f7fd5cfee57ed86b4f531337f440f7de46cce10
=======
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
>>>>>>> f13cdb2ac4c8e59720c7d0e1487b305cf0af06f8
}

export default ARStaticArea;