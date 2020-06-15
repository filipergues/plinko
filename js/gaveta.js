function Gaveta(largura, altura, color) {
  if (color === undefined) {
    color = "blue";
  }
  this.x = 0;
  this.y = 0;
  this.largura = largura;
  this.altura = altura;
  this.color = utils.parseColor(color);
  this.lineWidth = 0;
}

Gaveta.prototype.draw = function (context) {
  context.save();
  context.translate(this.x, this.y);
  context.fillStyle = this.color;
  context.globalAlpha = 0.3;
  context.beginPath();
  context.rect(0, 0, this.largura, -this.altura);
  context.closePath();
  context.fill();
  if (this.lineWidth > 0) {
    context.stroke();
  }
  context.restore();
};

Gaveta.prototype.getBounds = function () {
  return {
    x: this.x,
    y: this.y,
    width: this.x + this.largura,
    height: this.y + this.altura,
  };
};
