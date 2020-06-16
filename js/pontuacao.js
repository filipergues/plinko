function Pontuacao(largura, altura, color) {
  if (color === undefined) {
    color = "blue";
  }
  this.x = 0;
  this.y = 0;
  this.largura = largura;
  this.altura = altura;
  this.color = utils.parseColor(color);
  this.lineWidth = 0;
  this.pontos = 0;
}

Pontuacao.prototype.draw = function (context) {
  context.save();
  context.translate(this.x, this.y);
  context.fillStyle = this.color;
  context.beginPath();
  context.shadowColor = "rgba(0,0,0,0.5)";
  context.shadowOffsetX = 10;
  context.shadowOffsetY = 10;
  context.shadowBlur = 15;
  context.fillRect(0, 0, this.largura, this.altura);
  context.clearRect(10, 10, this.largura - 20, this.altura - 20);
  context.font = "30px Arial";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(this.pontos + " €", this.largura / 2, this.altura / 2);
  context.closePath();
  if (this.lineWidth > 0) {
    context.stroke();
  }
  context.restore();
};
