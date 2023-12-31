let i = 0;
let j = 0;
const func = () => {
    i++;
    func();
}

try {
    func();
} catch (e) {
    console.log(i);
}

const func2 = () => {
    j++;
    let a = j + 1;
    let b = a + 1;
    let c = b + 1;
    func2()
}

try {
    func2();
} catch (e) {
    console.log(j);
}

//Получив количество вызово  двух функций мы можем посчитать сколько памяти уходит на вызов(N) пустой функции func
// N * i = N * j + (три раза вводим цифровую переменную let a, b, c) * (количество места которое занимает цифровая переменная) * j
// N * 13941 = N * 10455 + 3 * 8 * 10455;
// получим что размер который занимает вызов пустой функции в колстеке равен N = (24*j)/(i-j)

function sizeOneEmtyColl() {
    return (24 * j) / (i - j)
}

const er = sizeOneEmtyColl();

// чтобы найти размер колстек просто умноаем на i, столько раз мы смогли вызвать пустую функцию
console.log(`${Math.floor(sizeOneEmtyColl() * i)} байт`)
// Раззмер call stack:
// яндекс = 1003680 байт = около 1мб
// Chrome = 1003632 байт = около 1мб
// Firefox = у firefox постоянно меняется и не зависит от размера которую занимает функция. Но в среднем вызывается около 31000. могу предпложить что выделенно памяти не более 3мб
// Opera = 1003344 байт = около 1 мб
// Microsoft Edge = 1005000 байт = около 1 мб
