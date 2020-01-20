import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import MySlider from "./Slider";
import Navitem from "./Navitem";
import Arraybar from "./Arraybar";
import "./Navbar.css";

const algorithms = [
  "Bubble Sort",
  "Insertion Sort",
  "Selection Sort",
  "Cocktail Shaker Sort",
  "Gnome Sort",
  "Bitonic Sort",
  "Shell Sort",
  "Quick Sort",
  "Merge Sort",
  "Heap Sort",
  "Radix Sort (LSD)",
  "Radix Sort (MSD)",
  "Bucket Sort"
];

const speeds = ["Fast", "Medium", "Slow"];

class SortingVisualizer extends Component {
  constructor() {
    super();
    this.curAlgorithm = "Bubble Sort";
    this.curSpeed = "Fast";
  }

  handleChangeAlgorithm = algorithm => {
    this.curAlgorithm = algorithm;
  };

  handleChangeSpeed = speedname => {
    this.curSpeed = speedname;
  };

  handleRandomGenerate = () => {
    this.arrayBar.randomGenerateArray();
  };

  handleChangeArraySize = (event, newValue) => {
    if (newValue !== this.arrayBar.arraySize && !this.arrayBar.isVisualized) {
      this.arrayBar.arraySize = newValue;
      this.arrayBar.randomGenerateArray();
    }
  };

  handleVisualize = () => {
    let speed = 5;
    switch (this.curSpeed) {
      case "Fast":
        speed = 5;
        break;
      case "Medium":
        speed = 7;
        break;
      case "Slow":
        speed = 9;
        break;
      default:
        speed = 5;
        break;
    }
    if (!this.arrayBar.isVisualized) this.slider.setState({ disabled: true });
    this.arrayBar.visualize(this.curAlgorithm, speed);
  };

  handleFinishVisualization = () => {
    this.slider.setState({ disabled: false });
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
            <MySlider
              onChange={this.handleChangeArraySize}
              onRef={ref => (this.slider = ref)}
            />
            <Navitem
              name={"Algorithms"}
              type={"dropdown"}
              itemList={algorithms}
              curItem={this.curAlgorithm}
              onChangeItem={this.handleChangeAlgorithm}
            />
            <Navitem
              name={"Speed"}
              type={"dropdown"}
              itemList={speeds}
              curItem={this.curSpeed}
              onChangeItem={this.handleChangeSpeed}
            />
          </Nav>
        </Navbar>
        <Arraybar
          finishVisualization={this.handleFinishVisualization}
          onRef={ref => (this.arrayBar = ref)}
        />
      </div>
    );
  }
}

export default SortingVisualizer;
