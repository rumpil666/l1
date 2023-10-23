// Выполняем установку старонней библиотеки Moment.js c помощью команды npm i moment
// После этого импортируем библиотеку в проект
import moment from 'moment';
// Экспортируем функцию, после этого ее можно будет импортритовать и использовать из любого другого блока
export default class dateModule {
  // Получаем текущую дату
  getCurrentDate() {
    return moment().format('DD.MM.YYYY')
  }
  // Получаем текущую дату
  getEnterDate(day, month, year) {
    if (!(day && month && year)) return console.log('Неверный формат');
    return moment(`${day}-${month}-${year}`, 'DD-MM-YYYY').format('DD.MM.YYYY')
  }
  // Получаем текущий день
  getDay() {
    return moment().format('DD')
  }

  // Получаем день недели по дате
  getDayWeek(day, month, year) {
    const days = moment(`${day}-${month}-${year}`, 'DD-MM-YYYY').day();
    if (days === 1) return "Понедельник"
    if (days === 2) return "Вторник"
    if (days === 3) return "Среда"
    if (days === 4) return "Четверг"
    if (days === 5) return "Пятница"
    if (days === 6) return "Суббота"
    if (days === 7) return "Воскресенье"
  }
}


const dates = new dateModule();

console.log(dates.getDayWeek(12, 3, 2024));