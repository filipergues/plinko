function Divisoria(largura, altura, color) {
  if (color === undefined) {
    color = "#996633";
  }
  this.x = 0;
  this.y = 0;
  this.largura = largura;
  this.altura = altura;
  this.mass = 1;
  this.rotation = 0;
  this.color = utils.parseColor(color);
  this.lineWidth = 1;
}

Divisoria.prototype.draw = function (context) {
  context.save();
  context.translate(this.x, this.y);
  context.lineWidth = this.lineWidth;
  context.fillStyle = this.color;
  context.beginPath();
  context.lineTo(0, this.altura);
  context.lineTo(this.largura, this.altura);
  context.lineTo(this.largura, 0);
  context.arc(this.largura / 2, 0, this.largura / 2, 0, Math.PI, true);
  context.closePath();
  context.shadowColor = "rgba(0,0,0,0.3)";
  context.shadowOffsetX = 3;
  context.shadowOffsetY = 0;
  context.shadowBlur = 3;
  context.fill();
  if (this.lineWidth > 0) {
    context.stroke();
  }
  context.restore();
};

Divisoria.prototype.getBounds = function () {
  return {
    x: this.x,
    y: this.y,
    width: this.x + this.largura,
    height: this.y + this.altura,
  };
};
