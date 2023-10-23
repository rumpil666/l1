const arrayObj = [
  { name: 'John', age: 30 },
  { name: 'Ivan', age: 18 },
  { name: 'Bill', age: 28 },
  { name: 'John', age: 26 },
  { name: 'Igor', age: 23 },
  { name: 'Lyba', age: 22 },
  { name: 'Kate', age: 19 },
  { name: 'John', age: 25 },
  { name: 'Bill', age: 40 },
  { name: 'Adam', age: 40 },
];

// Функция сортировки принимает объект для сортировки
const arraySort = (array) => {
  // С помощью метода sort сортируем массив, логика сортировки записывается в функцию
  // сравниваем два элемента массива сначала по возрасту, потом если возраст одинаковый сравниваем по строке имени
  return array.sort(function (a, b) {
    if (a.age > b.age) {
      return 1;
    }
    if (a.age < b.age) {
      return -1;
    }
    if (a.age === b.age) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    }
  })
}

console.log(arraySort(arrayObj))