var botaoInicio = document.getElementById("iniciar");
var botaoRepor = document.getElementById("repor");

botaoInicio.onclick = function (e) {
  gravity = 0.2;
};

botaoRepor.onclick = function (e) {
  gravity = 0;
  disco.x = cx;
  disco.y = 45;
  disco.vx = 0;
  disco.vy = 0;
};
