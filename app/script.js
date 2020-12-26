let firework;
let dots;
let coords;

const HEIGHT = 800;
const WIDTH = 800;
const SPEED = 2;
const VLIMIT = -300;

function setup() {
  createCanvas(WIDTH, HEIGHT, WEBGL);
  setFrameRate(30);
  coords = createVector(0, HEIGHT / 2);
  firework = new Firework(coords.x, coords.y);
  dots = createDots(11);
}

function draw() {
  background(220);
  coords.y = coords.y - SPEED;
  firework.display(coords.y, VLIMIT);
  displayDots(dots, VLIMIT);
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
