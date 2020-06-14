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

  // Desenha o fundo do tabuleiro
  context.lineWidth = 0;
  context.fillStyle = this.color;
  context.globalAlpha = 0.5;
  context.beginPath();
  context.fillRect(0, 0, this.largura, this.altura);
  context.closePath();

  // Desenha as bordas do tabuleiro
  context.lineWidth = this.lineWidth;
  context.fillStyle = this.color;
  context.globalAlpha = 1;
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

// Limites interiores do tabuleiro
Tabuleiro.prototype.getBounds = function () {
  return {
    x: this.x - this.largura / 2 + this.espessura,
    y: this.y - this.altura / 2,
    width: this.x + this.largura / 2 - this.espessura,
    height: this.y + this.altura / 2 - this.espessura,
  };
};
