// кнопка закрытия поапа
const closeBtn = document.querySelector('.popup__close');
// элемент попап
const popup = document.querySelector('.popup');
// форма сохранения
const form = document.forms.form;
// поля попапа
const popupLName = document.querySelector('.popup__lname')
const popupFName = document.querySelector('.popup__fname')

// обработчик клика по кнопке закрытия
closeBtn.addEventListener('click', () => {
  popup.classList.remove('popup__opened')
});

// обработчик клика по субмиту
form.addEventListener('submit', (e) => {
  // эта команда предотвращает перезагрузку страницы
  e.preventDefault();
  // Передаем значения ипутов формы в попап
  popupLName.textContent = form.lname.value;
  popupFName.textContent = form.fname.value;
  // открываем попап
  popup.classList.add('popup__opened');
})

