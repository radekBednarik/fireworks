let firework;
let dots;
let explosion;
let coords;

const SPEED = 2;
const VLIMIT = 0;

function setup() {
  createCanvas(displayWidth, displayHeight, WEBGL);
  setFrameRate(30);
  coords = createVector(0, displayWidth / 2);
  firework = new Firework(coords.x, coords.y);
  dots = createDots(11);
  explosion = new Explosion(coords.x, coords.y, 255);
}

function draw() {
  background(220);
  coords.y = coords.y - SPEED;
  firework.display(coords.y, VLIMIT);
  displayDots(dots, VLIMIT);
  coords.y <= VLIMIT && explosion.display(VLIMIT, 5, 1, 4);
}

function createDots(nDots) {
  let offset = 50;
  let dots = [];
  for (let i = 0; i < nDots; i++) {
    dots.push(new TailDot(coords.x, coords.y + offset * 0.1 * i));
    offset += 50;
  }
  return dots;
}

function displayDots(dots, limitPosY) {
  dots.forEach((dot) => {
    dot.posY = dot.posY - SPEED;
    dot.display(dot.posY, limitPosY);
  });
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
