import React, { Component } from "react";
import { render } from "react-dom";
import './ARDiagramDrawArea.css'

import HeapArea from './ARHeapArea'
import StackArea from './ARStackArea'
import StaticArea from './ARStaticArea'

import DrawingIcons from '../components/DrawingIcons';

function ARDiagramDrawArea() {

  return (
    <div id="drawArea">
      <div className="drawSection" id="heapArea"><HeapArea /></div>
      <div className="drawSection" id="stackArea"><StackArea /></div>
      <div className="drawSection" id="staticArea"><StaticArea /></div>
    </div>
  );
}

export default ARDiagramDrawArea;