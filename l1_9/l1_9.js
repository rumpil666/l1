//Создадим функцию которая на вход будет принимать любой объект

const JSONStringify = (obj) => {
    // Создадим функции которые бы принимали объект и проверяли его тип

    // про проверке на объект нам нужно узнать действительно ли он object, если да
    // то он может быть или массивом, поэтому исключаем это, либо null, поэтому проверку
    // ну null тоже включаем
    const isObject = (value) => {
        return typeof value === 'object' &&
            !Array.isArray(value) &&
            value !== null;
    }


    const isArray = (value) => {
        return typeof value === 'object' &&
            Array.isArray(value)
    }


    const isString = (value) => {
        return typeof value === 'string';
    }


    const isNumber = (value) => {
        return typeof value === 'number';
    }


    const isBoolean = (value) => {
        return typeof value === 'number';
    }

    // Вводим одну переменную для проверки простых типов данных
    const simpleDataType = (value) => {
        return isString(value) || isBoolean(value) || isNumber(value);
    }

    // Проверим является ли входной обект простым и если является
    //  то в зависимости от того строка это или нет поставим кавычки запишим как JSON строку
    if (simpleDataType(obj)) {
        const toggleQuotes = isString(obj) ? '"' : '';
        return `${toggleQuotes}${obj}${toggleQuotes}`
    };

    // Введем функцию которая будет удалять последнюю запятую у объекта или массива
    const removeLastComma = (str) => {
        // получаем массив разбитый посимвольно, чтобы потом удалить последний эллемент(запятую)
        const letterArr = str.split('');
        letterArr.pop();
        // собираем массив снова в строку
        return letterArr.join('')
    }

    if (isArray(obj)) {
        // Создадим переменную куда будем собирать массив поэлементно
        let arrStr = '';
        // переберем массив
        obj.forEach((elem) => {
            // Запишим в нашу строку новую строку, при этом рекурсивно проверив ее тип
            arrStr += JSONStringify(elem) + ','
        });
        // Возвращаем строку в квадратных скобках
        return '[' + removeLastComma(arrStr) + ']';
    }

    if (isObject(obj)) {
        // Создадим переменную куда будем собирать объект поэлементно
        let objStr = '';
        // Получим массив с ключами объекта
        const objKeyList = Object.keys(obj);
        // переберем массив c ключами
        objKeyList.forEach((key) => {
            // получим значение value для ключа
            const valueKey = obj[key];
            // соберем строку из ключ значения и value
            objStr += `"${key}":${JSONStringify(valueKey)},`
            // Запишим в нашу строку новую строку, при этом проверив ее тип
        });
        // Возвращаем строку в квадратных скобках
        return '{' + removeLastComma(objStr) + '}';
    }
};