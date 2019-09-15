export default function drawCanvas(
  drawThis,
  { canvasRef, zoomChoice, colorChoice, date }
) {
  let ctx = canvasRef.getContext("2d");

  const canvasWidth = canvasRef.width;
  const baseRadius = canvasRef.width / 2;

  // Start drawing from the middle
  ctx.translate(baseRadius, baseRadius);

  drawThis.map(thingToDraw => {
    thingToDraw(ctx, { canvasWidth, zoomChoice, colorChoice }, date);
    ctx.restore();

    return ctx;
  });

  // Go back to 0, 0
  ctx.translate(-baseRadius, -baseRadius);

  return ctx;
}

export function drawArcs(ctx, { canvasWidth, zoomChoice, colorChoice }) {
  getArcs({ canvasWidth, zoomChoice, colorChoice }).map(({ r, fillStyle }) => {
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, 2 * Math.PI);
    ctx.fill();

    ctx.strokeStyle = "#2f292b";
    ctx.stroke();

    return ctx;
  });

  return ctx;
}

export function drawText(ctx, { canvasWidth, zoomChoice, colorChoice }) {
  getText({ canvasWidth, zoomChoice, colorChoice }).map(
    ({
      text,
      translate,
      font,
      textBaseline,
      textAlign,
      fillStyle,
      strokeStyle,
      rotate
    }) => {
      ctx.font = font;
      ctx.textBaseline = textBaseline;
      ctx.textAlign = textAlign;
      ctx.fillStyle = fillStyle;
      ctx.strokeStyle = strokeStyle;

      ctx.rotate(rotate);
      ctx.translate(0, -translate);

      // Rotate some numbers back
      text !== "I" && ctx.rotate(-rotate);

      ctx.fillText(text, 0, 0);
      ctx.strokeText(text, 0, 0);

      // Rotate some numbers back
      text !== "I" && ctx.rotate(rotate);

      ctx.translate(0, translate);
      ctx.rotate(-rotate);

      return ctx;
    }
  );

  return ctx;
}

export function drawLines(ctx, { canvasWidth, zoomChoice, colorChoice }) {
  getLines({ canvasWidth, zoomChoice, colorChoice }).map(
    ({ fillStyle, strokeStyle, rotate, translate, y }) => {
      ctx.strokeWidth = 1;
      ctx.fillStyle = fillStyle;
      ctx.strokeStyle = strokeStyle;

      ctx.rotate(rotate);
      ctx.translate(0, -translate);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, y);
      ctx.stroke();

      ctx.translate(0, translate);
      ctx.rotate(-rotate);

      return ctx;
    }
  );

  return ctx;
}

export function drawRects(ctx, { canvasWidth, zoomChoice, colorChoice }, d) {
  getRects({ canvasWidth, zoomChoice, colorChoice }, d).forEach(
    (rect, index) => {
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
    }
  );
}

function getArcs({ canvasWidth, zoomChoice, colorChoice }) {
  const baseRadius = canvasWidth / 2;
  const zoomAdjustedRadius = baseRadius * zoomChoice;
  const fillStyle = colorChoice.hexVals[0];

  return [
    {
      r: zoomAdjustedRadius * 0.99, // Keeps the stroke from being cut-out
      fillStyle: "#dddddd" // grey
    },
    {
      r: zoomAdjustedRadius * 0.98,
      fillStyle: "#a5a6a9" // lightGrey
    },
    {
      r: zoomAdjustedRadius * 0.96,
      fillStyle: "#dddddd" // grey
    },
    {
      r: zoomAdjustedRadius * 0.94,
      fillStyle: "#a5a6a9" // lightGrey
    },
    {
      r: zoomAdjustedRadius * 0.92,
      fillStyle
    }
  ];
}

function getText({ canvasWidth, zoomChoice, colorChoice }) {
  const baseRadius = canvasWidth / 2;
  const zoomAdjustedRadius = baseRadius * zoomChoice;
  const translate = zoomAdjustedRadius * 0.7;

  const fillStyle = colorChoice.hexVals[1];
  const font = `${zoomAdjustedRadius * 0.2}px Arial, Helvetica, sans-serif`;
  const strokeStyle = colorChoice.hexVals[2];
  const textAlign = "center";
  const textBaseline = "middle";

  return [
    {
      fillStyle,
      font,
      strokeStyle,
      textAlign,
      textBaseline,
      rotate: (1 * Math.PI) / 6,
      text: "I",
      translate
    },
    {
      fillStyle,
      font,
      strokeStyle,
      textAlign,
      textBaseline,
      rotate: (2 * Math.PI) / 6,
      text: "2",
      translate
    },
    {
      fillStyle,
      font,
      strokeStyle,
      textAlign,
      textBaseline,
      rotate: (3 * Math.PI) / 6,
      text: "I",
      translate
    },
    {
      fillStyle,
      font,
      strokeStyle,
      textAlign,
      textBaseline,
      rotate: (4 * Math.PI) / 6,
      text: "IV",
      translate
    },
    {
      fillStyle,
      font,
      strokeStyle,
      textAlign,
      textBaseline,
      rotate: (5 * Math.PI) / 6,
      text: "I",
      translate
    },
    {
      fillStyle,
      font,
      strokeStyle,
      textAlign,
      textBaseline,
      rotate: (6 * Math.PI) / 6,
      text: "VI",
      translate
    },
    {
      fillStyle,
      font,
      strokeStyle,
      textAlign,
      textBaseline,
      rotate: (7 * Math.PI) / 6,
      text: "I",
      translate
    },
    {
      fillStyle,
      font,
      strokeStyle,
      textAlign,
      textBaseline,
      rotate: (8 * Math.PI) / 6,
      text: "VIII",
      translate
    },
    {
      fillStyle,
      font,
      strokeStyle,
      textAlign,
      textBaseline,
      rotate: (9 * Math.PI) / 6,
      text: "I",
      translate
    },
    {
      fillStyle,
      font,
      strokeStyle,
      textAlign,
      textBaseline,
      rotate: (10 * Math.PI) / 6,
      text: "10",
      translate
    },
    {
      fillStyle,
      font,
      strokeStyle,
      textAlign,
      textBaseline,
      rotate: (11 * Math.PI) / 6,
      text: "I",
      translate
    },
    {
      fillStyle,
      font,
      strokeStyle,
      textAlign,
      textBaseline,
      rotate: (12 * Math.PI) / 6,
      text: "12",
      translate
    }
  ];
}

function getLines({ canvasWidth, zoomChoice, colorChoice }) {
  const baseRadius = canvasWidth / 2;
  const zoomAdjustedRadius = baseRadius * zoomChoice;

  const lineCount = 60;

  const fillRange = (start, end) => {
    return Array(end - start + 1)
      .fill()
      .map((line, index) => {
        return {
          fillStyle: colorChoice.hexVals[3],
          height: canvasWidth * 0.1,
          strokeStyle: colorChoice.hexVals[2],
          rotate: ((index + 1) * 2 * Math.PI) / 60,
          translate: zoomAdjustedRadius * 0.9,
          width: canvasWidth * 0.05,
          y: zoomAdjustedRadius * 0.08
        };
      });
  };

  return fillRange(0, lineCount - 1);
}

function getRects({ canvasWidth, zoomChoice, colorChoice }, d) {
  const hours = d.getHours();
  const mins = d.getMinutes();
  const secs = d.getSeconds();

  const baseRadius = canvasWidth / 2;
  const zoomAdjustedRadius = baseRadius * zoomChoice;

  return [
    {
      position:
        (hours * Math.PI) / 6 +
        (mins * Math.PI) / (6 * 60) +
        (secs * Math.PI) / (360 * 60),
      thickness: zoomAdjustedRadius * 0.06,
      length: zoomAdjustedRadius * 0.5,
      fillStyle: colorChoice.hexVals[1]
    },
    {
      position: (mins * Math.PI) / 30 + (secs * Math.PI) / (30 * 60),
      thickness: zoomAdjustedRadius * 0.05,
      length: zoomAdjustedRadius * 0.75,
      fillStyle: colorChoice.hexVals[2]
    },
    {
      position: (secs * Math.PI) / 30,
      thickness: zoomAdjustedRadius * 0.03,
      length: zoomAdjustedRadius * 0.8,
      fillStyle: colorChoice.hexVals[3]
    }
  ];
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

export const colors = [
  {
    description: "Iditarod",
    hexVals: [
      "#fbfbfb", // white
      "#f67944", // orange
      "#2677bb", // blue
      "#c7943e" // copper
    ]
  },
  {
    description: "La Ruta",
    hexVals: [
      "#f4f4f4", // white
      "#3dbd5d", // green
      "#303030", // black
      "#f77e5e" // cyan
    ]
  },
  {
    description: "Vendée",
    hexVals: [
      "#37bbe4", // blue
      "#f1f2f0", // white
      "#35342f", // black
      "#e1e0dd" // grey
    ]
  },
  {
    description: "Dakar",
    hexVals: [
      "#f45844", // red
      "#a5a6a9", // grey
      "#2f292b", // black
      "#dfe0e2" // stone
    ]
  },

  {
    description: "October",
    hexVals: [
      "#666666", // grey
      "#ee8012", // orange
      "#e4e6dd", // stone
      "#000003" // black
    ]
  },
  {
    description: "Poison",
    hexVals: [
      "#303030", // black
      "#f77e5e", // orange
      "#3dbd5d", // green
      "#f4f4f4" // white
    ]
  },
  {
    description: "Summer",
    hexVals: [
      "#e6c700", // yellow
      "#008cbc", // blue
      "#007500", // green
      "#fef9f7" // white
    ]
  },
  {
    description: "Desert",
    hexVals: [
      "#f0c24f", // sand
      "#f3f3eb", // cloud
      "#151515", // black
      "#f0ca75" // tan
    ]
  },
  {
    description: "Pop",
    hexVals: [
      "#0098d8", // blue
      "#e5e7de", // grey
      "#f54123", // red
      "#0b3536" // black
    ]
  },
  {
    description: "80s",
    hexVals: [
      "#de3d83", // pink
      "#00b8b8", // blue
      "#e4bd0b" // yellow
    ]
  }
];
