let firework;

function setup() {
  createCanvas(800, 800, WEBGL);
  firework = new Firework(100, 100);
}

function draw() {
  background(220);
  firework.display();
}

class Firework {
  constructor(posX, posY) {
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
    this.posX = posX;
    this.posY = posY;
    this.display = () => {
      fill(237, 34, 93);
      noStroke();
      beginShape();
      this.coordinates.forEach((item) => {
        vertex(this.posX + item[0], this.posY + item[1]);
      });
      endShape();
    };
  }
}
