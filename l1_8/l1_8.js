const array_of_functions = [
  function () { return 1 },
  function () { return 'Два' },
  function () { return [1, 2, 3, 4] },
  function () { return 'Четыре' }
]

const getAllResultFunction = (arr) => {
  //   с помощью map перебираем массив поэлементно. Каждый элемент вызывается и результат его выполнения записываем в новый массив.

  return function () {
    return arr.map((elem) => {
      elem();
    })
  }()
}

console.log(getAllResultFunction(array_of_functions));
