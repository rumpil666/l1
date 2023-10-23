const checkPolindrom = (str) => {
  // Сначала получим строку без пробелов и символов. Если в строку нужно будет добавить еще цифры то в регулярное выражение нужжно добававить еще 0-9 после ё
  const getStr = str.replace(/[^A-Za-zА-Яа-яЁё]/g, "");
  // Получим перевернутую строку с помощью reverse. Метод работает с масивами, поэтому сначала split получаем массив символов, делаем реверс а потом получаем строку с помощью join
  const reversStr = getStr.split("").reverse().join("");
  return reversStr === getStr;
};

console.log(checkPolindrom('аргентина манит негра'))//true