import {isEscKeydown} from './utils.js';
import {body} from './fullsize-photo.js';

const PopupSuccess = document.querySelector('.success');
const PopupError = document.querySelector('.error');
const buttonPopupSuccess = document.querySelector('.success__button');
const buttonPopupError = document.querySelector('.error__button');

// Закрываем окно createPopupSuccess, которое показывается при успешной отправке формы
const removePopupSuccess = () => PopupSuccess.remove();

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

// Закрываем окно createPopupError, которое показывается при успешной отправке формы
const removePopupError = () => PopupError.remove();

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

// ??? Где нужно удалить обработчики событий 6 шт.(toDeleteClosePopupsEventListeners from remove-event-listener.js)

export {toCreateClosePopupSuccessEventListeners, toCreateClosePopupErrorEventListeners, buttonPopupSuccess, removePopupSuccess, removeToEscPopupSuccess, buttonPopupError, removePopupError, removeToEscPopupError};
