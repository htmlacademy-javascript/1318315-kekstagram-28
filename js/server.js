import {createArrayPicture} from './rendering-photo.js';
import {drawFullsizePhoto} from './fullsize-photo.js';
import {createPopupSuccess, createPopupError, createLoadForm} from './popups.js';

const textErrorLoad = 'Произошла ошибка загрузки страницы с сервера';

// Загрузка данных с удаленного сервера
const sectionPictures = (Object) => createArrayPicture(Object);

fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((miniatures) => {
    sectionPictures(miniatures);

    const photos = Array.from(document.querySelectorAll('.picture'));

    photos.forEach((photo) => {
      photo.addEventListener('click', (evt) => {
        console.log(evt.currentTarget);
        drawFullsizePhoto(photo[evt.currentTarget.dataset.id]); // photo должно браться из массива photos, который мы находим на странице, после отрисовки данных с сервера
      });
    });
  })
  .catch((err) => {
    alert(`${textErrorLoad}`); // `${textErrorLoad}`
  });

// Отправка данных формы на сервер
const submitDataFormToServer = (data) => {
  fetch(
    'https://28.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: data,
    })
    .then(() => { // Форма закрывается, ее поля обнуляются // Показывается окно из template #success
      // Скрыть "Загружаем..." showLoadForm
      document.querySelector('.img-upload__message').remove(); // удаляем document.body.append(createLoadForm());

      // Показывается окно из template #success
      document.body.append(createPopupSuccess());
    })
    .catch(() => {
      // Скрыть "Загружаем..." showLoadForm
      document.querySelector('.img-upload__message').remove(); // удаляем document.body.append(createLoadForm());

      // Показывается окно из template #error
      document.body.append(createPopupError());
    });
};

export {submitDataFormToServer};
