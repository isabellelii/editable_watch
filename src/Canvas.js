import React, { useContext, useEffect, useState } from "react";
import RootContext from "./RootContext";

// Notice that there is no state logic in this component.
// State logic has been de-coupled from the component,
// and extracted to the UseDateInterval custom hook.
export default function Canvas(props) {
  const { colorChoice, zoomChoice } = useContext(RootContext);
  // This custom hook returns the render-prop,
  // appending its props with a date interval.
  const [interval, drawCanvasWithDate] = useDateInterval(props.children);

  let canvasRef = React.createRef();

  // This takes the place of componentDidMount
  // for the purpose of drawing on the canvas
  // once the element exists in the DOM.
  useEffect(() => {
    const canvasCtx = drawCanvasWithDate({
      canvasRef,
      zoomChoice: zoomChoice || props.zoomChoice || 1,
      colorChoice: props.colorChoice || colorChoice
    });

    // This takes the place of componentDidUnmount.
    // I'm using this opportunity to clear the interval,
    // so that we only re-draw the canvas once per second,
    // even if the component is re-rendered due to a
    // change in Context.
    return () => {
      canvasCtx.clearRect(
        0,
        0,
        canvasCtx.canvas.width,
        canvasCtx.canvas.height
      );

      clearInterval(interval);
    };
  });

  return (
    <canvas
      ref={canvas => {
        canvasRef = canvas;
      }}
      width={250}
      height={250}
    />
  );
}

// This is a "custom hook".
// I'm doing it this way because I want to make the
// date interval functionality available to other
// components as well, if they need it.
export function useDateInterval(callback) {
  const [d, setDate] = useState(new Date());

  const interval = window.setInterval(() => {
    const newDate = d.setSeconds(d.getSeconds() + 1);
    setDate(new Date(newDate));
  }, 1000);

  return [interval, (...callbackProps) => callback(...callbackProps, d)];
}
