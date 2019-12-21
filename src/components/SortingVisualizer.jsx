import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import Navitem from "./Navitem";
import "./Navbar.css";

const algorithms = [
  "Bubble Sort",
  "Insertion Sort",
  "Quick Sort",
  "Merge Sort",
  "Heap Sort",
  "Radix Sort",
  "Bucket Sort"
];

const speeds = ["Fast", "Medium", "Slow"];

class SortingVisualizer extends Component {
  constructor() {
    super();
    this.state = { curAlgorithm: "Bubble Sort", curSpeed: "Fast" };
  }

  handleChangeAlgorithm = algorithm => {
    this.setState({ curAlgorithm: algorithm });
  };

  handleChangeSpeed = speedname => {
    this.setState({ curSpeed: speedname });
  };

  handleRandomGenerate = () => {};

  handleVisualize = () => {
    let speed = 12;
    switch (this.state.curSpeed) {
      case "Fast":
        speed = 12;
        break;
      case "Medium":
        speed = 16;
        break;
      case "Slow":
        speed = 20;
        break;
      default:
        speed = 12;
        break;
    }
  };

  render() {
    return (
      <div>
        <Navbar variant="custom">
          <Navbar.Brand href="#home">Sorting Visualizer</Navbar.Brand>
          <Nav>
            <Navitem
              name={"Visualize"}
              type={"button"}
              onClick={this.handleVisualize}
            />
            <Navitem
              name={"Random Generate"}
              type={"button"}
              onClick={this.handleRandomGenerate}
            />
            <Navitem
              name={"Algorithms"}
              type={"dropdown"}
              itemList={algorithms}
              curItem={this.state.curAlgorithm}
              onChangeItem={this.handleChangeAlgorithm}
            />
            <Navitem
              name={"Speed"}
              type={"dropdown"}
              itemList={speeds}
              curItem={this.state.curSpeed}
              onChangeItem={this.handleChangeSpeed}
            />
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default SortingVisualizer;
