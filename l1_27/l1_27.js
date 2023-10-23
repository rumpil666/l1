const baal = document.querySelector('.img');

function animation({timing, draw, duration}) {
    // время прошедшее с начала действия анимации можно найти с помощью performance.now()
    let start = performance.now();

    //анимации в js лучше делать с втроенным методом requestAnimationFrame
    // он вызывает переданную в него функцию в тот момент кога браузер способен отрисоватьанимацию
    // ему хватает ресурсов на это
    requestAnimationFrame(function animate(time) {
        // задаем функцию timeFraction значения которой от 0 до 1. Она рассчитывает сколько прошло от начала запуска функции
        // текущее время time минус время запуска анимации start
        let timeFraction = (time - start) / duration;
        // если timeFraction больше единицы то зададим timeFraction 1 и функция выполнится последний раз
        if (timeFraction > 1) timeFraction = 1;
    
        // вычисление текущего состояния анимации
        let progress = timing(timeFraction);
        // отрисовать нашу анимацию в зависимости от текущего прогресса
        draw(progress); 
    
        // конструкция для рекурсивного повторения функции отрисовки анимации
        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }
    })
}

// задаем функцию которая принимает на вход прогресс(0 - 1)
// прогресс увеличивается со временем тем самым функция вызывается многократно и меняя позицию
function drawRight(progress) {
    baal.style.left = progress * 500 + 'px';
    baal.style.transform = `rotate(${progress*1300}deg)`
}

// эта функция у нас задает как будет меняться progress в зависимости от времени которое он принимает на вход
// в данном случае изменение будет плавное, линейное
function linear(timeFraction) {
    return timeFraction;
}

// здесь добавим обработчик клика на элемент после которого будет срабатывать наша анимация
baal.addEventListener('click', () => {
    console.log('asd')
    animation({timing: linear, draw: drawRight, duration: 2000});
})