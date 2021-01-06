// Output Dimensions
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

// Randomness Modifiers
const NUM_ARCS = 20;
const LINE_WIDTH = 4;
const TIMEOUT_MS = 40;

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

function addArcAndRender(arcs, direction, space) {
  if (arcs.length >= NUM_ARCS) {
    return;
  }

  let curveDestination;
  let newSpace;
  let referencePoint;
  let newDirection;
  if (direction === 'LTR') {
    curveDestination = {
      x: getRandomSpan(space.x, space.x2),
      y: space.y2
    };
    referencePoint = {
      x: space.x, 
      y: space.y2
    };

    newSpace = {
      x: curveDestination.x,
      y: curveDestination.y,
      x2: space.x2,
      y2: space.y
    }
    newDirection = 'BTT';
  }

  if (direction === 'BTT') {
    curveDestination = {
      x: space.x2,
      y: getRandomSpan(space.y, space.y2)
    };
    referencePoint = {
      x: space.x2, 
      y: space.y
    };

    newSpace = {
      x: curveDestination.x,
      y: curveDestination.y,
      x2: space.x,
      y2: space.y2
    }
    newDirection = 'RTL';
  }

  if (direction === 'RTL') {
    curveDestination = {
      x: getRandomSpan(space.x, space.x2),
      y: space.y2
    };
    referencePoint = {
      x: space.x, 
      y: space.y2
    };

    newSpace = {
      x: curveDestination.x,
      y: curveDestination.y,
      x2: space.x2,
      y2: space.y
    }
    newDirection = 'TTB';
  }

  if (direction === 'TTB') {
    curveDestination = {
      x: space.x2,
      y: getRandomSpan(space.y, space.y2)
    };
    referencePoint = {
      x: space.x2, 
      y: space.y
    };

    newSpace = {
      x: curveDestination.x,
      y: curveDestination.y,
      x2: space.x,
      y2: space.y2
    }
    newDirection = 'LTR';
  }

  arcs.push(curveDestination);

  ctx.beginPath();
  ctx.moveTo(space.x, space.y);
  ctx.quadraticCurveTo(referencePoint.x, referencePoint.y, curveDestination.x, curveDestination.y);
  ctx.stroke(); 

  setTimeout(addArcAndRender.bind(this, arcs, newDirection, newSpace), TIMEOUT_MS);
}

function getRandomSpan(v1, v2) {
  return v1 + (v2 - v1) / 4 + (v2 - v1) / 2 * Math.random();
}

const drawPicture = function() {
  addArcAndRender([], "LTR", {
    x: 0,
    y: 0, 
    x2: CANVAS_WIDTH, 
    y2: CANVAS_HEIGHT
  })
}

drawPicture();
