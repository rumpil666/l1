let i = 0;
let j = 0;
document.open()
const test = () => {
  let testing = document.write();
  // создаем цикл который  записывает document.write() внутри document.write()
  for (i; i < 10000001; i++) {
    console.log(i)
    testing = document.write(document.write(testing));
  }
  document.close()
  console.log(i)
}

// эта конструкция должна остановить код если мы получим какую то ошибку
try {
  test();
} catch {
  document.close()
  console.log(i);
}

//выполнив код выше можно сделать вывод что вызов document.write внутри document.write ограничен только памятью, потому что браузер через какое то время перезагружает страницу из-за нехватки памяти
// в старых статьях писалось что вызов document.write() внутри document.write() ограничен примерно 20. Но сейчас я могу сделать вывод что ограничения сняты