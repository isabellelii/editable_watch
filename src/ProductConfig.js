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
  static Zoom = Zoom;

  state = {
    zoom: this.props.zoom || 1
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
          this.handleZoom
        )}
      </React.Fragment>
    );
  }
}

export default ProductConfig;
export { Color };
