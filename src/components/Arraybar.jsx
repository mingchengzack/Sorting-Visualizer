import React, { Component } from "react";
import Element from "./Element";
import "./Arraybar.css";
import {
  bubbleSort,
  insertionSort,
  quickSort,
  mergeSort,
  heapSort,
  radixSort,
  bucketSort
} from "../algorithms/sorting";

function randomIntFromInterval(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

class Arraybar extends Component {
  constructor(props) {
    super(props);

    // construct initial array
    this.arraySize = Math.floor(window.innerWidth / 10);
    this.width = Math.ceil(800 / this.arraySize); // width of the array bar depends on the array size
    this.array = [];
    this.constructInitArray();
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  constructInitArray() {
    for (let i = 0; i < this.arraySize; i++) {
      this.array.push(randomIntFromInterval(5, 500));
    }
  }

  setArray() {
    for (let i = 0; i < this.array.length; i++) {
      this[`element-${i}`].setElement(this.array[i], this.width);
    }
  }

  randomGenerateArray() {
    this.array = []; // reset array
    this.width = Math.ceil(800 / this.arraySize); // reset width

    for (let i = 0; i < this.arraySize; i++) {
      this.array.push(randomIntFromInterval(5, 500));
    }

    this.setArray();
  }

  visualize(algorithm, speed) {
    switch (algorithm) {
      case "Bubble Sort":
        bubbleSort(this.array);
        break;
      case "Insertion Sort":
        insertionSort(this.array);
        break;
      case "Quick Sort":
        quickSort(this.array);
        break;
      case "Merge Sort":
        mergeSort(this.array);
        break;
      case "Heap Sort":
        heapSort(this.array);
        break;
      case "Radix Sort":
        radixSort(this.array);
        break;
      case "Bucket Sort":
        bucketSort(this.array);
        break;
      default:
        break;
    }
    this.setArray();
  }

  render() {
    return (
      <div className="array-container">
        {this.array.map((value, idx) => {
          return (
            <Element
              key={idx}
              value={value}
              width={this.width}
              onRef={ref => (this[`element-${idx}`] = ref)}
            ></Element>
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
