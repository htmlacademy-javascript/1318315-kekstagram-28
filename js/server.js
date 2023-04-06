import {createArrayPicture} from './rendering-photo.js';
import {showFullsizePhoto} from './fullsize-photo.js';
import {showPopupErrorLoad} from './popups.js';
// import {toCreateClosePopupSuccessEventListeners, toCreateClosePopupErrorEventListeners} from './popup-close.js';
// import {toDeleteClosePopupSuccessEventListeners, toDeleteClosePopupErrorEventListeners} from './remove-event-listeners.js';
import {toCloseForm} from './form-upload-img-close.js';

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
    document.querySelector('.load').classList.remove('hidden');
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
      document.querySelector('.img-upload__message').classList.add('hidden');

      // Показывается окно из template #success
      document.querySelector('.success').classList.remove('hidden');
      // toCreateClosePopupSuccessEventListeners();
      toCloseForm(); // Закрытие формы

      // Если в DOM удалили PopupSuccess, нажалие на кнопку, то нужно удалить обработчики
      // if (!document.body.contains(document.querySelector('.success'))) {
      //   toDeleteClosePopupSuccessEventListeners();
      // }
    })
    .catch(() => {
      // Скрыть "Загружаем..."
      document.querySelector('.img-upload__message').classList.add('hidden');

      // Показывается окно из template #error
      document.querySelector('.error').classList.remove('hidden');
      // toCreateClosePopupErrorEventListeners();

      // Если в DOM удалили PopupError, нажатие на кнопку, то нуддно удалить обработчики
      // if (!document.body.contains(document.querySelector('.error'))) {
      //   toDeleteClosePopupErrorEventListeners();
      // }
    });
};

export {submitDataFormToServer};
