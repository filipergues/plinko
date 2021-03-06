function Ponto(x, y) {
  this.x = x;
  this.y = y;
}

function Tabela(largura, altura, posicao, color) {
  if (color === undefined) {
    color = "#996633";
  }
  this.x = 0;
  this.y = 0;
  this.largura = largura;
  this.altura = altura;
  this.posicao = posicao;
  this.color = utils.parseColor(color);
  this.lineWidth = 1;
  this.pontos = this.criaPontos(largura, altura, posicao);
}

Tabela.prototype.criaPontos = function (largura, altura, posicao) {
  var pontos = [];
  pontos.push(new Ponto(this.x, this.y));
  pontos.push(new Ponto(this.x, this.y + altura));
  pontos.push(new Ponto(this.x + largura * posicao, this.y + altura / 2));
  return pontos;
};

Tabela.prototype.criaPath = function (context) {
  context.beginPath();
  context.moveTo(this.pontos[0].x, this.pontos[0].y);
  for (i = 1; i < 3; i++) {
    context.lineTo(this.pontos[i].x, this.pontos[i].y);
  }
  context.closePath();
};

Tabela.prototype.draw = function (context) {
  context.save();
  context.translate(this.x, this.y);

  context.lineWidth = this.lineWidth;
  context.fillStyle = this.color;
  this.criaPath(context);
  context.shadowColor = "rgba(0,0,0,0.3)";
  if (this.posicao === 1) context.shadowOffsetX = 3;
  else context.shadowOffsetX = -3;
  context.shadowOffsetY = 3;
  context.shadowBlur = 3;
  context.fill();
  if (this.lineWidth > 0) {
    context.stroke();
  }
  context.restore();
};

Tabela.prototype.getBounds = function () {
  if (this.posicao === 1) {
    return {
      x: this.x,
      y: this.y,
      width: this.largura,
      height: this.altura,
    };
  } else if (this.posicao === -1) {
    return {
      x: this.x - this.largura,
      y: this.y,
      width: this.largura,
      height: this.altura,
    };
  }
};
