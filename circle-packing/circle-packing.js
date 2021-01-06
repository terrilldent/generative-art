// Original inspriation based on the work at
// https://generativeartistry.com/tutorials/circle-packing/

// Output Dimensions
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

// Randomness Modifiers
const NUM_CIRCLES = 400;
const MIN_RADIUS = 4;
const MAX_RADIUS = 100;
const LINE_WIDTH = 4;
const MAX_ATTEMPTS_AT_CIRCLE = 50;
const CIRCLE_GROWTH_RATE = 1;
const TIMEOUT_MS = 10;

var ctx = (function initializeCanvas() {
  var canvas = document.querySelector('#canvas');
  var ctx = canvas.getContext('2d');
  var pixelRatio = window.devicePixelRatio || 1;
  canvas.width = CANVAS_WIDTH * pixelRatio;
  canvas.height = CANVAS_HEIGHT * pixelRatio;
  ctx.scale(pixelRatio, pixelRatio);  
  ctx.lineCap = 'square';
  ctx.lineWidth = LINE_WIDTH;
  ctx.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = '#FEE';
  ctx.fill();
  return ctx;
}());

function addCircleAndRender(circles) {
  if (circles.length >= NUM_CIRCLES) {
    return;
  }

  let circle = createCircleOutsideOthers(circles);
  if (!circle) {
    return;
  }

  scaleToCollision(circle, circles);

  renderCircle(circle);

  circles.push(circle);

  setTimeout(addCircleAndRender, TIMEOUT_MS, circles);
}

function createCircleOutsideOthers(circles) {
  let attempts = 0;
  let circle;
  while(attempts < MAX_ATTEMPTS_AT_CIRCLE) {  
    circle = {
      x: Math.random() * CANVAS_WIDTH,
      y: Math.random() * CANVAS_HEIGHT,
      radius: MIN_RADIUS
    }
    
    if (!hasCollision(circle, circles)) {
      return circle;
    }
  }
}

function scaleToCollision(circle, circles) {
  while(circle.radius < MAX_RADIUS) {
    if (hasCollision(circle, circles)) {
      return true;
    }
    circle.radius += CIRCLE_GROWTH_RATE;
  }
}

function hasCollision(circle, circles) {
  for(var i = 0; i < circles.length; i++) {
    var otherCircle = circles[i];
    var a = circle.radius + otherCircle.radius;
    var x = circle.x - otherCircle.x;
    var y = circle.y - otherCircle.y;
    if (a >= Math.sqrt((x*x) + (y*y))) {
      return true;
    }
  }  
  if (circle.x + circle.radius >= (CANVAS_WIDTH - 5) ||
      circle.x - circle.radius <= 5 || 
      circle.y + circle.radius >= (CANVAS_HEIGHT - 5) ||
      circle.y - circle.radius <= 5) {
    return true;
  }
  return false;
}

function renderCircle(circle) {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, 2*Math.PI);
  ctx.stroke(); 
}

const drawPicture = function() {
  addCircleAndRender([])
}

drawPicture();
