function Tabuleiro(largura, altura, espessura, color) {
  if (espessura === undefined) {
    espessura = 20;
  }
  if (color === undefined) {
    color = "#996633";
  }
  this.x = 0;
  this.y = 0;
  this.largura = largura;
  this.altura = altura;
  this.espessura = espessura;
  this.color = utils.parseColor(color);
  this.lineWidth = 1;
}

Tabuleiro.prototype.draw = function (context) {
  context.save();
  context.translate(this.x - this.largura / 2, this.y - this.altura / 2);

  context.lineWidth = this.lineWidth;
  context.fillStyle = this.color;
  context.beginPath();
  context.rect(0, 0, this.espessura, this.altura);
  context.rect(
    this.espessura,
    this.altura - this.espessura,
    this.largura - this.espessura * 2,
    this.espessura
  );
  context.rect(this.largura - this.espessura, 0, this.espessura, this.altura);
  context.closePath();
  context.fill();
  if (this.lineWidth > 0) {
    context.stroke();
  }
  context.restore();
};
