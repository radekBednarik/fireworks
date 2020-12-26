let firework;
let dots;
let initCoords;

const HEIGHT = 800;
const WIDTH = 800;

function setup() {
  createCanvas(WIDTH, HEIGHT, WEBGL);
  setFrameRate(30);
  initCoords = createVector(0, HEIGHT / 2);
  firework = new Firework(initCoords.x, initCoords.y);
  dots = createDots(10);
}

function draw() {
  background(220);
  initCoords.y = initCoords.y - 2;
  firework.display(initCoords.y, -300);
  displayDots(dots, -300);
}

function createDots(nDots) {
  let offset = 50;
  let dots = [];
  for (let i = 0; i < nDots; i++) {
    dots.push(new TailDot(initCoords.x, initCoords.y + offset));
    offset += 50;
  }
  return dots;
}

function displayDots(dots, limitPosY) {
  dots.forEach((dot) => {
    dot.display(initCoords.y, limitPosY);
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
      console.log("OK");
      console.log("X: ", this.posX, "Y: ", this.posY);
      strokeWeight(5);
      stroke("red");
      point(this.posX, newPosY);
    }
  }
}
