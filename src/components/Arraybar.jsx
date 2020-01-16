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
    this.arraySize = 75; // default array size
    this.width = Math.ceil((900 / this.arraySize / 1920) * WIDTH); // width of the array bar depends on the array size
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
      this.array.push(randomIntFromInterval(10, 250));
    }
  }

  setArray() {
    for (let i = 0; i < this.array.length; i++) {
      this[`element-${i}`].setElement(this.array[i], this.width);
      this[`element-${i}`].setAnimation(animationType.DEFAULT);
    }
  }

  randomGenerateArray() {
    if (this.isVisualized) return;
    this.width = Math.ceil((900 / this.arraySize / 1920) * WIDTH); // reset width
    this.array = []; // reset array

    for (let i = 0; i < this.arraySize; i++) {
      this.array.push(randomIntFromInterval(10, 250));
    }

    this.setState({ generate: this.state.generate ^ 1 }, this.setArray);
  }

  resetAnimations() {
    for (let i = 0; i < this.arraySize; i++) {
      this[`element-${i}`].setAnimation(animationType.DEFAULT);
    }
  }

  visualize(algorithm, speed) {
    if (this.isVisualized) return;
    this.isVisualized = true;
    this.resetAnimations();

    // ajust speed with array size
    if (this.arraySize <= 30)
      speed = Math.floor(30 / this.arraySize) * 20 + speed;
    else speed = Math.floor((74 / this.arraySize) * 2.5) + speed;
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
        animations = quickSort(this.array);
        this.quickSortAnimations(animations, speed);
        break;
      case "Merge Sort":
        animations = mergeSort(this.array);
        this.mergeSortAnimations(animations, speed);
        break;
      case "Heap Sort":
        animations = heapSort(this.array);
        this.heapSortAnimations(animations, speed);
        break;
      case "Radix Sort":
        const radix = 4;
        animations = radixSort(this.array, radix);
        this.radixSortAnimations(animations, speed);
        break;
      case "Bucket Sort":
        const bucketSize = Math.floor((this.arraySize * 10) / 150) + 2;
        animations = bucketSort(this.array, bucketSize);
        this.bucketSortAnimations(animations, speed);
        break;
      default:
        break;
    }

    // finish visualization
    setTimeout(() => {
      this.isVisualized = false;
      this.props.finishVisualization();
    }, 310 + animations.length * speed);
  }

  bubbleSortAnimations(animations, speed) {
    for (let i = 0; i < animations.length; i++) {
      if (i % 4 === 3) {
        // swapping
        const [
          barOneIdx,
          barTwoIdx,
          barOneValue,
          barTwoValue,
          isSorted
        ] = animations[i];
        setTimeout(() => {
          this[`element-${barOneIdx}`].setElement(barTwoValue, this.width);
          this[`element-${barTwoIdx}`].setElement(barOneValue, this.width);
          if (isSorted)
            this[`element-${barTwoIdx}`].setAnimation(animationType.PURPLE);
        }, 300 + i * speed);
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
        }, 300 + i * speed);
      }
    }
  }

  insertionSortAnimations(animations, speed) {
    for (let i = 0; i < animations.length; i++) {
      if (i % 4 === 3) {
        // overwriting
        const [barIdx, newValue, isSorted] = animations[i];
        setTimeout(() => {
          this[`element-${barIdx}`].setElement(newValue, this.width);
          if (isSorted)
            this[`element-${barIdx}`].setAnimation(animationType.PURPLE);
        }, 300 + i * speed);
      } else {
        // comparing
        const [barIdx] = animations[i];
        const color =
          i % 4 === 0
            ? animationType.RED
            : i % 4 === 1
            ? animationType.BLUE
            : animationType.DEFAULT;
        setTimeout(() => {
          this[`element-${barIdx}`].setAnimation(color);
        }, 300 + i * speed);
      }
    }
  }

  quickSortAnimations(animations, speed) {
    for (let i = 0; i < animations.length; i++) {
      if (i % 4 === 3) {
        // swapping
        const [
          barOneIdx,
          barTwoIdx,
          barOneValue,
          barTwoValue,
          isPivot
        ] = animations[i];
        setTimeout(() => {
          this[`element-${barOneIdx}`].setElement(barTwoValue, this.width);
          this[`element-${barTwoIdx}`].setElement(barOneValue, this.width);
          if (isPivot === 1) {
            this[`element-${barTwoIdx}`].setAnimation(animationType.PURPLE);
          } else if (isPivot === 2) {
            this[`element-${barOneIdx}`].setAnimation(animationType.YELLOW);
          }
        }, 300 + i * speed);
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
        }, 300 + i * speed);
      }
    }
  }

  mergeSortAnimations(animations, speed) {
    for (let i = 0; i < animations.length; i++) {
      if (i % 4 === 3) {
        // overwriting
        const [barIdx, newValue, isSorted] = animations[i];
        setTimeout(() => {
          this[`element-${barIdx}`].setElement(newValue, this.width);
          if (isSorted) {
            let idx = animations[i][3];
            this[`element-${idx}`].setAnimation(animationType.PURPLE);
          }
        }, 300 + i * speed);
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
        }, 300 + i * speed);
      }
    }
  }

  heapSortAnimations(animations, speed) {
    for (let i = 0; i < animations.length; i++) {
      if (i % 4 === 3) {
        // swapping
        const [
          barOneIdx,
          barTwoIdx,
          barOneValue,
          barTwoValue,
          isSorted
        ] = animations[i];
        setTimeout(() => {
          this[`element-${barOneIdx}`].setElement(barTwoValue, this.width);
          this[`element-${barTwoIdx}`].setElement(barOneValue, this.width);
          if (isSorted)
            this[`element-${barTwoIdx}`].setAnimation(animationType.PURPLE);
        }, 300 + i * speed);
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
        }, 300 + i * speed);
      }
    }
  }

  radixSortAnimations(animations, speed) {
    for (let i = 0; i < animations.length; i++) {
      if (i % 4 === 3) {
        // overwriting
        const [barIdx, newValue, isBucket] = animations[i];
        setTimeout(() => {
          if (isBucket)
            this[`element-${barIdx}`].setAnimation(animationType.YELLOW);
          this[`element-${barIdx}`].setElement(newValue, this.width);
        }, 300 + i * speed);
      } else {
        // comparing
        const [barIdx, bucketColor] = animations[i];
        let color =
          i % 4 === 0
            ? animationType.RED
            : i % 4 === 1
            ? animationType.BLUE
            : animationType.DEFAULT;
        if (bucketColor === 1) color = animationType.DEFAULT;
        else if (bucketColor === 2) color = animationType.PURPLE;
        setTimeout(() => {
          this[`element-${barIdx}`].setAnimation(color);
        }, 300 + i * speed);
      }
    }
  }

  bucketSortAnimations(animations, speed) {
    for (let i = 0; i < animations.length; i++) {
      if (i % 4 === 3) {
        // overwriting
        const [barIdx, newValue, isSorted, isBucket] = animations[i];
        setTimeout(() => {
          if (isBucket)
            this[`element-${barIdx}`].setAnimation(animationType.YELLOW);
          if (isSorted)
            this[`element-${barIdx}`].setAnimation(animationType.PURPLE);
          this[`element-${barIdx}`].setElement(newValue, this.width);
        }, 300 + i * speed);
      } else {
        // comparing
        const [barIdx, bucketColor] = animations[i];
        let color =
          i % 4 === 0
            ? animationType.RED
            : i % 4 === 1
            ? animationType.BLUE
            : animationType.DEFAULT;
        if (bucketColor === 1) color = animationType.DEFAULT;
        else if (bucketColor === 2) color = animationType.PURPLE;
        setTimeout(() => {
          this[`element-${barIdx}`].setAnimation(color);
        }, 300 + i * speed);
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
            height: `${(((250 * HEIGHT) / 937) * 790) / 250}px`
          }}
        ></div>
      </div>
    );
  }
}

export default Arraybar;
