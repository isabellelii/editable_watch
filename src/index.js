import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import drawCanvas, {
  drawArcs,
  drawText,
  drawLines,
  drawRects
} from "./helpers";
import { ProductConfig, Color, Zoom } from "./ProductConfig";
import Canvas from "./Canvas";
import registerServiceWorker from "./registerServiceWorker";

function Demo() {
  return (
    <ProductConfig>
      <Canvas>
        {/* This render-prop tells the Canvas component what to draw.
            This is a way of de-coupling the different things that we
            want to draw on the canvas. Futher explanation about the
            parameters below can be found in the Canvas component. */}
        {({ canvasRef, zoomChoice, colorChoice }, date) =>
          drawCanvas([drawArcs, drawText, drawLines, drawRects], {
            canvasRef,
            zoomChoice,
            colorChoice,
            date
          })
        }
      </Canvas>
      <div>
        <h2>Endurance.</h2>
        <p>
          The Endurance collection celebrates some of the world's most arduous
          races, and the people who take-up their challenge.
        </p>
        <p>
          A watch from the Endurace collection can be a token of a past
          acomplishment, or your reminder to keep training for your next race.
        </p>
        <Color />
        <Zoom />
      </div>
    </ProductConfig>
  );
}

ReactDOM.render(<Demo />, document.getElementById("demo"));

registerServiceWorker();
