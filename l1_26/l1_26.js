// элемент с которого будем начинать искать родительские элементы
const span = document.querySelector('span');

// функция которая принимает на вход дочерний элемент
function getAllParent(child) {
    // находим родителя
    const parent = child.parentNode;
    // передаем в консоль
    console.log(`Это блок ${child.tagName} я нахожусь в блоке ${parent.tagName}`);
    // запускаем функцию еще раз но уже для родителя
    getAllParent(parent);
}

// конструкция для того чтобы функция закончила свое выполнение после ошибки
try {
    getAllParent(span);
} catch {
    console.log("Больше родительских блоков нет")
}



