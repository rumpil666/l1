// выбрали контейнер куда будем добавлять новый элемент
const container = document.querySelector('.container');

// функция котора добавляет новый элемент на страницу
function addItem(elem) {
    container.append(elem)
}
// функция с помощью которой мы создаем новый элемент и сразу его добавляем на страницу с помощью функции addItem
function addNewElement() {
    // создание нового текстового блока h1
    const textBlock = document.createElement('h1');
    // записываем текст в блок
    textBlock.textContent = "Меня создали с помощью функции addNewElement()";
    // задаем цвет текста
    textBlock.style.color = '#8b00ff'
    // задаем цвет бэкграунда
    textBlock.style.backgroundColor = '#ff0000'
    // записываем элемент в DOM
    addItem(textBlock);
}

addNewElement()