import {CreatePictures} from './rendering-photo.js';
import {initPictures} from './fullsize-photo.js';
import {showTimeoutPopupErrorLoad, createPopupError, createPopupSuccess, createPopupErrorLoad} from './popups.js';
import {onCloseForm} from './form-upload-img.js';
import {hideFilters, showTimeoutFilters} from './filters.js';

const body = document.querySelector('body');

fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((miniatures) => {
    CreatePictures(miniatures);
    initPictures(miniatures);
  })
  .then(() => {
    // ЗДЕСЬ КОД ДОЛЖЕН ВЫПОЛНЯТЬСЯ ПОСЛЕДОВАТЕЛЬНО - ТОЛЬКО ПОСЛЕ ЗАВЕРШЕНИЯ ОТРИСОВКИ МИНИАТЮР НА СТРАНИЦЕ ДОЛЖЛНЫ ПОЯВИТЬСЯ КНОПКИ ФИЛЬТРОВ !!!
    // Делаю дополнительную задержку по времени для визуального эффекта
    showTimeoutFilters();
  })
  .catch(() => {
    // Показ окна про ошибку загрузки страницы с миниатюрами с сервера на 5 сек.
    body.append(createPopupErrorLoad());
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
      body.querySelector('.img-upload__message').remove(); // Скрыть "Загружаем..."
      body.append(createPopupSuccess()); // Показывается окно из template #success
      onCloseForm(); // Закрытие формы
    })
    .catch(() => {
      body.querySelector('.img-upload__message').remove(); // Скрыть "Загружаем..."
      body.append(createPopupError()); // Показывается окно из template #error
    });
};

export {submitDataFormToServer};
