import {isEscKeydown} from './utils.js';
import {body} from './fullsize-photo.js';

const popupSuccess = document.querySelector('.success');
const popupError = document.querySelector('.error');
const popupErrorLoad = document.querySelector('.load');

const buttonPopupSuccess = document.querySelector('.success__button');
const buttonPopupError = document.querySelector('.error__button');
const buttonPopupErrorLoad = document.querySelector('.load__button');

// Закрываем окно createPopupError, которое показывается при успешной отправке формы
const removePopupError = () => popupError.classList.add('hidden');

const removeToEscPopupError = (evt) => {
  if (isEscKeydown) {
    evt.preventDefault();
    removePopupError();
  }
};

const toCreateClosePopupErrorEventListeners = () => {

  buttonPopupError.addEventListener('click', removePopupError());
  document.addEventListener('keydown', removeToEscPopupError());
  body.addEventListener('click', removePopupError());
};

// Закрываем окно createPopupSuccess, которое показывается при успешной отправке формы
const removePopupSuccess = () => popupSuccess.classList.add('hidden');

const removeToEscPopupSuccess = (evt) => {
  if (isEscKeydown) {
    evt.preventDefault();
    removePopupSuccess();
  }
};

const toCreateClosePopupSuccessEventListeners = () => {
  buttonPopupSuccess.addEventListener('click', removePopupSuccess());
  document.addEventListener('keydown', removeToEscPopupSuccess());
  body.addEventListener('click', removePopupSuccess());
};

// Закрываем окно popupErrorLoad, которое показывается при ошибке загрузки миниатюр с сервера на страницу
const removePopupErrorLoad = () => popupErrorLoad.classList.add('hidden');

const removeToEscPopupErrorLoad = (evt) => {
  if (isEscKeydown) {
    evt.preventDefault();
    removePopupErrorLoad();
  }
};

const toCreateClosePopupErrorLoadEventListeners = () => {
  buttonPopupErrorLoad.addEventListener('click', removePopupErrorLoad());
  document.addEventListener('keydown', removeToEscPopupErrorLoad());
  body.addEventListener('click', removePopupErrorLoad());
};

// ??? Где нужно удалить обработчики событий 9 шт.

export {toCreateClosePopupSuccessEventListeners, toCreateClosePopupErrorEventListeners, toCreateClosePopupErrorLoadEventListeners, buttonPopupSuccess, removePopupSuccess, removeToEscPopupSuccess, buttonPopupError, removePopupError, removeToEscPopupError, buttonPopupErrorLoad, removePopupErrorLoad, removeToEscPopupErrorLoad};
