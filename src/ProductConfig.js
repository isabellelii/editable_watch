import React, { Component } from "react";
import Slider from "rc-slider"; // Slider UI lib
import "rc-slider/assets/index.css"; // Slider CSS
import "./Color.css";
import "./Zoom.css";

function Color(props) {
  return (
    <fieldset className="colors-container">
      {props.colorOptions.map(option => (
        <label className="colorOption" key={option.description}>
          <input
            type="radio"
            name="colorChoice"
            value={JSON.stringify(option)}
            onChange={props.handleColor}
            checked={
              props.colorChoice.description === option.description
                ? "checked"
                : ""
            }
          />
          <ul>
            <li style={{ backgroundColor: option.primary }} />
            <li style={{ backgroundColor: option.secondary }} />
            <li style={{ backgroundColor: option.tertiary }} />
            <li style={{ backgroundColor: option.quaternary }} />
          </ul>
          <span>{option.description}</span>
        </label>
      ))}
    </fieldset>
  );
}

function Zoom(props) {
  return (
    <div className="zoom">
      <label>
        {props.zoom > 1.25
          ? "Zoom-out to get the bigger picture."
          : "Zoom-in for a more detailed view."}
      </label>
      <Slider
        value={props.zoom}
        min={1}
        max={1.5}
        step={0.1}
        onChange={props.handleZoom}
        trackStyle={{ backgroundColor: props.colorChoice.secondary }}
        railStyle={{ backgroundColor: props.colorChoice.tertiary }}
        handleStyle={{
          backgroundColor: props.colorChoice.primary,
          borderColor: props.colorChoice.tertiary
        }}
      />
    </div>
  );
}

class ProductConfig extends Component {
  static Color = Color;
  static Zoom = Zoom;

  state = {
    colorChoice: this.props.colorOptions[0],
    zoom: this.props.zoom || 1
  };

  handleColor = e => {
    let change = {};
    change[e.target.name] = JSON.parse(e.target.value);
    this.setState(change);
  };

  handleZoom = value => {
    this.setState({ zoom: value });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.children(
          this.props.colorOptions,
          { ...this.state },
          this.handleColor,
          this.handleZoom
        )}
      </React.Fragment>
    );
  }
}

ProductConfig.defaultProps = {
  colorOptions: [
    {
      description: "Iditarod",
      primary: "#fbfbfb", // white
      secondary: "#f67944", // orange
      tertiary: "#2677bb", // blue
      quaternary: "#c7943e" // copper
    },
    {
      description: "La Ruta",
      primary: "#f4f4f4", // white
      secondary: "#3dbd5d", // green
      tertiary: "#303030", // black
      quaternary: "#f77e5e" // cyan
    },
    {
      description: "Vendée",
      primary: "#37bbe4", // blue
      secondary: "#f1f2f0", // white
      tertiary: "#35342f", // black
      quaternary: "#e1e0dd" // grey
    },
    {
      description: "Dakar",
      primary: "#f45844", // red
      secondary: "#a5a6a9", // grey
      tertiary: "#2f292b", // black
      quaternary: "#dfe0e2" // stone
    }
  ]
};

export default ProductConfig;
