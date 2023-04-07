import {isEscKeydown} from './utils.js';
import {SHOW_TIME} from './utils.js';

const textPopupErrorHead = 'Ошибка загрузки файла';
const textPopupErrorButton = 'Попробовать ещё раз';
const textPopupSuccessHead = 'Изображение успешно загружено';
const textPopupSuccessButton = 'Круто!';
const textPopupLoadForm = 'Загружаем...';
const textErrorLoad = 'Произошла ошибка загрузки страницы с сервера. Проверьте соединение с интернетом и перезагрузите страницу.';

const body = document.querySelector('body');

// const popupError = document.querySelector('.error');
// const buttonPopupError = popupError.querySelector('.error__button');
// const popupSuccess = document.querySelector('.success');
// const buttonPopupSuccess = popupSuccess.querySelector('.success__button');
// console.log(buttonPopupSuccess);

// СОЗДАНИЕ ИНФОРМАЦИОННЫХ ОКОН, В ПРОЦЕССЕ СВЯЗИ С СЕРВЕРОМ И РЕЗУЛЬТАТ СВЯЗИ С СЕРВЕРОМ

// Окно, которое показывается в случае ошибки отправки формы
const createPopupError = () => {
  const documentFragment = document.createDocumentFragment();

  const popup = document.createElement('section');
  popup.classList.add('error');
  // popup.classList.add('hidden');

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
  // popup.classList.add('hidden');

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
  // popup.classList.add('hidden');
  popup.textContent = textPopupLoadForm;

  documentFragment.appendChild(popup);

  return documentFragment;
};

// Окно ошибки загрузки данных с сервера
const createPopupErrorLoad = () => {
  const documentFragment = document.createDocumentFragment();

  const popup = document.createElement('section');
  popup.classList.add('load');
  // popup.classList.add('hidden');

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
// body.append(createPopupError());
// body.append(createPopupSuccess());
// body.append(createPopupLoadingForm());
// body.append(createPopupErrorLoad());

// "Навешиваем" обработчики событий на созданные окна
toCreatePopupErrorEventListeners();
toCreatePopupSuccessEventListeners();


// ЗАКРЫТИЕ ИНФОРМАЦИОННЫХ ОКОН

// Закрываем окно createPopupError, которое показывается при ошибке отправления данных из формы
const toHidePopupError = () => {
  const popupError = body.querySelector('.error');
  body.remove(popupError);
};

const toHideToEscPopupError = (evt) => {
  if (isEscKeydown(evt)) {
    evt.preventDefault();
    toHidePopupError();
  }
};

// Обработчики событий окна createPopupError
function toCreatePopupErrorEventListeners(button) {
  button.addEventListener('click', toHidePopupError());
  document.addEventListener('keydown', toHideToEscPopupError());
  document.addEventListener('click', toHidePopupError());
} // Удалять "Обработчики событий окна createPopupError" не нужно, т.к. при удалении блока <section class="error"> из DOM навешанные обработчики также удаляются

// Закрываем окно createPopupSuccess, которое показывается при успешной отправке формы
const toHidePopupSuccess = () => {
  const popupSuccess = body.querySelector('.success');
  body.remove(popupSuccess);
};

const toHideToEscPopupSuccess = (evt) => {
  if (isEscKeydown(evt)) {
    evt.preventDefault();
    toHidePopupSuccess();
  }
};

// Обработчики событий окна createPopupSuccess
function toCreatePopupSuccessEventListeners(button) {
  button.addEventListener('click', toHidePopupSuccess());
  document.addEventListener('keydown', toHideToEscPopupSuccess());
  document.addEventListener('click', toHidePopupSuccess());
}
// Удалять "Обработчики событий окна createPopupSuccess" не нужно, т.к. при удалении блока <section class="success"> из DOM навешанные обработчики также удаляются


//  Функция, чтобы удалить отрисованное/показанное окно createPopupErrorLoad, спустя какое-то время, после его отрисовки/показа
const showPopupErrorLoad = () => {
  setTimeout(() => {
    document.querySelector('.load').classList.add('hidden');
  }, SHOW_TIME);
};

export {createPopupError, createPopupSuccess, createPopupLoadingForm, createPopupErrorLoad, showPopupErrorLoad, toCreatePopupErrorEventListeners, toCreatePopupSuccessEventListeners};
