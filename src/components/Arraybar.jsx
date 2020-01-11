import React, { Component } from "react";
import Element from "./Element";
import { animationType } from "./Element";
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

const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;

function randomIntFromInterval(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

class Arraybar extends Component {
  constructor(props) {
    super(props);

    this.state = { generate: 0 };

    // construct initial array
    this.arraySize = Math.floor(WIDTH / 12);
    this.width = Math.ceil(800 / this.arraySize) + 1; // width of the array bar depends on the array size
    this.array = [];
    this.isVisualized = false;
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
    // if (this.isVisualized) return;
    this.arraySize = Math.floor(WIDTH / 10); // reset array size
    this.width = Math.ceil(800 / this.arraySize); // reset width
    this.array = []; // reset array

    for (let i = 0; i < this.arraySize; i++) {
      this.array.push(randomIntFromInterval(5, 500));
    }

    this.setState({ generate: this.state.generate ^ 1 }, this.setArray);
  }

  visualize(algorithm, speed) {
    // if (this.isVisualized) return;
    this.isVisualized = true;

    let animations = [];
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
        animations = mergeSort(this.array);
        this.mergeSortAnimations(animations, speed);
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

    // finish visualization
    setTimeout(() => {
      this.isVisualized = false;
    }, 10 + (animations.length + 1) * speed);
  }

  mergeSortAnimations(animations, speed) {
    for (let i = 0; i < animations.length; i++) {
      if (i % 4 === 0) {
        const [barOneIdx, barTwoIdx] = animations[i];
        setTimeout(() => {
          this[`element-${barOneIdx}`].setAnimation(animationType.RED);
          this[`element-${barTwoIdx}`].setAnimation(animationType.RED);
        }, i * speed);
      } else if (i % 4 === 1) {
        const [barOneIdx, barTwoIdx] = animations[i];
        setTimeout(() => {
          this[`element-${barOneIdx}`].setAnimation(animationType.BLUE);
          this[`element-${barTwoIdx}`].setAnimation(animationType.BLUE);
        }, i * speed);
      } else if (i % 4 === 2) {
        const [barOneIdx, barTwoIdx] = animations[i];
        setTimeout(() => {
          this[`element-${barOneIdx}`].setAnimation(animationType.DEFAULT);
          this[`element-${barTwoIdx}`].setAnimation(animationType.DEFAULT);
        }, i * speed);
      } else {
        const [barIdx, newValue] = animations[i];
        setTimeout(() => {
          this[`element-${barIdx}`].setElement(newValue, this.width);
        }, i * speed);
      }
    }
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
            height: `${(((500 * HEIGHT) / 937) * 830) / 500}px`
          }}
        ></div>
      </div>
    );
  }
}

export default Arraybar;
