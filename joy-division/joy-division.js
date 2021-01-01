// Original inspriation based on the work at
// https://generativeartistry.com/tutorials/joy-division/

// Output Dimensions
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

// Randomness Modifiers
const LINE_WIDTH = 2;
const NUM_LINES = 35;
const LINE_POINTS = 45;
const STEP_TIMEOUT = 5;

var context = (function initializeCanvas() {
  var canvas = document.querySelector('#canvas');
  var ctx = canvas.getContext('2d');
  var pixelRatio = window.devicePixelRatio || 1;
  canvas.width = CANVAS_WIDTH * pixelRatio;
  canvas.height = CANVAS_HEIGHT * pixelRatio;
  ctx.scale(pixelRatio, pixelRatio);  
  ctx.lineCap = 'square';
  ctx.lineWidth = LINE_WIDTH;
  return ctx;
}());

var gradient = (function(){

  var grd = context.createLinearGradient(0, 0, 0, 50);
  grd.addColorStop(0, "black");
  grd.addColorStop(1, "#FEE");
  return grd;
})();

const drawLine = function(ctx, line) {
  ctx.beginPath();
  ctx.moveTo(line[0].x, line[0].y);

  let index;
  for (index = 0; index < line.length - 2; index++) {
    let point = line[index];
    let next = line[index+1];
    ctx.quadraticCurveTo(point.x, point.y, (point.x + next.x)/2, (point.y + next.y)/2);
  }
  ctx.quadraticCurveTo(line[line.length - 2].x, line[line.length - 2].y, line[line.length - 1].x, line[line.length - 1].y);
  
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fill();
  ctx.restore();
  
  ctx.stroke(); 
};

const defineLine = function(canvasWidth, canvasHeight, yStepSize, linePoints, notUsed, yIndex) {
  let yOffset = 50 + yStepSize * (yIndex + 1);
  let xStepSize = canvasWidth/linePoints;

  return Array.apply(null, Array(linePoints + 1))
      .map(function(val, xIndex) {
        let yNoise = Math.random() * 200;
        let xOffset = xIndex * xStepSize;
        let half = canvasWidth/2;
        let distanceFromCenter = Math.abs(canvasWidth/2 - xOffset);
        let noiseAmplifier = Math.max(0, Math.abs((half-distanceFromCenter) / canvasWidth/2) - .06);
        return { x: xIndex * xStepSize, y: yOffset - yNoise * noiseAmplifier} ;
      });
};

const drawPicture = function(ctx, canvasWidth, canvasHeight, numLines, linePoints) {
  let yStepSize = (canvasHeight - 100) / numLines;
  let lines = Array.apply(null, Array(numLines))
      .map(defineLine.bind(this, canvasWidth, canvasHeight, yStepSize, linePoints));
  
  lines.forEach(drawLine.bind(this, ctx));
};

drawPicture(context, CANVAS_WIDTH, CANVAS_HEIGHT, NUM_LINES, LINE_POINTS);