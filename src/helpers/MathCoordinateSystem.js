export default class MathCoordinateSystem {
  constructor(canvas, amountOfNumbers) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.sizeOfGrid = this.width / (amountOfNumbers + 1) / 2; // We need to add +1 cause last number is on margin position.
  }
  /*jshint ignore:start */
  drawMap() {
    this.canvas.style = 'background:white; border:2px solid black';
    // Drawing Vertical Lines
    for (let x = 0.5; x < this.width; x += this.sizeOfGrid) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.width);
    }
    //Drawing Horizontal Lines
    for (let y = 0.5; y < this.height; y += this.sizeOfGrid) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.height, y);
    }
    this.ctx.strokeStyle = 'lightblue';
    this.ctx.stroke();
    this.#drawNumbers();
    this.#drawAxis();
  }
  #drawNumbers() {
    const amountOfXNumbers = this.width / this.sizeOfGrid / 2;
    const amountOfYNumbers = this.height / this.sizeOfGrid / 2;
    this.ctx.font = `bold ${(this.width + this.height) / 2 / 28}px sans-serif`;
    this.ctx.textAlign = 'center';
    for (let i = 1; i < amountOfXNumbers; i++) {
      // X => Line
      this.ctx.fillText(-i, this.cartesianPoint(-i).x, this.cartesianPoint(0, -0.6).y); // Negative Numbers
      this.ctx.fillText(i, this.cartesianPoint(i).x, this.cartesianPoint(0, -0.6).y); // Positive Numbers
    }

    this.ctx.textBaseline = 'middle';
    for (let i = 1; i < amountOfYNumbers; i++) {
      // Y => Line
      this.ctx.fillText(-i, this.cartesianPoint(-0.5).x, this.cartesianPoint(0, -i).y); // Negative Numbers
      this.ctx.fillText(i, this.cartesianPoint(-0.5).x, this.cartesianPoint(0, i).y); // Positive Numbers
    }
  }
  #drawAxis() {
    this.ctx.beginPath();
    //X-> Line
    this.ctx.moveTo(0, this.height / 2);
    this.ctx.lineTo(this.width, this.height / 2);
    // Y=> Line
    this.ctx.moveTo(this.width / 2, 0);
    this.ctx.lineTo(this.width / 2, this.height);
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
  }
  /*jshint ignore:end */
  cartesianPoint(x, y) {
    x = x;
    y = y ? y : 0;
    const midWidth = this.width / 2;
    const midHeight = this.height / 2;
    const cartesianX = midWidth + x * this.sizeOfGrid;
    const cartesianY = midHeight - y * this.sizeOfGrid;
    return { x: cartesianX, y: cartesianY };
  }
  drawPoint(x, y) {
    this.ctx.beginPath();
    const sizeOfBlock = this.sizeOfGrid / 4;
    const xCartesian = this.cartesianPoint(x, 0).x;
    const yCartesian = this.cartesianPoint(0, y).y;
    this.ctx.beginPath();
    this.ctx.arc(xCartesian, yCartesian, sizeOfBlock / 2, 0, 2 * Math.PI);
    this.ctx.fill();
  }
  drawTriangle(pointX, pointY) {
    const hypotenuseTriangle = pointX * pointX + pointY * pointY;

    //Triangle
    const lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(this.cartesianPoint(0).x, this.cartesianPoint(0).y); // We move to point 0,0
    this.ctx.lineTo(this.cartesianPoint(pointX).x, this.cartesianPoint(0).y); // We move to point X,0
    this.ctx.lineTo(this.cartesianPoint(pointX).x, this.cartesianPoint(pointX, pointY).y); // We move to point X,Y
    this.ctx.closePath();
    this.ctx.lineWidth = lineWidth;
    this.ctx.fillStyle = 'White';
    this.ctx.fill();
    this.ctx.strokeStyle = '#black';
    this.ctx.stroke();
    // Painting the variables
    this.ctx.fillStyle = 'black';
    this.ctx.font = 'bold 24px sans-serif';
    this.ctx.fillText(
      `y=${pointY}`,
      this.cartesianPoint(pointX + (pointX < 0 ? -0.6 : 0.6)).x,
      this.cartesianPoint(0, pointY / 2).y
    );
    this.ctx.fillText(
      `x=${pointX}`,
      this.cartesianPoint(pointX / 2).x,
      this.cartesianPoint(0, 0 - (pointY < 0 ? -0.3 : 0.8)).y
    );
    this.ctx.fillText(
      'α',
      this.cartesianPoint(0 - (pointX < 0 ? 0.7 : -0.7)).x,
      this.cartesianPoint(0, 0 - (pointY < 0 ? 0.25 : -0.25)).y
    );
    this.ctx.save();
    this.ctx.translate(this.cartesianPoint(pointX / 2).x, this.cartesianPoint(0, pointY / 2).y);
    this.ctx.rotate(-Math.PI / 4);
    this.ctx.fillText(`√${hypotenuseTriangle} = ${Math.sqrt(hypotenuseTriangle).toFixed(2)}`, 0, -15);
    this.ctx.restore();
  }
}
