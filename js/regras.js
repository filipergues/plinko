function Regras(largura, altura, color, valor_pontuacao) {
  if (color === undefined) {
    color = "blue";
  }
  this.x = 0;
  this.y = 0;
  this.largura = largura;
  this.altura = altura;
  this.color = utils.parseColor(color);
  this.lineWidth = 1;
  this.pontos = valor_pontuacao;
}

Regras.prototype.draw = function (context) {
  context.save();
  context.translate(this.x, this.y);
  context.fillStyle = this.color;
  context.beginPath();
  context.font = "18px Arial";
  context.textAlign = "start";
  context.textBaseline = "middle";
  context.fillText("PONTUAÇÃO:", 0, this.altura / 2);

  context.font = "12px Arial";
  context.textAlign = "start";
  context.textBaseline = "middle";
  context.fillText(
    `1ª - ${this.pontos[0]} Pontos = ${this.pontos[0]} €`,
    0,
    this.altura / 2 + 40
  );
  context.fillText(
    `2ª - ${this.pontos[1]} Pontos = ${this.pontos[1]} €`,
    0,
    this.altura / 2 + 60
  );
  context.fillText(
    `3ª - ${this.pontos[2]} Pontos = ${this.pontos[2]} €`,
    0,
    this.altura / 2 + 80
  );
  context.fillText(
    `4ª - ${this.pontos[3]} Pontos = ${this.pontos[3]} €`,
    0,
    this.altura / 2 + 100
  );
  context.fillText(
    `5ª - ${this.pontos[4]} Pontos = ${this.pontos[4]} €`,
    0,
    this.altura / 2 + 120
  );
  context.fillText(
    `6ª - ${this.pontos[5]} Pontos = ${this.pontos[5]} €`,
    0,
    this.altura / 2 + 140
  );
  context.fillText(
    `7ª - ${this.pontos[6]} Pontos = ${this.pontos[6]} €`,
    0,
    this.altura / 2 + 160
  );

  context.font = "13px Arial";
  context.textAlign = "start";
  context.textBaseline = "middle";
  context.fillText("Junho 2020", 0, this.altura + 223);
  context.fillText("Programação de Interfaces Visuais", 0, this.altura + 243);

  context.closePath();

  if (this.lineWidth > 0) {
    context.stroke();
  }
  context.restore();
};
