// Pontuação do jogo
const valor_pontuacao = [100, 200, 500, 0, 900, 400, 800];

var canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d");

// Captura Rato
var mouse = utils.captureMouse(canvas);
var isMouseDown = false;

// Valores da gravidade e ricochete
var gravity = 0;
var bounce = -0.6;

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
// Limites do tabuleiro
var tabuleiroBounds = tabuleiro.getBounds();
function drawTabuleiro(tabuleiro) {
  tabuleiro.draw(context);
}

// Cria 7 gavetas de 50x50
var gavetas = [];
for (let g = 0; g < 7; g++) {
  var gaveta = new Gaveta(50, 50, "blue");
  gaveta.x = cx - largura / 2 + espessura + 60 * g;
  gaveta.y = cy + altura / 2 - espessura;
  gaveta.ponto = valor_pontuacao[g];
  gavetas.push(gaveta);
}
function drawGavetas(gaveta) {
  gaveta.draw(context);
}

// Cria divisórias entre as gavetas
var divisorias = [];
for (var d = 0; d < 6; d++) {
  var divisoria = new Divisoria(10, 50, cor_madeira);
  divisoria.mass = 3;
  divisoria.x = cx - largura / 2 + 70 + 60 * d;
  divisoria.y = cy + altura / 2 - 70;
  divisorias.push(divisoria);
}
function drawDivisorias(divisoria) {
  checkCollisionDivisorias(disco, divisoria);
  divisoria.draw(context);
}

// Cria 4 tabelas de cada lado
var tabelas = [];
for (var t = 0; t < 4; t++) {
  // Terceiro argumento com valor 1 refere-se à posição esquerda
  var tabela_esquerda = new Tabela(30, 120, 1, cor_madeira);
  tabela_esquerda.x = cx - largura / 2 + espessura;
  tabela_esquerda.y = cy - altura / 2 + 120 * t;
  tabelas.push(tabela_esquerda);
  // Terceiro argumento com valor -1 refere-se à posição direita
  var tabela_direita = new Tabela(30, 120, -1, cor_madeira);
  tabela_direita.x = cx + largura / 2 - espessura;
  tabela_direita.y = cy - altura / 2 + 120 * t;
  tabelas.push(tabela_direita);
}
function drawTabelas(tabela) {
  checkCollisionTabelas(disco, tabela);
  tabela.draw(context);
}

// Cria pinos com raio 5
var pinos = [];
for (var i = 0; i < 7; i++) {
  for (var j = 0; j < 8; j++) {
    var pino = new Pino(5, cor_madeira);
    pino.mass = 3;
    // Se for uma linha par, o primeiro pino
    // da linha começa na posição x = 105
    if (i % 2 == 0) pino.x = cx - largura / 2 + 105 + 60 * j;
    // Se for uma linha impar, o primeiro pino
    // da linha começa na posição x = 75
    else pino.x = cx - largura / 2 + 75 + 60 * j;
    pino.y = cy - altura / 2 + 60 + 60 * i;
    // Desenha apenas os pinos dentro da area util do tabuleiro
    if (pino.x < cx + largura / 2 - 50) {
      pinos.push(pino);
    }
  }
}
function drawPinos(pino) {
  checkCollision(disco, pino);
  pino.draw(context);
}

// Cria display com a pontuação
var pontuacao = new Pontuacao(200, 100, "blue");
function drawPontuacao(pontuacao) {
  pontuacao.x = 50;
  pontuacao.y = 50;
  pontuacao.draw(context);
}

// Cria Texto com apresentação do jogo
var texto = new Texto(200, 100, "red");
function drawTexto(texto) {
  texto.x = cx + largura / 2 + 50;
  texto.y = cy - altura / 2;
  texto.draw(context);
}

// Texto com regras do jogo
var regras = new Regras(200, 200, "black", valor_pontuacao);
function drawRegras(regras) {
  regras.x = 50;
  regras.y = 150;
  regras.draw(context);
}

// Cria disco com raio 20 e cor vermelha
var disco = new Disco(20, "red");
disco.x = cx;
disco.y = 45;
function drawDisco(disco) {
  disco.draw(context);
}

function rotate(x, y, sin, cos, reverse) {
  return {
    x: reverse ? x * cos + y * sin : x * cos - y * sin,
    y: reverse ? y * cos - x * sin : y * cos + x * sin,
  };
}

// Colisão com os pinos
function checkCollision(disco, pino) {
  var dx = pino.x - disco.x,
    dy = pino.y - disco.y,
    dist = Math.sqrt(dx * dx + dy * dy);
  //collision handling code here
  if (dist < disco.radius + pino.radius) {
    //calculate angle, sine, and cosine
    var angle = Math.atan2(dy, dx);
    if (angle === Math.PI / 2) angle += (Math.random() + 0.01) / 10;

    var sin = Math.sin(angle),
      cos = Math.cos(angle),
      //rotate disco's position
      pos = { x: 0, y: 0 }, //point
      //rotate disco's velocity
      vel = rotate(disco.vx, disco.vy, sin, cos, true);
    //collision reaction
    vel.x = ((disco.mass - pino.mass) * vel.x) / (disco.mass + pino.mass);
    //update position
    pos.x += vel.x * 5;
    //rotate positions back
    var posF = rotate(pos.x, pos.y, sin, cos, false);
    //adjust positions to actual screen positions
    disco.x = disco.x + posF.x;
    disco.y = disco.y + posF.y;
    //rotate velocities back
    var velF = rotate(vel.x, vel.y, sin, cos, false);
    disco.vx = velF.x;
    disco.vy = velF.y;
  }
}

// Colisão com divisórias
function checkCollisionDivisorias(disco, divisoria) {
  var dx = divisoria.x + divisoria.largura / 2 - disco.x,
    dy = divisoria.y - disco.y,
    dist = Math.sqrt(dx * dx + dy * dy);
  //collision handling code here
  if (dist < disco.radius + divisoria.largura / 2) {
    //calculate angle, sine, and cosine
    var angle = Math.atan2(dy, dx);
    if (angle === Math.PI / 2) angle += (Math.random() + 0.01) / 10;
    var sin = Math.sin(angle),
      cos = Math.cos(angle),
      //rotate disco's position
      pos = { x: 0, y: 0 }, //point
      //rotate disco's velocity
      vel = rotate(disco.vx, disco.vy, sin, cos, true);
    //collision reaction
    vel.x =
      ((disco.mass - divisoria.mass) * vel.x) / (disco.mass + divisoria.mass);
    //update position
    pos.x += vel.x;
    //rotate positions back
    var posF = rotate(pos.x, pos.y, sin, cos, false);
    //adjust positions to actual screen positions
    disco.x = disco.x + posF.x;
    disco.y = disco.y + posF.y;
    //rotate velocities back
    var velF = rotate(vel.x, vel.y, sin, cos, false);
    disco.vx = velF.x;
    disco.vy = velF.y;
  }

  var divisoriaBounds = divisoria.getBounds();
  var dx1 = divisoriaBounds.x - disco.x;
  var dx2 = divisoriaBounds.width - disco.x;
  if (dx1 < disco.radius && disco.y > divisoriaBounds.y) {
    disco.vx *= bounce;
  } else if (dx2 < disco.radius && disco.y > divisoriaBounds.y) {
    disco.vx *= bounce;
  }
}

// Colisão com tabelas
function checkCollisionTabelas(disco, tabela) {
  let tabelaBounds = tabela.getBounds();
  var dx = tabela.largura,
    dy = tabela.altura / 2;
  if (
    (disco.x - disco.radius > tabelaBounds.x &&
      disco.x - disco.radius < tabelaBounds.width) ||
    (disco.x + disco.radius > tabelaBounds.x - 30 &&
      disco.x + disco.radius < tabelaBounds.width)
  ) {
    // //get angle, sine, and cosine
    var angle = Math.atan2(dy, dx);
    if (tabela.posicao === -1) {
      angle = -angle;
    }
    var cos = Math.cos(angle),
      sin = Math.sin(angle),
      //get position of disco, relative to tabela
      x1 = disco.x - tabela.x,
      y1 = disco.y - tabela.y,
      //rotate coordinates
      y2 = cos * y1 - sin * x1,
      //rotate velocity
      vy1 = cos * disco.vy - sin * disco.vx;
    //perform bounce with rotated values
    if (y2 > -disco.radius && y2 < vy1) {
      //rotate coordinates
      var x2 = cos * x1 + sin * y1,
        //rotate velocity
        vx1 = cos * disco.vx + sin * disco.vy;
      if (disco.y > tabela.y + tabela.altura / 2) {
        x2 += Math.PI;
        vx1 += Math.PI;
      }
      y2 = -disco.radius;
      vy1 *= bounce;
      //rotate everything back
      x1 = cos * x2 - sin * y2;
      y1 = cos * y2 + sin * x2;
      disco.vx = cos * vx1 - sin * vy1;
      disco.vy = cos * vy1 + sin * vx1;
      disco.x = tabela.x + x1;
      disco.y = tabela.y + y1;
    }
  }
}

// Deteta limites do tabuleiro e faz ricochete
function checkBoundaries() {
  let left = tabuleiroBounds.x,
    right = tabuleiroBounds.width,
    top = 0,
    bottom = tabuleiroBounds.height;

  disco.vy += gravity;
  disco.x += disco.vx;
  disco.y += disco.vy;
  //boundary detect and bounce
  if (disco.x + disco.radius > right) {
    disco.x = right - disco.radius;
    disco.vx *= bounce;
  } else if (disco.x - disco.radius < left) {
    disco.x = left + disco.radius;
    disco.vx *= bounce;
  }
  if (disco.y + disco.radius > bottom) {
    disco.y = bottom - disco.radius;
    disco.vy *= bounce;
  } else if (disco.y - disco.radius < top) {
    disco.y = top + disco.radius;
    disco.vy *= bounce;
  }
}

// Animação
(function drawFrame() {
  window.requestAnimationFrame(drawFrame, canvas);
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (!isMouseDown) checkBoundaries();

  drawTabuleiro(tabuleiro);
  gavetas.forEach(drawGavetas);
  divisorias.forEach(drawDivisorias);
  tabelas.forEach(drawTabelas);
  pinos.forEach(drawPinos);
  drawPontuacao(pontuacao);
  drawTexto(texto);
  drawRegras(regras);
  drawDisco(disco);
})();

canvas.addEventListener(
  "mousedown",
  function () {
    var areaUtil = { x: cx - largura / 2, y: 0, width: largura, height: 80 };
    if (utils.containsPoint(disco.getBounds(), mouse.x, mouse.y)) {
      isMouseDown = true;
      disco.vx = disco.vy = 0;
      canvas.addEventListener("mouseup", onMouseUp, false);
      canvas.addEventListener("mousemove", onMouseMove, false);
    }
  },
  false
);

function onMouseUp() {
  isMouseDown = false;
  canvas.removeEventListener("mouseup", onMouseUp, false);
  canvas.removeEventListener("mousemove", onMouseMove, false);
}

function onMouseMove(event) {
  if (
    mouse.x < tabuleiroBounds.width - disco.radius &&
    mouse.x > tabuleiroBounds.x + disco.radius
  )
    disco.x = mouse.x;
  if (mouse.y < 80 - disco.radius && mouse.y > disco.radius + 10)
    disco.y = mouse.y;
}
