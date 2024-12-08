function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function numStr(a, b) {
  a = '' + a;
  b = b || ' ';
  var c = '',
      d = 0;
  while (a.match(/^0[0-9]/)) {
    a = a.substr(1);
  }
  for (var i = a.length-1; i >= 0; i--) {
    c = (d !== 0 && d % 3 === 0) ? a[i] + b + c : a[i] + c;
    d++;
  }
  return c;
} 

function integer_formator(number) {
  return numStr(number, " ")
}

export function Calcul (number1, number2, operation, result) {
    this.number1 = number1;
    this.number2 = number2;
    this.operation = operation
    this.result= result
    this.response_message = `La réponse était ${this.result}`
} 
Calcul.prototype.check_result = function (proposal) {
    return this.result === parseInt(proposal)
};

/* ----------- Multiplication ---------------------*/
export function Multiply(number1, number2) {
  const operation =   `${integer_formator(number1)} x ${integer_formator(number2)} = `
  const result=number1*number2;
    
  Calcul.call(this, number1, number2, operation, result);
}
Multiply.prototype = Object.create(Calcul.prototype);

export function CarreXNumbers(puissance) {
  const number1 = getRandomInt(10**puissance);
  Multiply.call(this, number1, number1);
  this.operation =   `${integer_formator(number1)}² = `
  
}
CarreXNumbers.prototype = Object.create(Multiply.prototype);
export function Carre2Numbers() {
  const puissance = 2
  CarreXNumbers.call(this,puissance);
}
Carre2Numbers.prototype = Object.create(Multiply.prototype);


export function MultiplyXNumbers(puissance) {
  const number1 = getRandomInt(10**puissance);
  const number2 = getRandomInt(10**puissance);
  Multiply.call(this, number1, number2);
}
MultiplyXNumbers.prototype = Object.create(Multiply.prototype);



export function Multiply2Numbers() {
  const puissance = 2
  MultiplyXNumbers.call(this,puissance);
}
Multiply2Numbers.prototype = Object.create(MultiplyXNumbers.prototype);

export function Multiply3Numbers() {
  const puissance = 3
  MultiplyXNumbers.call(this,puissance);
  this.label = "Multiplication à 3 chiffres"
}
Multiply3Numbers.prototype = Object.create(MultiplyXNumbers.prototype);

/* ------------------ Addition --------------------*/
export function Add(number1, number2) {
  const operation =   `${integer_formator(number1)} + ${integer_formator(number2)} = `
  const result=number1+number2;
    
  Calcul.call(this, number1, number2, operation, result);
}
Add.prototype = Object.create(Calcul.prototype);

export function AddXNumbers(puissance) {
  const number1 = getRandomInt(10**puissance);
  const number2 = getRandomInt(10**puissance);
  Add.call(this, number1, number2);
}
AddXNumbers.prototype = Object.create(Add.prototype);

export function Add6Numbers() {
  const puissance = 6
  AddXNumbers.call(this,puissance);
}
Add6Numbers.prototype = Object.create(AddXNumbers.prototype);

/* ------------------ Soustraction --------------------*/
export function Sub(number1, number2) {
  const operation =   `${number1} - ${number2} = `
  const result=number1-number2;
    
  Calcul.call(this, number1, number2, operation, result);
}
Sub.prototype = Object.create(Calcul.prototype);

export function SubXNumbers(puissance) {
  const number1 = getRandomInt(10**puissance);
  const number2 = getRandomInt(number1);
  Sub.call(this, number1, number2);
}
SubXNumbers.prototype = Object.create(Sub.prototype);

export function Sub6Numbers() {
  const puissance = 6
  SubXNumbers.call(this,puissance);
}
Sub6Numbers.prototype = Object.create(SubXNumbers.prototype);



export const TYPES_CALCUL_AVAILABLES = {
  "carre2": {label:"Carré à 2 chiffres", calcul: Carre2Numbers },
  "x2": {label:"Multiplication à 2 chiffres", calcul: Multiply2Numbers },
  "x3": {label:"Multiplication à 3 chiffres", calcul: Multiply3Numbers },
  "+6": {label:"Addition à 6 chiffres", calcul: Add6Numbers },
  "-6": {label:"Soustraction à 6 chiffres", calcul: Sub6Numbers },
  
}