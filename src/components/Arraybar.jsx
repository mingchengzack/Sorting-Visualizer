import React, { Component } from "react";
import "./Arraybar.css";
import {
  bubbleSort,
  insertionSort,
  quickSort,
  mergeSort
} from "../algorithms/sorting";

function randomIntFromInterval(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
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

    for (let i = 0; i < this.props.arraySize; i++) {
      array.push(randomIntFromInterval(5, 500));
    }
    this.setState({ array });
  }

  visualize(algorithm, speed) {
    const { array } = this.state;
    switch (algorithm) {
      case "Bubble Sort":
        bubbleSort(array);
        break;
      case "Insertion Sort":
        insertionSort(array);
        break;
      case "Quick Sort":
        quickSort(array);
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
    this.setState({ array });
  }

  render() {
    let width = Math.ceil(800 / this.props.arraySize); // width of the array bar depends on the array size

    return (
      <div className="array-container">
        {this.state.array.map((value, idx) => {
          return (
            <div
              className="array-bar"
              key={idx}
              style={{
                width: `${width}px`,
                height: `${(((value * window.innerHeight) / 937) * 830) /
                  500}px`
              }}
            ></div>
          );
        })}

        <div
          className="array-bar"
          key={"extra"}
          style={{
            height: `${(((500 * window.innerHeight) / 937) * 830) / 500}px`
          }}
        ></div>
      </div>
    );
  }
}

export default Arraybar;
