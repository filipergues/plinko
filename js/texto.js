function Texto(largura, altura, color) {
  if (color === undefined) {
    color = "blue";
  }
  this.x = 0;
  this.y = 0;
  this.largura = largura;
  this.altura = altura;
  this.color = utils.parseColor(color);
  this.lineWidth = 1;
}

Texto.prototype.draw = function (context) {
  context.save();
  context.translate(this.x, this.y);
  context.fillStyle = this.color;
  context.beginPath();
  context.font = "48px Arial";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("PLINKO", this.largura / 2, this.altura / 2);
  context.closePath();
  if (this.lineWidth > 0) {
    context.stroke();
  }
  context.restore();
};
