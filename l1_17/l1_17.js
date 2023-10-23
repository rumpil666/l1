// Добавляем метод SuggestView
const input = document.querySelector('#address')

ymaps.ready(() => {
  const suggestView = new ymaps.SuggestView("address");
})