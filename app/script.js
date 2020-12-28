let fireworks;
let fireworksDots;
let explosions;
let coordsArray;
let coords;

const SPEED = 2;
const VLIMIT = 0;
const CWIDTH = 1100;
const CHEIGHT = 900;
const STARTHEIGHT = CHEIGHT / 2;

function setup() {
  createCanvas(CWIDTH, CHEIGHT, WEBGL);
  setFrameRate(30);

  coordsArray = createInitCoords(10);
  fireworks = createFireworks(coordsArray);
  fireworksDots = createFireworksDots(coordsArray);
  explosions = createFireworksExplosions(coordsArray);
  coords = createVector(0, STARTHEIGHT);
}

function draw() {
  background("black");
  coords.y = coords.y - SPEED;
  fire(coords.y, coordsArray);
}

function createDots(nDots, offSet, coords) {
  let offset = offSet;
  let dots = [];
  for (let i = 0; i < nDots; i++) {
    dots.push(new TailDot(coords.x, coords.y + offset));
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
  // but that is low prob and whatever
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
    fireworks.push(new Firework(coords.x, coords.y));
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

function createFireworksExplosions(coordsArray) {
  let explosions = [];
  for (const coords of coordsArray) {
    explosions.push(new Explosion(coords.x, coords.y, 255));
  }
  return explosions;
}

function fire(coordsY, coordsArray) {
  const l = coordsArray.length;

  for (let i = 0; i < l; i++) {
    fireworks[i].display(coordsY, VLIMIT);
    displayDots(fireworksDots[i], VLIMIT);
    coordsY <= VLIMIT && explosions[i].display(VLIMIT, 5, 1, 4);
  }
}

class Firework {
  constructor(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.coordinates = [
      [-10, 10],
      [0, 35],
      [10, 10],
      [35, 0],
      [10, -8],
      [0, -35],
      [-10, -8],
      [-35, 0],
    ];
  }

  display(newPosY, limitPosY) {
    if (newPosY > limitPosY) {
      fill(237, 34, 93);
      noStroke();
      beginShape();
      this.coordinates.forEach((item) => {
        vertex(this.posX + item[0], newPosY + item[1]);
      });
      endShape();
    }
  }
}

class TailDot {
  constructor(posX, posY) {
    this.posX = posX;
    this.posY = posY;
  }

  display(newPosY, limitPosY) {
    if (newPosY > limitPosY) {
      strokeWeight(5);
      stroke("red");
      point(this.posX, newPosY);
    }
  }
}

class Explosion {
  constructor(posX, posY, alpha) {
    this.posX = posX;
    this.posY = posY;
    this.coordinates = [
      [30, 0],
      [0, -30],
      [-30, 0],
      [0, 30],
      [30, 0],
    ];
    this.alpha = alpha;
  }

  display(newPosY, basicSpreadDist, spreadMod, alphaRed) {
    let c = color(255, 0, 0, this.alpha);
    stroke(c);
    fill(c);
    beginShape();
    this.coordinates.forEach((item) => {
      // update coords. need to account for neg/pos values
      if (item.indexOf(0) != -1) {
        item[0] < 0 && (item[0] = item[0] - basicSpreadDist * spreadMod);
        item[0] > 0 && (item[0] = item[0] + basicSpreadDist * spreadMod);
        item[1] < 0 && (item[1] = item[1] - basicSpreadDist * spreadMod);
        item[1] > 0 && (item[1] = item[1] + basicSpreadDist * spreadMod);
      }
      vertex(this.posX + item[0], newPosY + item[1]);
    });
    endShape();
    this.alpha > 0 ? (this.alpha = this.alpha - alphaRed) : (this.alpha = 0);
  }
}
