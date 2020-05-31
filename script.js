var canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d");

const somar = (a, b) => {
  let operando1 = a;
  let operando2 = b;
  let soma = operando1 + operando2;
  return soma;
};

const multiplicar = (a, b) => {
  return a * b;
};

console.log(somar(7, 4));
console.log(multiplicar(7, 4));
