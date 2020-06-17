var botaoInicio = document.getElementById("iniciar");
var botaoRepor = document.getElementById("repor");

// Clicar no botão para iniciar o jogo
botaoInicio.onclick = function (e) {
  gravity = 0.2;
};

// Clicar no botão para repor o disco à sua posição original
botaoRepor.onclick = function (e) {
  gravity = 0;
  disco.x = cx;
  disco.y = 45;
  disco.vx = 0;
  disco.vy = 0;
  pontuacao.pontos = 0;
};
