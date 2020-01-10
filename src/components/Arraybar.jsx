import React, { Component } from "react";
import "./Arraybar.css";
import {
  bubbleSort,
  insertionSort,
  quickSort,
  mergeSort
} from "../algorithms/sorting";

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Arraybar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: []
    };
  }

  componentDidMount() {
    this.props.onRef(this);
    this.randomGenerateArray();
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  randomGenerateArray() {
    const array = [];

    for (let i = 0; i < this.props.size; i++) {
      array.push(randomIntFromInterval(5, 1000));
    }

    // make the display the same everytime
    array[Math.floor(Math.random() * array.length)] = 1000;

    this.setState({ array });
  }

  visualize(speed) {
    const { array } = this.state;
    switch (this.props.algorithm) {
      case "Bubble Sort":
        bubbleSort(array);
        break;
      case "Insertion Sort":
        insertionSort(array);
        break;
      case "Quick Sort":
        break;
      case "Merge Sort":
        mergeSort(array);
        break;
      case "Heap Sort":
        break;
      case "Radix Sort":
        break;
      case "Bucket Sort":
        break;
      default:
        break;
    }
    console.log(array);
    this.setState({ array });
  }

  render() {
    return (
      <div className="array-container">
        {this.state.array.map((value, idx) => {
          return (
            <div
              className="array-bar"
              key={idx}
              style={{
                height: `${(((value * window.innerHeight) / 937) * 830) /
                  1000}px`
              }}
            ></div>
          );
        })}
      </div>
    );
  }
}

export default Arraybar;
