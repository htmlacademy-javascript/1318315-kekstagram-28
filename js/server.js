import {createArrayPicture} from './rendering-photo.js';
import {showFullsizePhoto} from './fullsize-photo.js';
import {createPopupError, createPopupSuccess, createPopupErrorLoad, showPopupErrorLoad, toCreatePopupErrorEventListeners, toCreatePopupSuccessEventListeners} from './popups.js';
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
      const message = body.querySelector('.img-upload__message');
      body.remove(message);

      // Показывается окно из template #success
      body.append(createPopupSuccess());
      const button = body.querySelector('.success__button');
      toCreatePopupSuccessEventListeners(button);

      // Закрываем форму
      toCloseForm();
    })
    .catch(() => {
      // Скрыть "Загружаем..."
      const message = body.querySelector('.img-upload__message');
      body.remove(message);

      // Показывается окно из template #error
      const popupError = createPopupError();
      body.append(popupError);
      console.log(popupError);

      // const button = body.querySelector('.error__button');
      // toCreatePopupErrorEventListeners(button);

    });
};

export {submitDataFormToServer};
