import React, { Component } from "react";
import "./Arraybar.css";

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

  render() {
    let { width, value, animation } = this.state;
    let animationname = animation === animationType.VISITED ? "visited" : "";
    return (
      <div
        className={`array-bar ${animationname}`}
        style={{
          width: `${width}px`,
          height: `${(((value * window.innerHeight) / 937) * 830) / 500}px`
        }}
      ></div>
    );
  }
}

export default Element;

export const animationType = {
  DEFAULT: 1
};
