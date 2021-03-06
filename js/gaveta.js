function Gaveta(largura, altura, color, ponto) {
  if (color === undefined) {
    color = "blue";
  }
  this.x = 0;
  this.y = 0;
  this.largura = largura;
  this.altura = altura;
  this.color = utils.parseColor(color);
  this.lineWidth = 0;
  this.ponto = ponto;
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

  context.beginPath();
  context.globalAlpha = 1;
  context.fillStyle = "white";
  context.font = "13px Arial";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(this.ponto, this.largura / 2, -this.altura / 2);
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
    y: this.y - this.altura,
    width: this.largura,
    height: this.altura,
  };
};
