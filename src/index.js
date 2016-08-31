module.exports = function (canvas, opts) {
  const watermark = createWatermark(opts);
  return applyWatermark(canvas, watermark);
};

function createWatermark(opts) {
  const {
    text,
    fontSize,
    fontFamily,
    fillStyle,
    opacity,
  } = opts;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  setStyle();
  const width = ctx.measureText(text).width;
  const height = fontSize;
  canvas.width = canvas.height = (Math.sqrt(2) / 2) * (width + height);

  ctx.translate(0, Math.sqrt(2) / 2 * height);
  ctx.rotate(45 * Math.PI / 180);

  setStyle();
  ctx.fillText(text, 0, 0);
  return canvas;
  function setStyle() {
    ctx.globalAlpha = opacity;
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = fillStyle;
  }
}

function applyWatermark(canvas, watermark) {
  const ctx = canvas.getContext('2d');
  const {width, height} = canvas;
  const {width: wmW, height: wmH} = watermark;
  let unit = (wmW + wmH) / 2;
  let container = {
    start: {
      x: - unit,
      y: - unit,
    },
    end: {
      x: width + unit,
      y: height + unit,
    },
  };
  let x = container.start.x;
  let y = container.start.y;
  let count = 0;
  while (x <= container.end.x) {
    ctx.drawImage(
      watermark,
      0, 0, wmW, wmH,
      x, y, wmW, wmH
    );
    y += unit / 2;
    if (y > container.end.y) {
      x += unit;
      y = container.start.y
    }
  }
  return canvas;
}
