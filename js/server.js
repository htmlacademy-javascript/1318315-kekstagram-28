import {createArrayPicture} from './rendering-photo.js';
import {showFullsizePhoto} from './fullsize-photo.js';
import {showPopupErrorLoad, createPopupError, createPopupSuccess, createPopupErrorLoad} from './popups.js';
import {toCloseForm} from './form-upload-img.js';

const body = document.querySelector('body');

// Загрузка данных с удаленного сервера
const sectionPictures = (Object) => createArrayPicture(Object);

fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((miniatures) => {
    sectionPictures(miniatures);
    showFullsizePhoto(miniatures);
  })
  .catch(() => {
    // Показ окна про ошибку загрузки страницы с миниатюрами с сервера на 5 сек.
    body.append(createPopupErrorLoad());
    showPopupErrorLoad();
  });

// Отправка данных формы на сервер
const submitDataFormToServer = (data) => {
  fetch(
    'https://28.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: data,
    })
    .then(() => {
      // Скрыть "Загружаем..."
      body.querySelector('.img-upload__message').remove();

      // Показывается окно из template #success
      body.append(createPopupSuccess());

      toCloseForm(); // Закрытие формы
    })
    .catch(() => {
      // Скрыть "Загружаем..."
      body.querySelector('.img-upload__message').remove();

      // Показывается окно из template #error
      body.append(createPopupError());
    });
};

export {submitDataFormToServer};
