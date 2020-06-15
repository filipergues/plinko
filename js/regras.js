function Regras(largura, altura, color) {
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

Regras.prototype.draw = function (context) {
  context.save();
  context.translate(this.x, this.y);
  context.fillStyle = this.color;
  context.beginPath();
  context.font = "24px Arial";
  context.textAlign = "start";
  context.textBaseline = "middle";
  context.fillText("PONTUAÇÃO", 0, this.altura / 2 - 10);
  context.closePath();

  context.beginPath();
  context.font = "12px Arial";
  context.textAlign = "start";
  context.textBaseline = "middle";
  context.fillText("Cada gaveta tem sua pontuação:", 0, this.altura / 2 + 25);
  context.fillText("1 - Pontos 10 €", 0, this.altura / 2 + 60);
  context.fillText("2 - Pontos 20 €", 0, this.altura / 2 + 80);
  context.fillText("3 - Pontos 50 €", 0, this.altura / 2 + 100);
  context.fillText("4 - Pontos 00 €", 0, this.altura / 2 + 120);
  context.fillText("5 - Pontos 90 €", 0, this.altura / 2 + 140);
  context.fillText("6 - Pontos 40 €", 0, this.altura / 2 + 160);
  context.fillText("7 - Pontos 80 €", 0, this.altura / 2 + 180);
  context.closePath();

  if (this.lineWidth > 0) {
    context.stroke();
  }
  context.restore();
};
