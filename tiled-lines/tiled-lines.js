// Original inspriation based on the work at
// https://generativeartistry.com/tutorials/tiled-lines/

// Output Dimensions
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

// Square Attributes
const LINE_WIDTH = 2;
const INCREMENTS = 30;

// Randomness Modifiers.
var translationMultiplier = 10;
var rotationMultiplier = 18;

var ctx = (function initializeCanvas() {
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

const picture = function() {
  const stepSize = CANVAS_HEIGHT/INCREMENTS;
  for(var y = 0; y <= CANVAS_HEIGHT; y += stepSize) {
    for(var x = 0; x <= CANVAS_WIDTH; x += stepSize) {
      drawLine(ctx, x, y, stepSize, stepSize);
    }
  } 
};

picture();