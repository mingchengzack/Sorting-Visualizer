import React, { Component } from "react";
import "./Arraybar.css";

const HEIGHT = window.innerHeight;

class Element extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      width: props.width,
      animation: animationType.DEFAULT
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  setElement = (value, width) => {
    this.setState({ value, width });
  };

  setAnimation = animation => {
    this.setState({ animation });
  };

  render() {
    let { width, value, animation } = this.state;
    let animationname =
      animation === animationType.RED
        ? "red"
        : animation === animationType.BLUE
        ? "blue"
        : animation === animationType.YELLOW
        ? "yellow"
        : animation === animationType.PURPLE
        ? "purple"
        : "";
    return (
      <div
        className={`array-bar ${animationname}`}
        style={{
          width: `${width}px`,
          height: `${(((value * HEIGHT) / 937) * 790) / 250}px`
        }}
      ></div>
    );
  }
}

export default Element;

export const animationType = {
  DEFAULT: 1,
  RED: 2,
  BLUE: 3,
  YELLOW: 4,
  PURPLE: 5
};
