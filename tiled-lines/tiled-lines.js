// Original inspriation based on the work at
// https://generativeartistry.com/tutorials/tiled-lines/

// Output Dimensions
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

// Randomness Modifiers
const LINE_WIDTH = 2;
const INCREMENTS = 30;
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

const drawLine = function(ctx, x, y, deltaX, deltaY) {
  if(Math.random() < 0.5) {
    ctx.moveTo(x, y);
    ctx.lineTo(x + deltaX, y + deltaY);    
  } else {
    ctx.moveTo(x + deltaX, y);
    ctx.lineTo(x, y + deltaY);
  }
  ctx.stroke(); 
};

const drawPicture = function(ctx, canvasWidth, canvasHeight, xProgress, yProgress, stepSize) {  
  setTimeout(drawSpan, STEP_TIMEOUT, ctx, canvasWidth, canvasHeight, xProgress, yProgress, stepSize);
};

const drawSpan = function(ctx, canvasWidth, canvasHeight, xProgress, yProgress, stepSize) {
  drawLine(ctx, xProgress, yProgress, stepSize, stepSize);
  
  if (yProgress >= canvasHeight) {
    return;
  }
  if (xProgress >= canvasWidth) {
    yProgress += stepSize;
    xProgress = 0;
  } else {
    xProgress += stepSize;
  }
  setTimeout(drawSpan, STEP_TIMEOUT, ctx, canvasWidth, canvasHeight, xProgress, yProgress, stepSize);  
};

drawPicture(context, CANVAS_WIDTH, CANVAS_HEIGHT, 0, 0, CANVAS_HEIGHT/INCREMENTS);