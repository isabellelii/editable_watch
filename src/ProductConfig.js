import React, { useContext, useState } from "react";
import Slider from "rc-slider"; // Slider UI lib
import { colors } from "./helpers.js";
import "rc-slider/assets/index.css"; // Slider CSS
import "./Color.css";
import "./Zoom.css";

import RootContext from "./RootContext";

function ProductConfig(props) {
  // All this component does now is holds the state of the
  // color and zoom values, and wraps all of it's children
  // in a <Provider /> whose value is those states, and
  // their state-setters.

  const { Provider } = RootContext;
  // Using state in a function component.
  const [colorChoice, setColorChoice] = useState(colors[0]);
  // Need another state value? No problem.
  const [zoomChoice, setZoom] = useState(1);

  return (
    <Provider
      value={{
        colorChoice,
        zoomChoice,
        handleColor: value => {
          setColorChoice(value);
        },
        handleZoom: value => {
          setZoom(value);
        }
      }}
    >
      {props.children}
    </Provider>
  );
}

function Color() {
  // Remember how we don't need to import the consumer? This is why:
  // useContext will give return to us the value of the closest
  // upstream Provider.
  // Pretty cool, eh?
  const { colorChoice, handleColor } = useContext(RootContext);

  return (
    <fieldset className="colors-container">
      {colors.slice(0, 4).map(option => (
        <label className="colorOption" key={option.description}>
          <input
            type="radio"
            name="colorChoice"
            onChange={() => handleColor(option)}
            checked={
              colorChoice.description === option.description ? "checked" : ""
            }
          />
          <ul>
            {option.hexVals.map((hexVal, i) => (
              <li key={i} style={{ backgroundColor: hexVal }} />
            ))}
          </ul>
          <span>{option.description}</span>
        </label>
      ))}
    </fieldset>
  );
}

function Zoom() {
  const { colorChoice, zoomChoice, handleZoom } = useContext(RootContext);

  return (
    <div className="zoom">
      <label>
        {zoomChoice > 1.25
          ? "Zoom-out to get the bigger picture."
          : "Zoom-in for a more detailed view."}
      </label>
      <Slider
        value={zoomChoice}
        min={1}
        max={1.5}
        step={0.1}
        onChange={handleZoom}
        trackStyle={{
          backgroundColor: colorChoice && colorChoice.hexVals[1]
        }}
        railStyle={{ backgroundColor: colorChoice && colorChoice.hexVals[2] }}
        handleStyle={{
          backgroundColor: colorChoice && colorChoice.hexVals[0],
          borderColor: colorChoice && colorChoice.hexVals[2]
        }}
      />
    </div>
  );
}

export { ProductConfig, Color, Zoom };
