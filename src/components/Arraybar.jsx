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
    this.width = Math.ceil(900 / this.arraySize); // width of the array bar depends on the array size
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
    if (this.isVisualized) return;
    this.arraySize = Math.floor(WIDTH / 10); // reset array size
    this.width = Math.ceil(800 / this.arraySize); // reset width
    this.array = []; // reset array

    for (let i = 0; i < this.arraySize; i++) {
      this.array.push(randomIntFromInterval(5, 500));
    }

    this.setState({ generate: this.state.generate ^ 1 }, this.setArray);
  }

  visualize(algorithm, speed) {
    if (this.isVisualized) return;
    this.isVisualized = true;

    let animations = [];
    switch (algorithm) {
      case "Bubble Sort":
        animations = bubbleSort(this.array);
        this.bubbleSortAnimations(animations, speed);
        break;
      case "Insertion Sort":
        animations = insertionSort(this.array);
        this.insertionSortAnimations(animations, speed);
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

  bubbleSortAnimations(animations, speed) {
    for (let i = 0; i < animations.length; i++) {
      if (i % 4 === 3) {
        // swapping
        const [barOneIdx, barTwoIdx, barOneValue, barTwoValue] = animations[i];
        setTimeout(() => {
          this[`element-${barOneIdx}`].setElement(barTwoValue, this.width);
          this[`element-${barTwoIdx}`].setElement(barOneValue, this.width);
        }, i * speed);
      } else {
        // comparing
        const [barOneIdx, barTwoIdx] = animations[i];
        const color =
          i % 4 === 0
            ? animationType.RED
            : i % 4 === 1
            ? animationType.BLUE
            : animationType.DEFAULT;
        setTimeout(() => {
          this[`element-${barOneIdx}`].setAnimation(color);
          this[`element-${barTwoIdx}`].setAnimation(color);
        }, i * speed);
      }
    }
  }

  insertionSortAnimations(animations, speed) {
    for (let i = 0; i < animations.length; i++) {
      if (i % 4 === 3) {
        // overwriting
        const [barIdx, newValue] = animations[i];
        setTimeout(() => {
          this[`element-${barIdx}`].setElement(newValue, this.width);
        }, i * speed);
      } else {
        // comparing
        const barIdx = animations[i];
        const color =
          i % 4 === 0
            ? animationType.RED
            : i % 4 === 1
            ? animationType.BLUE
            : animationType.DEFAULT;
        setTimeout(() => {
          this[`element-${barIdx}`].setAnimation(color);
        }, i * speed);
      }
    }
  }

  mergeSortAnimations(animations, speed) {
    for (let i = 0; i < animations.length; i++) {
      if (i % 4 === 3) {
        // overwriting
        const [barIdx, newValue] = animations[i];
        setTimeout(() => {
          this[`element-${barIdx}`].setElement(newValue, this.width);
        }, i * speed);
      } else {
        // comparing
        const [barOneIdx, barTwoIdx] = animations[i];
        const color =
          i % 4 === 0
            ? animationType.RED
            : i % 4 === 1
            ? animationType.BLUE
            : animationType.DEFAULT;
        setTimeout(() => {
          this[`element-${barOneIdx}`].setAnimation(color);
          this[`element-${barTwoIdx}`].setAnimation(color);
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
