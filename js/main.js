var canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d");

// Dimensões do tabuleiro
var largura = 580;
var altura = 700;

// Cria tabuleiro de 580x700 com 20 de espessura com cor predefinida
var tabuleiro = new Tabuleiro(largura, altura, 20);
// Posiciona o tabuleiro no centro do canvas
tabuleiro.x = canvas.width / 2;
tabuleiro.y = canvas.height / 2;
tabuleiro.draw(context);

// Cria gavetas
// Gaveta esquerda e direita são ligeiramente maiores
var gaveta_esquerda = new Gaveta(55, 45);
gaveta_esquerda.x = canvas.width / 2 - largura / 2 + 20;
gaveta_esquerda.y = canvas.height / 2 + altura / 2 - 20;
gaveta_esquerda.draw(context);
var gaveta_direita = new Gaveta(55, 45);
gaveta_direita.x = canvas.width / 2 - largura / 2 + 505;
gaveta_direita.y = canvas.height / 2 + altura / 2 - 20;
gaveta_direita.draw(context);
// Gavetas centrais
for (let g = 0; g < 7; g++) {
  var gaveta_central = new Gaveta(50, 45);
  gaveta_central.x = canvas.width / 2 - largura / 2 + 85 + 60 * g;
  gaveta_central.y = canvas.height / 2 + altura / 2 - 20;
  gaveta_central.draw(context);
}

// Cria divisórias
for (var d = 0; d < 8; d++) {
  var divisoria = new Divisoria(10, 45);
  divisoria.x = canvas.width / 2 - largura / 2 + 75 + 60 * d;
  divisoria.y = canvas.height / 2 + altura / 2 - 65;
  divisoria.draw(context);
}

// Cria tabelas 5 tabelas de cada lado, com cor predefinida
for (var t = 0; t < 5; t++) {
  var tabela_esquerda = new Tabela(30, 120, 1);
  tabela_esquerda.x = canvas.width / 2 - largura / 2 + 20;
  tabela_esquerda.y = canvas.height / 2 - altura / 2 + 35 + 120 * t;
  tabela_esquerda.draw(context);
  var tabela_direita = new Tabela(30, 120, -1);
  tabela_direita.x = canvas.width / 2 - largura / 2 + 560;
  tabela_direita.y = canvas.height / 2 - altura / 2 + 35 + 120 * t;
  tabela_direita.draw(context);
}

// Cria 10 linhas com 8 ou 7 pinos alternados
for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 8; j++) {
    // Cria pino com raio 5 e cor predefinida
    var pino = new Pino(5);
    // Se for uma linha par, o primeiro pino
    // da linha começa na posição x = 0
    if (i % 2 == 0) {
      pino.x = canvas.width / 2 - largura / 2 + 80 + 60 * j;
      // Se for uma linha impar, o primeiro pino
      // da linha começa na posição x = 30
    } else {
      pino.x = canvas.width / 2 - largura / 2 + 110 + 60 * j;
    }
    pino.y = canvas.height / 2 - altura / 2 + 35 + 60 * i;
    // Nas linhas impares só cria 7 pinos
    if (pino.x < canvas.width / 2 + largura / 2 - 50) {
      pino.draw(context);
    }
  }
}

// Cria display com a pontuação
var pontuacao = new Pontuacao(200, 100);
pontuacao.x = 50;
pontuacao.y = 100;
pontuacao.draw(context);

// Cria disco com raio 20 e cor vermelha
var disco = new Disco(20, "red");
disco.x = canvas.width / 2;
disco.y = 50;
disco.draw(context);
