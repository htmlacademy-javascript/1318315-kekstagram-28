import {isEscKeydown} from './utils.js';
import {SHOW_TIME} from './utils.js';

const textPopupErrorHead = 'Ошибка загрузки файла';
const textPopupErrorButton = 'Попробовать ещё раз';
const textPopupSuccessHead = 'Изображение успешно загружено';
const textPopupSuccessButton = 'Круто!';
const textPopupLoadForm = 'Загружаем...';
const textErrorLoad = 'Произошла ошибка загрузки страницы с сервера. Проверьте соединение с интернетом и перезагрузите страницу.';

const body = document.querySelector('body');

const popupError = document.querySelector('.error');
const buttonPopupError = document.querySelector('.error__button');
const popupSuccess = document.querySelector('.success');
const buttonPopupSuccess = document.querySelector('.success__button');


// СОЗДАНИЕ ИНФОРМАЦИОННЫХ ОКОН, В ПРОЦЕССЕ СВЯЗИ С СЕРВЕРОМ И РЕЗУЛЬТАТ СВЯЗИ С СЕРВЕРОМ

// Окно, которое показывается в случае ошибки отправки формы
const createPopupError = () => {
  const documentFragment = document.createDocumentFragment();

  const popup = document.createElement('section');
  popup.classList.add('error');
  popup.classList.add('hidden');

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

  return documentFragment;
};

// Окно, которое показывается при успешной отправке формы
const createPopupSuccess = () => {
  const documentFragment = document.createDocumentFragment();

  const popup = document.createElement('section');
  popup.classList.add('success');
  popup.classList.add('hidden');

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

  return documentFragment;
};

// Окно ("Загружаем..."), которое показывается в процессе загрузки фанных формы на сервер
const createPopupLoadingForm = () => {
  const documentFragment = document.createDocumentFragment();

  const popup = document.createElement('section');
  popup.classList.add('img-upload__message');
  popup.classList.add('img-upload__message--loading');
  popup.classList.add('hidden');
  popup.textContent = textPopupLoadForm;

  documentFragment.appendChild(popup);

  return documentFragment;
};

// Окно ошибки загрузки данных с сервера
const createPopupErrorLoad = () => {
  const documentFragment = document.createDocumentFragment();

  const popup = document.createElement('section');
  popup.classList.add('load');
  popup.classList.add('hidden');

  const popupInside = document.createElement('div');
  popupInside.classList.add('load__inner');

  const popupText = document.createElement('h2');
  popupText.classList.add('load__title');
  popupText.textContent = textErrorLoad;

  documentFragment.appendChild(popup);
  popup.appendChild(popupInside);
  popupInside.appendChild(popupText);

  return documentFragment;
};

// Отрисовка окон в DOM
body.append(createPopupError());
body.append(createPopupSuccess());
body.append(createPopupLoadingForm());
body.append(createPopupErrorLoad());

// "Навешиваем" обработчики событий на созданные окна
toCreatePopupErrorEventListeners();
toCreatePopupSuccessEventListeners();


// ЗАКРЫТИЕ ИНФОРМАЦИОННЫХ ОКОН

// Закрываем окно createPopupError, которое показывается при ошибке отправления данных из формы
const toHidePopupError = () => {
  popupError.classList.add('hidden');
  toDeletePopupErrorEventListeners();
};

const toHideToEscPopupError = (evt) => {
  if (isEscKeydown) {
    evt.preventDefault();
    toHidePopupError();
  }
};

// Обработчики событий окна createPopupError
function toCreatePopupErrorEventListeners() {
  buttonPopupError.addEventListener('click', toHidePopupError());
  document.addEventListener('keydown', toHideToEscPopupError());
  body.addEventListener('click', toHidePopupError());
}

function toDeletePopupErrorEventListeners() {
  buttonPopupError.removeEventListener('click', toHidePopupError());
  document.removeEventListener('keydown', toHideToEscPopupError());
  body.removeEventListener('click', toHidePopupError());
}

// Закрываем окно createPopupSuccess, которое показывается при успешной отправке формы
const toHidePopupSuccess = () => {
  popupSuccess.classList.add('hidden');
  toDeletePopupSuccessEventListeners();
};

const toHideToEscPopupSuccess = (evt) => {
  if (isEscKeydown) {
    evt.preventDefault();
    toHidePopupSuccess();
  }
};

// Обработчики событий окна createPopupSuccess
function toCreatePopupSuccessEventListeners() {
  buttonPopupSuccess.addEventListener('click', toHidePopupSuccess());
  document.addEventListener('keydown', toHideToEscPopupSuccess());
  body.addEventListener('click', toHidePopupSuccess());
}

function toDeletePopupSuccessEventListeners() {
  buttonPopupSuccess.removeEventListener('click', toHidePopupSuccess());
  document.removeEventListener('keydown', toHideToEscPopupSuccess());
  body.removeEventListener('click', toHidePopupSuccess());
}

//  Функция, чтобы удалить отрисованное/показанное окно createPopupErrorLoad, спустя какое-то время, после его отрисовки/показа
const showPopupErrorLoad = () => {
  setTimeout(() => {
    document.querySelector('.load').classList.add('hidden');
  }, SHOW_TIME);
};

export {showPopupErrorLoad};
