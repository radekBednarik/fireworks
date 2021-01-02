"use strict";

let fireworks;
let fireworksDots;
let coordsArray;
let coords;
let vlimits;

const FIREWORKSCOUNT = 20;
const SPEED = 5;
const CWIDTH = 1100;
const CHEIGHT = 900;
const STARTHEIGHT = CHEIGHT / 2;
const COLOURS = [
  [255, 0, 0],
  [0, 0, 255],
  [0, 255, 0],
  [0, 229, 228],
  [255, 0, 255],
  [255, 255, 0],
  [255, 153, 51],
];

function setup() {
  createCanvas(CWIDTH, CHEIGHT, WEBGL);
  setFrameRate(30);
  coordsArray = createInitCoords(FIREWORKSCOUNT);
  fireworks = createFireworks(coordsArray);
  fireworksDots = createFireworksDots(coordsArray);
  coords = createVector(0, STARTHEIGHT);
  vlimits = getVerticalLimits(50, coordsArray);
}

function draw() {
  background("black");
  coords.y = coords.y - SPEED;
  fire(coords.y, coordsArray, vlimits);
  reloadPage(coords.y);
}

function createDots(nDots, offSet, coords) {
  let offset = offSet;
  let dots = [];
  for (let i = 0; i < nDots; i++) {
    dots.push(new TailDot(coords.x, coords.y + offset, 10));
    offset += offSet;
  }
  return dots;
}

function displayDots(dots, limitPosY) {
  dots.forEach((dot) => {
    dot.posY = dot.posY - SPEED;
    dot.display(dot.posY, limitPosY);
  });
}

function createInitCoords(noOfItemsToReturn) {
  // yes, it may happen, that it will generate same x-coord number multiple times
  // but whatever
  let coords = [];
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values
  for (let i = 0; i < noOfItemsToReturn; i++) {
    const min = Math.ceil(-CWIDTH / 2) + 50;
    const max = Math.floor(CWIDTH / 2) - 50;
    coords.push(
      createVector(Math.floor(Math.random() * (max - min) + min), STARTHEIGHT)
    );
  }
  return coords;
}

function createFireworks(coordsArray) {
  let fireworks = [];
  for (const coords of coordsArray) {
    fireworks.push(new Firework(coords.x, coords.y, 255));
  }
  return fireworks;
}

function createFireworksDots(coordsArray) {
  let dots = [];
  for (const coords of coordsArray) {
    dots.push(createDots(11, 50, coords));
  }
  return dots;
}

function fire(coordsY, coordsArray, vlimits) {
  const l = coordsArray.length;

  for (let i = 0; i < l; i++) {
    fireworks[i].display(coordsY, vlimits[i]);
    displayDots(fireworksDots[i], vlimits[i]);
    coordsY <= vlimits[i] && fireworks[i].explosion(vlimits[i], 5, 0.75, 4);
  }
}

function selectRandomColour(colours) {
  const min = 0;
  const max = colours.length;
  const index = Math.floor(Math.random() * (max - min) + min);
  return colours[index];
}

function getVerticalLimits(minExplosionDist, coordsArray) {
  let limits = [];
  const min = STARTHEIGHT - minExplosionDist;
  const max = -STARTHEIGHT + minExplosionDist;

  for (let i = 0; i < coordsArray.length; i++) {
    limits.push(Math.floor(Math.random() * (max - min) + min));
  }
  return limits;
}

function reloadPage(coordsY) {
  if (coordsY < -CHEIGHT) {
    location.reload();
  }
}

class GenericFirework {
  constructor(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.colour = selectRandomColour(COLOURS);
  }
}

class Firework extends GenericFirework {
  constructor(posX, posY, alpha) {
    super(posX, posY);
    this.coordinates = [
      [-10, 10],
      [0, 35],
      [10, 10],
      [35, 0],
      [10, -10],
      [0, -35],
      [-10, -10],
      [-35, 0],
    ];
    this.alpha = alpha;
  }

  display(newPosY, limitPosY) {
    if (newPosY > limitPosY) {
      fill(color(this.colour[0], this.colour[1], this.colour[2]));
      noStroke();
      beginShape();
      this.coordinates.forEach((item) => {
        vertex(this.posX + item[0], newPosY + item[1]);
      });
      endShape();
    }
  }

  explosion(newPosY, basicSpreadDist, spreadMod, alphaRed) {
    noStroke();
    fill(color(this.colour[0], this.colour[1], this.colour[2], this.alpha));
    beginShape();
    this.coordinates.forEach((item) => {
      if (Math.abs(item[0]) === Math.abs(item[1])) {
        item[0] < 0 && (item[0] = item[0] - basicSpreadDist * spreadMod);
        item[0] > 0 && (item[0] = item[0] + basicSpreadDist * spreadMod);
        item[1] < 0 && (item[1] = item[1] - basicSpreadDist * spreadMod);
        item[1] > 0 && (item[1] = item[1] + basicSpreadDist * spreadMod);
      } else {
        item[0] > 0 && (item[0] = item[0] + basicSpreadDist);
        item[0] < 0 && (item[0] = item[0] - basicSpreadDist);
        item[1] < 0 && (item[1] = item[1] - basicSpreadDist);
        item[1] > 0 && (item[1] = item[1] + basicSpreadDist);
      }
      vertex(this.posX + item[0], newPosY + item[1]);
    });
    endShape();
    this.alpha > 0 ? (this.alpha = this.alpha - alphaRed) : (this.alpha = 0);
  }
}

class TailDot extends GenericFirework {
  constructor(posX, posY, range) {
    super(posX, posY);
    this.range = range;
    this.rangeArr = this._getShimmerRange();
  }

  _getShimmerRange() {
    let rangeArr = [];
    for (let i = -this.range; i <= this.range; i++) {
      rangeArr.push(i);
    }
    return rangeArr;
  }

  _shimmer() {
    const min = Math.ceil(this.rangeArr[0]);
    const max = Math.ceil(this.rangeArr.slice(-1));
    const offset = Math.floor(Math.random() * (max - min) + min);
    return offset;
  }

  display(newPosY, limitPosY) {
    if (newPosY > limitPosY) {
      strokeWeight(3.5);
      stroke(color(this.colour[0], this.colour[1], this.colour[2]));
      point(this.posX + this._shimmer(), newPosY + this._shimmer());
    }
  }
}
