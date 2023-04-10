import {createArrayPicture} from './rendering-photo.js';
import {initPictures} from './fullsize-photo.js';
import {showTimeoutPopupErrorLoad, createPopupError, createPopupSuccess, createPopupErrorLoad} from './popups.js';
import {toCloseForm} from './form-upload-img.js';
import {showTimeoutFilters} from './filters.js';

const body = document.querySelector('body');

fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((miniatures) => {
    createArrayPicture(miniatures);
    initPictures(miniatures);
  })
  .catch(() => {
    // Показ окна про ошибку загрузки страницы с миниатюрами с сервера на 5 сек.
    body.append(createPopupErrorLoad());
    showTimeoutPopupErrorLoad();
  })
  .then(() => {
    // ЗДЕСЬ КОД ДОЛЖЕН ВЫПОЛНЯТЬСЯ ПОСЛЕДОВАТЕЛЬНО - ТОЛЬКО ПОСЛЕ ЗАВЕРШЕНИЯ ОТРИСОВКИ МИНИАТЮР НА СТРАНИЦЕ ДОЛЖЛНЫ ПОЯВИТЬСЯ КНОПКИ ФИЛЬТРОВ !!!
    showTimeoutFilters();
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
