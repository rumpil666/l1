// найдем в дом инпут и спан
const input = document.querySelector('.input');
const span = document.querySelector('.text');

// создадим функцию которая будет показывать ошибку. На вход она должна принимать текст ошибки
function showError(textError) {
    // изменяем стиль текста инпута и спана на красный, а в текст спана будем передавать текст ошибки
    input.classList.add('text--error');
    span.classList.add('text--error');
    span.textContent = textError;
}
// функция которая скрывает ошибку если все отвалидированно нормально
function hideError() {
    input.classList.remove('text--error');
    span.classList.remove('text--error');
    span.textContent = '';
}

// валидация ошибок. Каждый if проверяется по очереди и если условие выполнено то сработает функция showError, в которую передаст текст ошибки
function checkForError() {
    if (input.value.match(/[А-Яа-яёЁ]/)) {
        return showError('Пароль должен состоять из латинских букв');
    }
    if (input.value.match(/[\s]/)) {
        return showError('Нельзя использовать пробелы');
    }
    if (input.value.length < 8) {
        return showError('Слишкм короткий пароль');
    }
    if (input.value.match(/[A-Z]/) === null) {
        return showError('В пароле отсутствует заглавная буква');
    }
    if (input.value.match(/[a-z]/) === null) {
        return showError('В пароле отсутствует строчная буква');
    }
    if (input.value.match(/[0-9]/) === null) {
        return showError('В пароле отсутствует цифра');
    }
    if (input.value.match(/[^0-9a-zA-Z\s]/) === null) {
        return showError('В пароле отсутствуют спец.символы');
    }
    hideError();
}

//навешиваем на инпут слушатель события инпут. Теперь при каждом изменении валуе и инпута будет проверяться введенный пароль
input.addEventListener('input', () => {
    checkForError();
})