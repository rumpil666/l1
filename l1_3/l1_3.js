class MathX {
  getFib = (num) => {
    // Сразу обозначим два первых числа в ряду Фибоначчи для нахождения третьего
    let firstNum = 1;
    let twoNum = 1;
    // первое и второе число равно 1, поэтому возвращаем их
    if (num === 1 || num === 2) {
      return 1;
    } else {
      // если нам нужно 3 число Фибоначчи, можно найти его рекурсивно, 
      // но это займет много вычислительной памяти для больших выражений, поэтому я пользуюсь циклом
      for (let i = 3; i <= num; i++) {
        let c = firstNum + twoNum;
        firstNum = twoNum;
        twoNum = c;
      }
    } return twoNum;
  };

  // Для получения всех чисел Фибоначчи будем выполнять функцию getFib и найденные числа добавлять в массив
  getAllFib = (num) => {
    let allFibonachi = [];
    for (let i = 1; i <= num; i++) {
      allFibonachi.push(this.getFib(i));
    }
    return allFibonachi;
  };


  getPrimNum = (num) => {
    let countPrim = 0;
    let lastNumb = 0;

    // Добавим метку чтобы запускать с начала если нашли составное
    // countPrim содержит в себе порядковый номер найденного простого числа
    nextNumber:
    for (let i = 2; countPrim < num; i++) {
      // Чтобы уменьшить затрату ресурсов браузера сокращаем поиск введя limit. Так же лимит
      // можно ввести поделив число само на себя, а можно перебирать делители до самого числа, но в этом нет смысла
      // так как после половины числа i/2 при делении число не может быть целым.
      const limit = Math.sqrt(i);
      for (let j = 2; j <= limit; j++) {
        if (i % j === 0) continue nextNumber;
      }
      countPrim += 1;
      //Тут записываем найденное простое число, в конце цикла оно будет содержать необходимое нам простое число 
      lastNumb = i;
    }
    return lastNumb;
  }

  // Этот метод схож с предыдущим, только все найденые простые числа мы записываем в переменную
  getAllPrimNum = (num) => {
    let primNumb = [];

    nextNumber:
    for (let i = 2; i <= num; i++) {
      const limit = Math.sqrt(i);
      for (let j = 2; j <= limit; j++) {
        if (i % j === 0) continue nextNumber;
      }
      primNumb.push(i);
    }
    return primNumb;
  }
}

const mathX = new MathX();

console.log(mathX.getFib(6));
console.log(mathX.getAllFib(6));
console.log(mathX.getPrimNum(6));
console.log(mathX.getAllPrimNum(7));