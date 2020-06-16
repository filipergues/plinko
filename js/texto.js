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
  //context.fillStyle = this.color;
  context.beginPath();
  context.font = "48px Arial";
  context.textAlign = "center";
  context.textBaseline = "middle";

  gradiente = context.createLinearGradient(
    this.largura / 2 - 50,
    this.altura / 2,
    this.altura,
    this.altura
  );

  gradiente.addColorStop(0.0, "red");
  gradiente.addColorStop(1, "blue");
  context.fillStyle = gradiente;

  context.fillText("PLINKO", this.largura / 2, this.altura / 2);
  context.closePath();

  context.fillStyle = "black";
  context.font = "14px Arial";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("DESENVOLVIDO POR", this.largura / 2, this.altura / 2 + 110);
  context.globalAlpha = 0.6;
  context.fillText("Filipe Rodrigues", this.largura / 2, this.altura / 2 + 140);
  context.fillText(
    "Wenderson Wanzeller",
    this.largura / 2,
    this.altura / 2 + 160
  );

  context.globalAlpha = 1;
  context.fillText("ORIENTADOR", this.largura / 2, this.altura / 2 + 220);

  context.globalAlpha = 0.6;
  context.fillText(
    "Professor Doutor Luis Romero",
    this.largura / 2,
    this.altura / 2 + 250
  );

  context.closePath();
  if (this.lineWidth > 0) {
    context.stroke();
  }
  context.restore();
};
