// создать объект можно двумя способами const book = new Object; или const book = {}, я выьеру второй способ чтобы сразу записать необходимые нам ключ значения
const book = {
  name: 'Gore ot yma',
  author: 'Griboedov',
  year: 1825
}

//получить свойства можно с помощью
console.log(book.name)
//перезаписать свойства можно с помощью
book.name = "Voina i mir"
console.log(book.name)// Voina i mir
// Так же можно получить свойства с помощью []
console.log(book['name'])
