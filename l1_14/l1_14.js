// создаем функцию которая принимает ссылку
function setImg(img_url) {
  // Возвращаем промис
  return new Promise((resolve, reject) => {
    // промис создаем картинку и записывает в src ссылку
    const image = document.createElement('img')
    image.src = img_url;
    // если промис успешно создан, в ресолве передаем то что он нам передаст в резулт
    image.onload = function () {
      resolve({
        url: image.src,
        width: image.width,
        height: image.height,
        alt: `${image.alt ? image.alt : 'Описания нет'}`
      })
    }
    // если не успешно он возвращет нам ошибку
    image.onerror = function (err) {
      reject(err)
    }

  })
}
// вызываем функци с сслкой
setImg('https://rugger.info/upload/photos/inpho_02351410.jpg')
  // если все прошло успешно нам в консоли придет объект с данными о картинки
  .then((result) => console.log(result))
  // если ошибка то в консоли выдаст ошибку которую мы написали
  .catch(() => console.log('Ошибка загрузки'))
