import {createPictures} from './rendering-photo.js';
import {initPictures} from './fullsize-photo.js';
import {onCloseElementToCloseForm} from './form-upload-img.js';
import {showTimeoutPopupErrorLoad, createPopupError, createPopupSuccess, createPopupErrorLoad} from './popups.js';
import {hideFilters, showTimeoutFilters} from './filters.js';

const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const buttonSubmitFormElement = formElement.querySelector('.img-upload__submit');

// Запрос к серверу для получения данных/миниатюр
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
    .then((response) => {
      buttonSubmitFormElement.removeAttribute('disabled'); // Разблокируем кнопку отправки формы "Опубликовать" - делаем ее активной
      bodyElement.querySelector('.img-upload__message').remove(); // Скрыть "Загружаем..."
      if (response.ok) { // Проверяем статус ответа сервера - Ок - значит
        bodyElement.append(createPopupSuccess()); // показываем окно из template #success
        onCloseElementToCloseForm(); // и закрываем форму
      } else {
        bodyElement.append(createPopupError()); // Показывается окно из template #error
      }
    })
    .catch(() => {
      buttonSubmitFormElement.removeAttribute('disabled'); // Разблокируем кнопку отправки формы "Опубликовать" - делаем ее активной
      bodyElement.querySelector('.img-upload__message').remove(); // Скрыть "Загружаем..."
      bodyElement.append(createPopupError()); // Показывается окно из template #error
    });
};

export {submitDataFormToServer};
