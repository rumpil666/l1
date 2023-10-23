//Для тестирования необходимо со странице перейти по ссылке Авторизация в ВК и авторизоваться
//Решение представленно для задачи 19 и 20.
// переменная хранящая объем локалсторадж
let sizeLocalStorage;
// создам функцию которая бы заполняла автоматически локал сторадж для подсчета вместимости
function getSizeLocalStorage() {
  let totalSize = 0;
  let size = 0;
  // на значении 764856 выскакивает ошибка, которая нам и говорит что локалсторадж переполнена
  try {
  for (let i = 1; i <= 1000000; i++) {
    localStorage.setItem(`${i}`, 'i');
    // тут мы вычисляем размер каждой ячейки из расчета что каждый символ занимает 2кб
    size = ((localStorage[i].length + `${i}`.length) * 2)
    totalSize = totalSize + size;
  }
  } catch {
    return Math.floor(totalSize / 1024);
  }
}

// посчитаем какой объем занят на текущий момент

// console.log(localStorage.getItem())

function getBusySizeLocalStorage() {
  let totalSize = 0;

  totalSize = (((localStorage.getItem('response').length) * 2) + ((localStorage.getItem('sizeLocalStorage').length) * 2) + ((localStorage.getItem('offset').length) * 2));
  return `${Math.floor(totalSize / 1024)}/${sizeLocalStorage}KB`;
}






// Найдем контэйнер куда будем вставлять новый посты
const container = document.getElementById('container');
//Скопируем шаблон поста
function getTemplates() {
    const product = document
      .querySelector('#vk-post')
      .content
      .querySelector('.item')
      .cloneNode(true);
    return product;
  }

// сделаем метод по которому у нас будет заполняться балванка
function generatePost(data) {
    const element = getTemplates();
    // Находим у макета поста текстовый блок и картинку
    const image = element.querySelector('.img');
    const title = element.querySelector('.text');

    // Если у поста в вк есть фото то берем его и записываем
    if (data.attachments[0].photo) {
        image.src = data.attachments[0].photo.sizes[3].url
    } else if (data.attachments[0].video) {
        image.src = data.attachments[0].video.image[3].url
    }

    // Записываем в title текст поста
    title.textContent = data.text;
    
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

// Создадим метод записи в локал сторадж используя синтаксис try catch 
// для отлавливания ошибки переполнения локал сторадж
function setLocalStorage(newData) {
  // исполняем код в try
  try {
    // если в локалсторадже что то уже есть то запишем к имеющимся данным
    if (localStorage.getItem('response')) {
      const response = JSON.parse(localStorage.getItem('response'));

      localStorage.setItem('response', JSON.stringify([...response, ...newData]))
    } else {
      // если еще ничего нет то просто записываем в локалсторадж
      localStorage.setItem('response', JSON.stringify(newData))
    }
    // Если хранилище переполнено то нам выдаст ошибку и тогда отработает catch, если
    // try отработает нормально то функция просто закончит свое действие
  } catch {
    // нужно очистить то что у нас записано вначале локал сторадж и после этого только записать
    // для этого нам сначала нужно получить объект а не строку, так как из объекта удаляем целое количество 
    const response = JSON.parse(localStorage.getItem('response'));
    // теперь удалим 20% хранилища из начала
    const newResponse = response.slice(Math.floor(data.length/100*20));
    // записываем в получившийся массив новые данные
    localStorage.setItem('response', JSON.stringify([...newResponse, ...newData]))
  }
}


// количество постов подгружаемое c сервера
let count = 5;
// с какого поста подгружать
let offset;
// записываем offset с локал сторадж чтобы при обновлении страницы иформация о постах загружалась 
// с сервера и нам не подгружались старые посты по второму кругу
if (localStorage.getItem('offset')) {
  offset = localStorage.getItem('offset');
} else {
  offset = 0;
}
localStorage.setItem('offset', offset)
// Получаем токен из ссылки
const token = window.location.hash.split("=")[1].split("&")[0];

const getPost = () =>
 VK.Api.call('wall.get', {
    owner_id: -30602036,
    domain: 'igm',
    count: count,
    offset: Number(localStorage.getItem('offset')),
    access_token: token,
    v: 5.154
    }, (res) => {

        offset = offset + count;
        localStorage.setItem('offset', offset)
        //записываем информацию в локалсторадж
        setLocalStorage(res.response.items)
        // Покажем пользователю сколько места занято
        console.log(getBusySizeLocalStorage())
        renderItems(res.response.items)
        //отрисовываем посты
    }
)

function checkPosition() {
    // Находим высоту окна и высоту всего блока 
    const height = container.offsetHeight;
    const screenHeight = container.scrollHeight;
  
  
    // переменная для записи того сколько было проскроленно
    const scrolled = container.scrollTop;
    
    //устанавливаем порог при котором у нас должна возникать загрузка нового содержимого 
    const threshold = screenHeight - screenHeight / 4
  
    // Находим местоположение скрола относительно низа страницы
    const position = scrolled + height;
  
    // если местоположение скрола больше порога прорисовки то отсылаем метод получения новых карточек
    if (position >= threshold) {
      getPost();
    }
  }

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

  // при первом запуске сайта информаию загружаем или с локалсторадж если она там есть или с сайта
  if(JSON.parse(localStorage.getItem('response'))) {
    renderItems(JSON.parse(localStorage.getItem('response')))
    offset = Number(localStorage.getItem('offset'));
    sizeLocalStorage = localStorage.getItem('sizeLocalStorage');
    // Покажем пользователю сколько места занято
    console.log(getBusySizeLocalStorage())
  } else {
    // если локалсторадж пуст то сначала посчитаем какую же память занимают он у пользователя
    sizeLocalStorage = getSizeLocalStorage();
    // очистим локал сторадж от ненужной нам более информации
    localStorage.clear();
    localStorage.setItem('sizeLocalStorage', sizeLocalStorage)
    getPost();
  }
  // обработчики срабатвающие при скроле
  ;(() => {
    container.addEventListener('scroll', throttle(checkPosition, 1000))
    container.addEventListener('resize', throttle(checkPosition, 1000))
  })()
