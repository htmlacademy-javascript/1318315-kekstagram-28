import {createArrayPicture} from './rendering-photo.js';
import {showFullsizePhoto} from './fullsize-photo-open.js';
import {createPopupSuccess, createPopupError} from './popups.js';
import {toCreateClosePopupSuccessEventListeners, toCreateClosePopupErrorEventListeners} from './popup-close.js';
import {toDeleteClosePopupSuccessEventListeners, toDeleteClosePopupErrorEventListeners} from './remove-event-listeners.js';
import { toCloseForm } from './form-upload-img-close.js';

const textErrorLoad = 'Произошла ошибка загрузки страницы с сервера';

// Загрузка данных с удаленного сервера
const sectionPictures = (Object) => createArrayPicture(Object);

fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((miniatures) => {
    sectionPictures(miniatures);
    showFullsizePhoto();
  })
  .catch(() => {
    alert(`${textErrorLoad}`); // Как показать ошибку загрузки страницы не Алертом ??? Самой создать и стили написать ???
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
      // Скрыть "Загружаем..." document.body.append(createLoadForm());
      document.querySelector('.img-upload__message').remove();

      // Показывается окно из template #success
      document.body.append(createPopupSuccess());
      toCreateClosePopupSuccessEventListeners();
      toCloseForm();

      // Если в DOM удалили PopupSuccess, нажалие на кнопку, то нуддно удалить обработчики
      if (!document.body.contains(document.querySelector('.success'))) {
        toDeleteClosePopupSuccessEventListeners();
      }
    })
    .catch(() => {
      // Скрыть "Загружаем..." document.body.append(createLoadForm());
      document.querySelector('.img-upload__message').remove();

      // Показывается окно из template #error
      document.body.append(createPopupError());
      toCreateClosePopupErrorEventListeners();

      // Если в DOM удалили PopupError, нажалие на кнопку, то нуддно удалить обработчики
      if (!document.body.contains(document.querySelector('.error'))) {
        toDeleteClosePopupErrorEventListeners();
      }
    });
};

export {submitDataFormToServer};
