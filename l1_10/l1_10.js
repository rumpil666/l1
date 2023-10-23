const test =
  '{"kjhjk":"lk,jlk", "sdf":"sdf", "sdfdsf":["asd", "asd"], "asdd": {"asd":9, "sadf":true, "asda":"asdd"}}';

const JSONParse = (str) => {
  // 
  let isValid = true;

  const validation = (string) => {
    let stroke = string.trim();
    let typeStr = '';
    if (stroke === "") {
      return (isValid = false);
    } else if (stroke.at(0) === "{" && stroke.at(-1) === "}") {
      return (typeStr = "object");
    } else if (stroke.at(0) === "[" && stroke.at(-1) === "]") {
      return (typeStr = "array");
    } else if (stroke.at(0) === '"' && stroke.at(-1) === '"') {
      if (stroke.match(/"/g).length > 2) {
        return (isValid = false);
      }
      return (typeStr = "string");
    } else if (stroke === "true" || stroke === "false") {
      return (typeStr = "boolean");
    } else if (stroke.match(/^\d+$/)) {
      return (typeStr = "number");
    } else {
      isValid = false;
    }
  };

  // проверка на то является ли передаваемое значение объектом
  const isObject = (value) => {
    const typeStr = validation(value);
    return typeStr === "object";
  };

    // проверка на то является ли передаваемое значение массивом
  const isArray = (value) => {
    const typeStr = validation(value);
    return typeStr === "array";
  };

  // проверка на то является ли передаваемое значение строкой
  const isString = (value) => {
    return value === "string";
  };

  // проверка на то является ли передаваемое значение числом
  const isNumber = (value) => {
    return value === "number";
  };

  // проверка на то является ли передаваемое значение логической переменной
  const isBoolean = (value) => {
    return value === "boolean";
  };

  // проверка на то является ли передаваемое значение строкой, числом или логической переменной
  const simpleDataType = (value) => {
    const typeStr = validation(value);
    return isString(typeStr) || isBoolean(typeStr) || isNumber(typeStr);
  };

  // если значение является строкой, числом или логической переменной убираем все каычки и возвращаем
  if (simpleDataType(str) && isValid) {
    const newStr = str.trim().replace(/"/g, "");
    return newStr;
  }

  // если переменная является массивом, то переберем каждое его значение и вернем массив
  if (isArray(str) && isValid) {
    // Получаем строку без пробелов вначале и конце строки, и без квадратных скобок
    const newStr = str.trim().substring(1, str.length - 1);
    // Получим массив
    const arr = newStr.split(
      /,(?![^(\[{]*[\)\]\}])(?=(?:(?:[^"]*"){2})*[^"]*$)/
    );
    // Уберем все пробелы вначале и в конце строки
    const arrTrim = arr.map((elem) => {
      return elem.trim();
    });

    // переберем получившийся массив и вернем готовый результат(запишем его в другой массив)
    const newArr = arrTrim.map((elem) => {
      return JSONParse(elem);
    });

    // если в массиве есть undefiened значит валидация прошла не успешно и собщим об этом
    if (newArr.includes(undefined)) {
      return console.log('Не верный формат JSON')
    }

    // если все хорошо вернем массив
    return newArr;
  }

  // функция проверяет наличие ключей равных undefiened
  function checkUndefiend(obj) {
    return Object.keys(obj).find(key => obj[key] === undefined)
  }

 // если переменная является объктом, то переберем каждое его значение и вернем объект
  if (isObject(str) && isValid) {
    let obj = {};
    // убираем пробелы в начале и в конце
    const newStr = str.trim().substring(1, str.length - 1);
    // получим массив с ключ-значениями объекта
    const arr = newStr.split(
      /,(?![^(\[{]*[\)\]\}])(?=(?:(?:[^"]*"){2})*[^"]*$)/
    );

    // переберем каждый элемент массива и получим объект
    arr.map((elem) => {
      const objElement = elem
        .trim()
        .split(/:(?![^(\[{]*[\)\]\}])(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      obj[JSONParse(objElement[0].trim())] = JSONParse(objElement[1].trim());
    });


    // проверим содержит ли объект undefiened, если содержит то сообщим пользователю что строка JSON не валидна
    if (obj.undefined) {
      return console.log('Не верный формат JSON')
    } 
    else if (checkUndefiend(obj) !== undefined ) {
      return console.log('Не верный формат JSON')
    }

    // возвращаем объект если все хорошо
    return obj;
  }
};

JSONParse(test)
console.log(JSONParse(test));
// console.log(JSON.parse(test));
