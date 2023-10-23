const array_of_functions = [
  function () { console.log('Один') },
  function () { console.log('Два') },
  function () { console.log('Три') },
  function () { console.log('Четыре') }
]

const calFunction = (arr) => {
  //   с помощью forEach перебираем массив поэлементно. Каждый элемент вызывается, а уже потом цикл оттрабатывает следующий элемент
  arr.forEach((elem, i) => {
    elem(), console.log(`Выполнена ${i + 1} функция`);
  })
}
calFunction(array_of_functions);
