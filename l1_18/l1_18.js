// перед каждым вызовом буду очищать локальное хранилище
localStorage.clear()
// создаю переменные которые хранят общий размер занимаемой памяти и размер памяти которую занимает ячейка в локалсторадж
let totalSize = 0;
let size = 0;
// создам функцию которая бы заполняла автоматически локал сторадж
function getSizeLocalStorage() {
  try {
    for (let i = 1; i <= 10000000; i++) {
      localStorage.setItem(`${i}`, `${i}`);
      // тут мы вычисляем размер каждой ячейки из расчета что каждый символ занимает 2кб
      size = ((localStorage[i].length + `${i}`.length) * 2)
      totalSize = totalSize + size;
    }
  } catch {
    console.log("Total = " + (totalSize / 1024) + " KB");
    // выясняем сколько же места у нас в локалсторадж
    // 10240 KB. Это 10 мб
  }
}
getSizeLocalStorage();