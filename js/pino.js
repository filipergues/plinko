function Pino(radius, color) {
  if (radius === undefined) radius = 5;
  if (color === undefined) color = "#996633";
  this.x = 0;
  this.y = 0;
  this.radius = radius;
  this.vx = 0;
  this.vy = 0;
  this.mass = 1;
  this.rotation = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.color = utils.parseColor(color);
  this.lineWidth = 1;
}

Pino.prototype.draw = function (context) {
  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.rotation);
  context.scale(this.scaleX, this.scaleY);

  context.lineWidth = this.lineWidth;
  context.fillStyle = this.color;
  context.beginPath();
  // x, y, radius, start_angle, end_angle, anti-clockwise
  context.arc(0, 0, this.radius, 0, Math.PI * 2, true);
  context.closePath();
  context.shadowColor = "rgba(0,0,0,0.3)";
  context.shadowOffsetX = 3;
  context.shadowOffsetY = 3;
  context.shadowBlur = 3;
  context.fill();
  if (this.lineWidth > 0) {
    context.stroke();
  }
  context.restore();
};

Pino.prototype.getBounds = function () {
  return {
    x: this.x - this.radius,
    y: this.y - this.radius,
    width: this.radius * 2,
    height: this.radius * 2,
  };
};
