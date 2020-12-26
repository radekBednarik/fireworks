let firework;
let tailDot;
let initCoords;

const HEIGHT = 800;
const WIDTH = 800;

function setup() {
  createCanvas(WIDTH, HEIGHT, WEBGL);
  setFrameRate(30);
  initCoords = createVector(0, HEIGHT / 2);
  firework = new Firework(initCoords.x, initCoords.y);
  tailDot = new TailDot(initCoords.x, initCoords.y + 50);
}

function draw() {
  background(220);
  initCoords.y = initCoords.y - 1;
  firework.display(initCoords.y, -300);
  tailDot.display(initCoords.y + 50, -300);
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
    if (newPosY <= initCoords.y && newPosY > limitPosY) {
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
    if (newPosY <= initCoords.y + 50 && newPosY > limitPosY) {
      strokeWeight(5);
      stroke("red");
      point(this.posX, newPosY);
    }
  }
}
