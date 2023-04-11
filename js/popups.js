import {isEscKeydown} from './utils.js';

const SHOW_TIME = 5000;

const textPopupErrorHead = 'Ошибка загрузки файла';
const textPopupErrorButton = 'Попробовать ещё раз';
const textPopupSuccessHead = 'Изображение успешно загружено';
const textPopupSuccessButton = 'Круто!';
const textPopupLoadForm = 'Загружаем...';
const textPopupErrorLoad = 'Произошла ошибка загрузки страницы с сервера. Проверьте соединение с интернетом и перезагрузите страницу.';
const textPopupErrorFile = 'Данный файл не может быть открыт, выберите, пожалуйста, другой!';

const body = document.querySelector('body');


// СОЗДАНИЕ ИНФОРМАЦИОННЫХ ОКОН, В ПРОЦЕССЕ СВЯЗИ С СЕРВЕРОМ И РЕЗУЛЬТАТ СВЯЗИ С СЕРВЕРОМ

// Окно, которое показывается в случае ошибки отправки формы
const createPopupError = () => {
  const documentFragment = document.createDocumentFragment();

  const popup = document.createElement('section');
  popup.classList.add('error');

  const popupInside = document.createElement('div');
  popupInside.classList.add('error__inner');

  const popupHead = document.createElement('h2');
  popupHead.classList.add('error__title');
  popupHead.textContent = textPopupErrorHead;

  const popupButton = document.createElement('button');
  popupButton.classList.add('error__button');
  popupButton.setAttribute('type','button');
  popupButton.textContent = textPopupErrorButton;

  documentFragment.appendChild(popup);
  popup.appendChild(popupInside);
  popupInside.appendChild(popupHead);
  popupInside.appendChild(popupButton);

  popupButton.onclick = function () {
    popup.remove();
  };

  document.body.onkeydown = function (evt) {
    if (isEscKeydown(evt)) {
      popup.remove();
    }
  };

  document.body.onclick = function () {
    popup.remove();
  };

  return documentFragment;
};

// Окно, которое показывается при успешной отправке формы
const createPopupSuccess = () => {
  const documentFragment = document.createDocumentFragment();

  const popup = document.createElement('section');
  popup.classList.add('success');

  const popupInside = document.createElement('div');
  popupInside.classList.add('success__inner');

  const popupHead = document.createElement('h2');
  popupHead.classList.add('success__title');
  popupHead.textContent = textPopupSuccessHead;

  const popupButton = document.createElement('button');
  popupButton.classList.add('success__button');
  popupButton.setAttribute('type','button');
  popupButton.textContent = textPopupSuccessButton;

  documentFragment.appendChild(popup);
  popup.appendChild(popupInside);
  popupInside.appendChild(popupHead);
  popupInside.appendChild(popupButton);

  popupButton.onclick = function () {
    popup.remove();
  };

  document.body.onkeydown = function (evt) {
    if (isEscKeydown(evt)) {
      popup.remove();
    }
  };

  document.body.onclick = function () {
    popup.remove();
  };

  return documentFragment;
};

// Окно ("Загружаем..."), которое показывается в процессе загрузки фанных формы на сервер
const createPopupLoadingForm = () => {
  const documentFragment = document.createDocumentFragment();

  const popup = document.createElement('section');
  popup.classList.add('img-upload__message');
  popup.classList.add('img-upload__message--loading');
  popup.textContent = textPopupLoadForm;

  documentFragment.appendChild(popup);

  return documentFragment;
};

// Окно ошибки загрузки данных с сервера
const createPopupErrorLoad = () => {
  const documentFragment = document.createDocumentFragment();

  const popup = document.createElement('section');
  popup.classList.add('error-load');

  const popupInside = document.createElement('div');
  popupInside.classList.add('error-load__inner');

  const popupText = document.createElement('h2');
  popupText.classList.add('error-load__title');
  popupText.textContent = textPopupErrorLoad;

  documentFragment.appendChild(popup);
  popup.appendChild(popupInside);
  popupInside.appendChild(popupText);

  return documentFragment;
};

// Окно ошибки загрузки файла пользователя
const createPopupErrorFile = () => {
  const documentFragment = document.createDocumentFragment();

  const popup = document.createElement('section');
  popup.classList.add('error-file');

  const popupInside = document.createElement('div');
  popupInside.classList.add('error-file__inner');

  const popupText = document.createElement('h2');
  popupText.classList.add('error-file__title');
  popupText.textContent = textPopupErrorFile;

  documentFragment.appendChild(popup);
  popup.appendChild(popupInside);
  popupInside.appendChild(popupText);

  return documentFragment;
};

// Функция-шаблон/конструктор, которая удаляет элементы DOM с задержкой по времени
const ShowTimeoutResult = (className) => {
  setTimeout(() => {
    body.querySelector(`${className}`).remove();
  }, SHOW_TIME);
};

//  Функция, чтобы удалить отрисованное/показанное окно createPopupErrorLoad, спустя какое-то время, после его отрисовки/показа
const showTimeoutPopupErrorLoad = () => {
  ShowTimeoutResult('.error-load');
};

//  Функция, чтобы удалить отрисованное/показанное окно createPopupErrorFile, спустя какое-то время, после его отрисовки/показа
const showTimeoutPopupErrorFile = () => {
  ShowTimeoutResult('.error-file');
};

export {createPopupError, createPopupSuccess, createPopupLoadingForm, createPopupErrorLoad, createPopupErrorFile, showTimeoutPopupErrorLoad, showTimeoutPopupErrorFile};
