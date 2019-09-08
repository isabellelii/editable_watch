const baseColors = {
  offWhite: "#fbfbfb",
  lightGrey: "#a5a6a9",
  grey: "#dddddd",
  darkGrey: "#0b3536"
};

let variableRadius;

function getArcs(fillStyle) {
  return [
    {
      variableRadius: variableRadius * 0.99, // Keeps the stroke from being cut-out
      fillStyle: baseColors.grey
    },
    {
      variableRadius: variableRadius * 0.98,
      fillStyle: baseColors.lightGrey
    },
    {
      variableRadius: variableRadius * 0.96,
      fillStyle: baseColors.grey
    },
    {
      variableRadius: variableRadius * 0.94,
      fillStyle: baseColors.lightGrey
    },
    {
      variableRadius: variableRadius * 0.92,
      fillStyle
    }
  ];
}

function drawArcs(ctx, arcs) {
  arcs.forEach(arc => {
    ctx.fillStyle = arc.fillStyle;
    ctx.beginPath();
    ctx.arc(0, 0, arc.variableRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  });
}

function getText(fillStyle, strokeStyle) {
  const text = [
    "I",
    "2",
    "I",
    "IV",
    "I",
    "VI",
    "I",
    "VIII",
    "I",
    "10",
    "I",
    "12"
  ].map((numeralString, index) => {
    const rotate = [0, 2, 4, 6, 8, 10].indexOf(index) >= 0 ? false : true; // Only rotate the actual numbers

    return {
      numeralString,
      fillStyle,
      strokeStyle,
      rotate: rotate
    };
  });

  return text;
}

function drawText(ctx, text) {
  text.forEach((textNode, index) => {
    const { numeralString, fillStyle, strokeStyle, rotate } = textNode;
    const ang = ((index + 1) * Math.PI) / 6;

    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;

    ctx.rotate(ang);
    ctx.translate(0, -variableRadius * 0.7);

    rotate === true && ctx.rotate(-ang);
    ctx.fillText(numeralString, 0, 0);
    ctx.strokeText(numeralString, 0, 0);
    rotate === true && ctx.rotate(ang); // rotate back

    ctx.translate(0, variableRadius * 0.7);
    ctx.rotate(-ang);
  });
}

function getLines(fillStyle, strokeStyle) {
  const lines = new Array(60);
  lines.fill({});

  lines.forEach(line => {
    // Create a new array of 60 (lines for minute-indexes)
    line.fillStyle = fillStyle;
    line.strokeStyle = strokeStyle;
  });
  return lines;
}

function drawLines(ctx, lines) {
  lines.forEach((line, index) => {
    const { fillStyle, strokeStyle } = line;

    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;

    const angle = ((index + 1) * 2 * Math.PI) / 60;

    ctx.rotate(angle);
    ctx.translate(0, -variableRadius * 0.9);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, variableRadius * 0.08);
    ctx.stroke();

    ctx.translate(0, variableRadius * 0.9);
    ctx.rotate(-angle);
  });
}

function getRects(time, secondary, tertiary, quaternary) {
  const { hours, minutes, seconds } = time;

  return [
    {
      position:
        (hours * Math.PI) / 6 +
        (minutes * Math.PI) / (6 * 60) +
        (seconds * Math.PI) / (360 * 60),
      thickness: variableRadius * 0.06,
      length: variableRadius * 0.5,
      fillStyle: secondary
    },
    {
      position: (minutes * Math.PI) / 30 + (seconds * Math.PI) / (30 * 60),
      thickness: variableRadius * 0.05,
      length: variableRadius * 0.75,
      fillStyle: tertiary
    },
    {
      position: (seconds * Math.PI) / 30,
      thickness: variableRadius * 0.03,
      length: variableRadius * 0.8,
      fillStyle: quaternary
    }
  ];
}

function drawRects(ctx, rects) {
  rects.forEach((rect, index) => {
    const { position, thickness, length, fillStyle } = rect;

    ctx.fillStyle = fillStyle;
    ctx.rotate(position);
    ctx.beginPath();

    if (index !== 0) {
      // Custom hour hand
      ctx.rect(-thickness / 2, 5, thickness, -length);
    } else {
      drawCustomHand(ctx, rect);
    }

    ctx.fill();
    ctx.stroke();
    ctx.rotate(-position);
  });
}

function drawCustomHand(ctx, rect) {
  const { thickness, length } = rect;
  const snowFlakeStart = 0.65;

  ctx.moveTo(0, 0);
  ctx.lineTo(thickness / 2, 0);
  ctx.lineTo(thickness / 2, -(length * snowFlakeStart));
  ctx.lineTo(thickness / 2 + thickness, -(length * snowFlakeStart) - thickness);
  ctx.lineTo(thickness / 2, -(length * snowFlakeStart) - thickness * 2);
  ctx.lineTo(thickness / 2, -length);
  ctx.lineTo(-(thickness / 2), -length);
  ctx.lineTo(-(thickness / 2), -(length * snowFlakeStart) - thickness * 2);
  ctx.lineTo(
    -(thickness / 2) - thickness,
    -(length * snowFlakeStart) - thickness
  );
  ctx.lineTo(-(thickness / 2), -(length * snowFlakeStart));
  ctx.lineTo(-(thickness / 2), 0);
  ctx.lineTo(0, 0);
}

function drawCanvas(ctx, props, time, canvasWidth) {
  const { primary, secondary, tertiary, quaternary } = props.colors || {};
  const baseRadius = canvasWidth / 2;

  variableRadius = baseRadius * (props.zoom || 1);

  const zoomOffset = variableRadius - baseRadius;

  ctx.lineWidth = 1;
  ctx.font = `${variableRadius * 0.2}px Arial, Helvetica, sans-serif`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = baseColors.offWhite;
  ctx.strokeStyle = baseColors.darkGrey;

  ctx.translate(variableRadius - zoomOffset, variableRadius - zoomOffset);
  ctx.save(); // saves the basic ctx

  drawArcs(ctx, getArcs(primary));
  drawLines(ctx, getLines(secondary, tertiary));
  drawText(ctx, getText(secondary, tertiary));
  ctx.restore();

  drawRects(ctx, getRects(time, secondary, tertiary, quaternary));

  ctx.translate(-variableRadius + zoomOffset, -variableRadius + zoomOffset);
}

export { drawCanvas };
