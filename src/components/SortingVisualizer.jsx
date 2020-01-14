import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import Navitem from "./Navitem";
import Arraybar from "./Arraybar";
import "./Navbar.css";

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} title={value}>
      {children}
    </Tooltip>
  );
}

const PrettoSlider = withStyles({
  root: {
    color: "rgb(76, 187, 159)",
    height: 8,
    width: 160,
    marginTop: 2,
    marginRight: 32,
    marginLeft: -10
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -7,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
    className: "PrivateValueLabel-circle-20"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

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
        speed = 3;
        break;
    }
    this.arrayBar.visualize(this.curAlgorithm, speed);
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
              curItem={this.curAlgorithm}
              onChangeItem={this.handleChangeAlgorithm}
            />
            <Navitem
              name={"Array Size"}
              type={"button"}
              onClick={this.handleRandomGenerate}
            />
            <PrettoSlider
              valueLabelDisplay="auto"
              defaultValue={75}
              min={8}
              max={150}
              ValueLabelComponent={ValueLabelComponent}
              onChange={this.handleChangeArraySize}
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
        <Arraybar onRef={ref => (this.arrayBar = ref)} />
      </div>
    );
  }
}

export default SortingVisualizer;
