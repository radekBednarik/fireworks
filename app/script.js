let firework;
let tailDot;
let initCoords;

function setup() {
  createCanvas(800, 800, WEBGL);
  setFrameRate(30);
  initCoords = createVector(0, 0);
  firework = new Firework(initCoords.x, initCoords.y);
  tailDot = new TailDot(initCoords.x, initCoords.y + 50);
}

function draw() {
  background(220);
  initCoords.y = initCoords.y - 1;
  firework.display(initCoords.y);
  tailDot.display(initCoords.y + 50);
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

  display(newPosY) {
    fill(237, 34, 93);
    noStroke();
    beginShape();
    this.coordinates.forEach((item) => {
      vertex(this.posX + item[0], newPosY + item[1]);
    });
    endShape();
  }
}

class TailDot {
  constructor(posX, posY) {
    this.posX = posX;
    this.posY = posY;
  }

  display(newPosY) {
    strokeWeight(5);
    stroke("red");
    point(this.posX, newPosY);
  }
}
