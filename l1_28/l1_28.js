// найдем место куда будем вставлять наш новый элемент полученный с помощью шаблона
const container = document.querySelector('.container');

// с помощью этой функции кланируем шаблон
function getTemplates() {
    const element = document
        .querySelector('#template')
        .content
        .querySelector('.item')
        .cloneNode(true)
    return element;
}

// с помощью этой функии будем заполнять склонированный элемент новыми данными из передоваемой информации в функцию
function newElement(data) {
    // создаем новый элемент из клонируемого
    const element = getTemplates();
    // получаем селекторы которые находятся уже в новом элемнте 
    const fname = element.querySelector('.fname');
    const lname = element.querySelector('.lname');
    // fname.style.color = "";
    fname.textContent = data.fname;
    lname.textContent = data.lname;

    //возвращаем наш новый элемент
    return element;
}

// создадим функцию которая будет добавлять новый элемент
function addElement(elem) {
    container.append(elem);
}

// содадим объект из которого возьмем нужную нам информацию
const author = {
    fname: 'Anton',
    lname: 'Mashkov'
}

// И наконец создадим наш новый элемент с помощью нашего шаблона
addElement(newElement(author));


