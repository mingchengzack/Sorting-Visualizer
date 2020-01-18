import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import ValueLabel from "./ValueLabel";

const PrettoSlider = withStyles({
  root: {
    color: "rgb(76, 187, 159)",
    height: 8,
    width: 160,
    marginTop: 2,
    marginRight: 32,
    marginLeft: -35
  },
  active: {},
  disabled: {},
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -6,
    marginLeft: -7,
    "&$disabled": {
      width: 20,
      height: 20,
      backgroundColor: "rgb(252, 4, 4)",
      marginTop: -6,
      marginLeft: -7,
      "&:hover": {
        boxShadow: "none"
      }
    },
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    }
  },
  valueLabel: {
    left: "calc(-50% + 4px)",
    top: "-26px"
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

class MySlider extends Component {
  state = { disabled: false };

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  render() {
    return (
      <PrettoSlider
        valueLabelDisplay="auto"
        defaultValue={75}
        min={8}
        max={150}
        disabled={this.state.disabled}
        // ValueLabelComponent={ValueLabelComponent}
        ValueLabelComponent={ValueLabel}
        onChange={(event, newValue) => this.props.onChange(event, newValue)}
      />
    );
  }
}

export default MySlider;
