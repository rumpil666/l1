function setName() {
  // переменная внутри внутренней функции
  let firstName = 'Boris';
  //возвращаем функцию у которой есть доступ к внешней функции
  return function () {
    console.log(firstName);
  }
}
// записываем внутреннюю функцию
let userName = setName();
// вызываем ее
let firstName = 'Yarik';
userName(); // Boris

function plusNumber() {
  // переменная внутри внутренней функции
  let number = 0;
  //возвращаем функцию у которой есть доступ к внешней функции
  return function () {
    let add = number + 10;
    return add;
  }
}
// записываем внутреннюю функцию
let plus = plusNumber();
// вызываем ее
console.log(plus()); // 10


