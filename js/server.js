import {createPictures} from './rendering-photo.js';
import {initPictures} from './fullsize-photo.js';
import {showTimeoutPopupErrorLoad, createPopupError, createPopupSuccess, createPopupErrorLoad} from './popups.js';
import {onCloseToCloseForm} from './form-upload-img.js';
import {hideFilters, showTimeoutFilters} from './filters.js';

const bodyElement = document.querySelector('body');

fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((miniatures) => {
    createPictures(miniatures);
    initPictures(miniatures);
  })
  .then(() => {
    // ЗДЕСЬ КОД ДОЛЖЕН ВЫПОЛНЯТЬСЯ ПОСЛЕДОВАТЕЛЬНО - ТОЛЬКО ПОСЛЕ ЗАВЕРШЕНИЯ ОТРИСОВКИ МИНИАТЮР НА СТРАНИЦЕ ДОЛЖЛНЫ ПОЯВИТЬСЯ КНОПКИ ФИЛЬТРОВ !!!
    // Делаю дополнительную задержку по времени для визуального эффекта
    showTimeoutFilters();
  })
  .catch(() => {
    // Показ окна про ошибку загрузки страницы с миниатюрами с сервера на 5 сек.
    bodyElement.append(createPopupErrorLoad());
    showTimeoutPopupErrorLoad();
    hideFilters(); // Скрываю кнопки фильтров
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
      bodyElement.querySelector('.img-upload__message').remove(); // Скрыть "Загружаем..."
      bodyElement.append(createPopupSuccess()); // Показывается окно из template #success
      onCloseToCloseForm(); // Закрытие формы
    })
    .catch(() => {
      bodyElement.querySelector('.img-upload__message').remove(); // Скрыть "Загружаем..."
      bodyElement.append(createPopupError()); // Показывается окно из template #error
    });
};

export {submitDataFormToServer};
