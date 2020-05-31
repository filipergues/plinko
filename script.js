var canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d");

const somar = (a, b) => {
  return a + b;
};

const multiplicar = (a, b) => {
  let operando1 = a;
  let operando2 = b;
  let multiplicacao = operando1 * operando2;
  return multiplicacao;
};

console.log(somar(7, 4));
console.log(multiplicar(7, 4));
