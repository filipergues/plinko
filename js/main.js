var canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d");

// Centro do canvas
var cx = canvas.width / 2;
var cy = canvas.height / 2;

// Dimensões do tabuleiro
var largura = 450;
var altura = 550;
var espessura = 20; // Espessura da borda
var cor_madeira = "#e6d2b5"; // Bege

// Cria tabuleiro de 450x550 com 20 de espessura da borda
var tabuleiro = new Tabuleiro(largura, altura, espessura, cor_madeira);
// Posiciona o tabuleiro no centro do canvas
tabuleiro.x = cx;
tabuleiro.y = cy;
tabuleiro.draw(context);

// Cria 7 gavetas de 50x50
for (let g = 0; g < 7; g++) {
  var gaveta_central = new Gaveta(50, 50, "blue");
  gaveta_central.x = cx - largura / 2 + espessura + 60 * g;
  gaveta_central.y = cy + altura / 2 - espessura;
  gaveta_central.draw(context);
}

// Cria divisórias entre as gavetas
for (var d = 0; d < 6; d++) {
  var divisoria = new Divisoria(10, 50, cor_madeira);
  divisoria.x = cx - largura / 2 + 70 + 60 * d;
  divisoria.y = cy + altura / 2 - 70;
  divisoria.draw(context);
}

// Cria 4 tabelas de cada lado
for (var t = 0; t < 4; t++) {
  // Terceiro argumento com valor 1 refere-se à posição esquerda
  var tabela_esquerda = new Tabela(30, 120, 1, cor_madeira);
  tabela_esquerda.x = cx - largura / 2 + espessura;
  tabela_esquerda.y = cy - altura / 2 + 120 * t;
  tabela_esquerda.draw(context);
  // Terceiro argumento com valor -1 refere-se à posição direita
  var tabela_direita = new Tabela(30, 120, -1, cor_madeira);
  tabela_direita.x = cx + largura / 2 - espessura;
  tabela_direita.y = cy - altura / 2 + 120 * t;
  tabela_direita.draw(context);
}

// Cria 7 linhas com 5 ou 6 pinos alternados
for (var i = 0; i < 7; i++) {
  for (var j = 0; j < 8; j++) {
    // Cria pino com raio 5
    var pino = new Pino(5, cor_madeira);
    // Se for uma linha par, o primeiro pino
    // da linha começa na posição x = 110
    if (i % 2 == 0) pino.x = cx - largura / 2 + 110 + 60 * j;
    // Se for uma linha impar, o primeiro pino
    // da linha começa na posição x = 80
    else pino.x = cx - largura / 2 + 80 + 60 * j;
    pino.y = cy - altura / 2 + 60 + 60 * i;
    // Desenha apenas os pinos dentro da area util do tabuleiro
    if (pino.x < cx + largura / 2 - 50) {
      pino.draw(context);
    }
  }
}

// Cria display com a pontuação
var pontuacao = new Pontuacao(200, 100, "blue");
pontuacao.x = 50;
pontuacao.y = 50;
pontuacao.draw(context);

// Cria disco com raio 20 e cor vermelha
var disco = new Disco(20, "red");
disco.x = cx;
disco.y = 50;
disco.draw(context);
