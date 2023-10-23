import { getText } from './utils/Api.js'
// Найдем контэйнер куда будем вставлять новые элементы
const container = document.getElementById('container');
const minusButton = document.querySelector('.minus');
const plusButton = document.querySelector('.plus');
const numStr = document.querySelector('.number');
const buttonSort = document.querySelectorAll('.sort');
let arrItemInfo;
let nameColumn = '';
let minColumn = true;

//Скопируем шаблон элемента"
function getTemplates() {
  const product = document
    .querySelector('#template')
    .content
    .querySelector('.item')
    .cloneNode(true);
  return product;
}

// сделаем метод по которому у нас будет заполняться балванка
function generatePost(data) {
  const element = getTemplates();
  // Находим у макета каждый текстовый блок
  const fname = element.querySelector('.fname');
  const lname = element.querySelector('.lname');
  const tel = element.querySelector('.tel');
  const address = element.querySelector('.address');
  const city = element.querySelector('.city');
  const state= element.querySelector('.state');
  const zip = element.querySelector('.zip');

  // Записываем в title текст поста
  fname.textContent = data.fname;
  lname.textContent = data.lname;
  tel.textContent = data.tel;
  address.textContent = data.address;
  city.textContent = data.city;
  state.textContent = data.state;
  zip.textContent = data.zip;

  return element;
}

// Создадим метод добавления новых постов на страницу который будет
// на вход принимать элемент и добавлять его в наш контейнер
function addItem(element) {
  container.append(element);
}

function renderItems(data) {
  data.forEach(item => {
      addItem(generatePost(item));
  });
}
// метод для пагинации который принимает номер страницы и возвращает список по строкам на этих страницах
function paginacia(arr, str) {
  return arr.slice((str-1)*50, str*50)
}

function getArr() {
  getText()
  .then((res) => {
  
    if (arrItemInfo === undefined) {
      console.log('я выполнена')
      arrItemInfo = res;
    }
    const sortArr = arraySort(arrItemInfo, nameColumn);
    renderItems(paginacia(sortArr, Number(numStr.textContent)));
  })
}

getArr();

  //  функция тротл для защиты от дебоунсинга. Чтобы при скроле фнкция подгрузки онформации срабатывала не сразу а через заданное нами время
function throttle(callee, timeout) {
  let timer;

  return function perform(...args) {
    if (timer) return

    timer = setTimeout(() => {
      callee(...args)

      clearTimeout(timer)
      timer = null
    }, timeout)
  }
}

// использую функию сортировки из 6 задачи добавив на вход вторую переменную, столбец по кторому надо сортировать
const arraySort = (array, key) => {
return array.sort(function(a,b) {
  if (minColumn === false) {
  if (a[key] > b[key]) {
    return 1;
  } 
  if (a[key] < b[key]) {
    return -1;
  }
  if (a[key] === b[key]) {
    if (a.zip > b.zip) {
      return 1;
    }
    if (a.zip < b.zip) {
      return -1;
    } 
    return 0;
  }
  } else {
    if (a[key] < b[key]) {
      return 1;
    } 
    if (a[key] > b[key]) {
      return -1;
    }
    if (a[key] === b[key]) {
      if (a.zip < b.zip) {
        return 1;
      }
      if (a.zip > b.zip) {
        return -1;
      } 
      return 0;
    }
  }
})
}


// функция которая помогает определить соритируемую колонку
function setNameColumn(e) {
  // записываем в переменную которую передаем в arraySort айди нужного столбца
  nameColumn = `${e.target.id}`;
  // добавляем элементу класс обозначающий что колонка отсартированна по мин или по макс
  const button = document.querySelector(`#${e.target.id}`);
  button.classList.toggle(`${e.target.id}--sort__min`);
  if (document.querySelector(`.${e.target.id}--sort__min`) !== null) {
    minColumn = true;
  } else {
    minColumn = false
  }
}

// всем кнопкам сортировки добавляем слушатель которы работает с помощью event.targeta
buttonSort.forEach(button => button.addEventListener('click', throttle((e) => {
  // задаем параметры сортировки
  setNameColumn(e);
  // очищаем контеййнер чтобы у нас внутри было не больше 50
  container.innerHTML = '';
  // записываем информацию
  getArr();
}, 250)))

//дизэйблим минус на 1
function disabledMinus() {
  if (numStr.textContent == 1) {
    minusButton.setAttribute('disabled', 'disabled');
  }
}
//дизэйблим плюс на 20
function disabledPlus() {
  if (numStr.textContent == 20) {
    plusButton.setAttribute('disabled', 'disabled');
  }
}

// добавляем кнопке минус слушатель клика который отвечает за пагинацию
minusButton.addEventListener('click', throttle(() => {
  plusButton.removeAttribute('disabled')
  container.innerHTML = '';
  numStr.textContent = Number(numStr.textContent) - 1;
  disabledMinus();
  getArr();
}, 250))
// добавляем кнопке плюс слушатель клика который отвечает за пагинацию
plusButton.addEventListener('click',  throttle(() => {
  minusButton.removeAttribute('disabled')
  container.innerHTML = '';
  numStr.textContent = Number(numStr.textContent) + 1;
  disabledPlus();
  getArr();
}, 250))

disabledMinus();
disabledPlus();