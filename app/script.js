let firework;
let tailDot;
let initCoords;

function setup() {
  createCanvas(800, 800, WEBGL);
  setFrameRate(30);
  firework = new Firework();
  tailDot = new TailDot();
  initCoords = createVector(0, 0);
}

function draw() {
  background(220);
  initCoords.y = initCoords.y - 1;
  firework.display(initCoords.x, initCoords.y);
  tailDot.display(initCoords.x, initCoords.y + 50);
}

class Firework {
  constructor() {
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
    this.display = (posX, posY) => {
      fill(237, 34, 93);
      noStroke();
      beginShape();
      this.coordinates.forEach((item) => {
        vertex(posX + item[0], posY + item[1]);
      });
      endShape();
    };
  }
}

class TailDot {
  constructor() {
    this.display = (posX, posY) => {
      strokeWeight(5);
      stroke("red");
      point(posX, posY);
    };
  }
}
