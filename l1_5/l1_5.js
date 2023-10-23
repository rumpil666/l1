const arrayObj = [
  { name: 'John', age: 30 },
  { name: 'Ivan', age: 18 },
  { name: 'Bill', age: 28 },
  { name: 'John', age: 26 },
  { name: 'Igor', age: 23 },
  { name: 'Lyba', age: 22 },
  { name: 'Kate', age: 19 },
  { name: 'John', age: 25 },
];

// Получим Json

const json = JSON.stringify(arrayObj);

// Создадим шаблон элемента связнаго списка в виде класса. Value - объект который хранит список, а next - ссылка на след объект

class LinkedListTemplate {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

// Создаем класс связного списка, который у нас содержать будет head - первый элемент в списке и tail - последний элемент.
// Так как мы только создаем то изначально они пустые null

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  //   создаем метод append который принимает данные и вставляет их в наш список
  append(value) {
    //     создадим Ноду с помощью нашего шаблона
    const newElem = new LinkedListTemplate(value);

    //     проверим содержит ли наш лист начало или конец
    if (!this.head && !this.tail) {
      this.head = newElem;
      this.tail = newElem;
      return this;
    }
    //Ссылка нашего прошлого хвоста смотрела на null, теперь же смотрит на наш новый элемент и потому что у нас появился новый элемент, то он уже становится нашим хвостом
    this.tail.next = newElem;
    this.tail = newElem
  }
  //   Метод который будет возвращать head со всеми вложенностями
  getList = () => {
    return this.head
  }
}


// Создаем функцию которая будет принимать json и возвращать односвязный список
const getLinkedListFromJson = (json) => {
  //Создадим лист
  const list = new LinkedList();
  //Преобразуем json декодируя его
  const jsonList = JSON.parse(json);
  //   Переберем весь массив объектов и запишем его в наш односвязный список
  jsonList.forEach((elem) => {
    list.append(elem);
  })
  //   Вернем получившийся список
  return list.getList();
}

console.log(getLinkedListFromJson(json))