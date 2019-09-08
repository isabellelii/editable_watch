import React, { Component } from "react";
import { drawCanvas } from "./helpers";

class Canvas extends Component {
  state = {
    time: {
      hours: null,
      minutes: null,
      seconds: null
    }
  };

  setTime() {
    const d = new Date();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();

    return this.setState({ time: { hours, minutes, seconds } });
  }

  componentWillMount() {
    this.setTime(
      window.setInterval(() => {
        this.setTime();
      }, 1000)
    );
  }

  componentDidMount() {
    this.ctx = this.refs.canvas.getContext("2d");
    drawCanvas(
      this.ctx,
      this.props,
      this.state.time, // { hours, minutes, seconds }
      this.refs.canvas.width
    );
  }

  componentDidUpdate(prevProps) {
    this.ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    drawCanvas(
      this.ctx,
      this.props,
      this.state.time, // { hours, minutes, seconds }
      this.refs.canvas.width
    );
  }

  render() {
    return <canvas ref="canvas" width={250} height={250} />;
  }
}

export default Canvas;
