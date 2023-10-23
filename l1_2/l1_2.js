const checkStrangeNumber = (num) => {
  // Так как единица входит в делитель сразу ее вычтем
  let sum = num - 1;
  // Запускаем цикл которые будет выполняться пока число больше ноля, если равно
  //  нолю то число будет странным если нет то не странное
  for (let i = 2; sum > 1;) {
    // если делит на число без остатка то оно является делителем. Его мы вычитаем из введеного числа
    if (num % i === 0) {
      sum -= i;
      i++
    } else i++;
  }

  return sum === 0;
}

console.log(checkStrangeNumber(28)); //true
console.log(checkStrangeNumber(27)); //false
// Менее ресурсозатратный метод. При больших числах мы перебираем по формуле i*(2*i-1)
// стрпные числа можно найти по ней
const checkStrangeNumberTwo = (num) => {
  for (let i = 2; ;) {
    if ((i * (2 * i - 1)) === num) {
      return true;
    } else if ((i * (2 * i - 1)) > num) {
      return false;
    } else {
      i++;
    }
  }
}