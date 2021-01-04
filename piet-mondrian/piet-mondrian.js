// Output Dimensions
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

// Randomness Modifiers
const NUM_DIVISIONS = 10;
const LINE_WIDTH = 4;
const CHANCE_OF_STOP = 0.8;
const CHANCE_OF_TWO_SPLITS = 0.2;

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

function divideAndRender(squares, direction, space, depth) {
  squares.push(space);

  // Render the new space
  ctx.beginPath();
  ctx.rect(space.x, space.y, space.width, space.height);
  ctx.stroke(); 

  let stop = Math.abs(Math.random());
  if (Math.abs(Math.random()) * depth > CHANCE_OF_STOP) {
    return;
  }

  let numDivisions = Math.abs(Math.random()) < CHANCE_OF_TWO_SPLITS ? 3 : 2;

  let LTR = direction === 'LTR';  
  let targetAxis = LTR ? 'x': 'y';
  let targetSpan = LTR ? 'width': 'height';
  let otherAxis = LTR ? 'y': 'x';
  let otherSpan = LTR ? 'height': 'width';
  let newDirection = LTR ? 'TTB': 'LTR';

  let i;
  let divisionSize = (space[targetSpan] - space[targetAxis])/numDivisions;
  for (i = 0; i < numDivisions; i++) {
    let newSpace = {};
    newSpace[targetAxis] = space[targetAxis] + i * divisionSize;
    newSpace[targetSpan] = space[targetAxis] + (i+1) * divisionSize;
    newSpace[otherAxis] = space[otherAxis];
    newSpace[otherSpan] = space[otherSpan];
    divideAndRender(squares, newDirection, newSpace, depth+1);
  }
}

const drawPicture = function() {
  let space = {
    x: 0,
    y: 0, 
    width: CANVAS_WIDTH, 
    height: CANVAS_HEIGHT
  };
  divideAndRender([], "LTR", space, 0)
}

drawPicture();
