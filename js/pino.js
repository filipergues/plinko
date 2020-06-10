function Pino(radius, color) {
  if (radius === undefined) {
    radius = 5;
  }
  if (color === undefined) {
    color = "#996633";
  }
  this.x = 0;
  this.y = 0;
  this.radius = radius;
  this.color = utils.parseColor(color);
  this.lineWidth = 1;
}

Pino.prototype.draw = function (context) {
  context.save();
  context.translate(this.x, this.y);

  context.lineWidth = this.lineWidth;
  context.fillStyle = this.color;
  context.beginPath();
  // x, y, radius, start_angle, end_angle, anti-clockwise
  context.arc(0, 0, this.radius, 0, Math.PI * 2, true);
  context.closePath();
  context.fill();
  if (this.lineWidth > 0) {
    context.stroke();
  }
  context.restore();
};
