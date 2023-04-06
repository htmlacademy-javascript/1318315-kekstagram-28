import {SHOW_TIME} from './utils.js';

const textPopupErrorHead = 'Ошибка загрузки файла';
const textPopupErrorButton = 'Попробовать ещё раз';
const textPopupSuccessHead = 'Изображение успешно загружено';
const textPopupSuccessButton = 'Круто!';
const textPopupLoadForm = 'Загружаем...';
const textErrorLoad = 'Произошла ошибка загрузки страницы с сервера. Проверьте соединение с интернетом и перезагрузите страницу.';

// Окно, которое показывается в случае ошибки отправки формы
const createPopupError = () => {
  const documentFragment = document.createDocumentFragment();

  const popupError = document.createElement('section');
  popupError.classList.add('error');
  popupError.classList.add('hidden');

  const popupInside = document.createElement('div');
  popupInside.classList.add('error__inner');

  const popupHead = document.createElement('h2');
  popupHead.classList.add('error__title');
  popupHead.textContent = textPopupErrorHead;

  const popupButton = document.createElement('button');
  popupButton.classList.add('error__button');
  popupButton.setAttribute('type','button');
  popupButton.textContent = textPopupErrorButton;

  documentFragment.appendChild(popupError);
  popupError.appendChild(popupInside);
  popupInside.appendChild(popupHead);
  popupInside.appendChild(popupButton);

  return documentFragment;
};

// Окно, которое показывается при успешной отправке формы
const createPopupSuccess = () => {
  const documentFragment = document.createDocumentFragment();

  const popupSuccess = document.createElement('section');
  popupSuccess.classList.add('success');
  popupSuccess.classList.add('hidden');

  const popupInside = document.createElement('div');
  popupInside.classList.add('success__inner');

  const popupHead = document.createElement('h2');
  popupHead.classList.add('success__title');
  popupHead.textContent = textPopupSuccessHead;

  const popupButton = document.createElement('button');
  popupButton.classList.add('success__button');
  popupButton.setAttribute('type','button');
  popupButton.textContent = textPopupSuccessButton;

  documentFragment.appendChild(popupSuccess);
  popupSuccess.appendChild(popupInside);
  popupInside.appendChild(popupHead);
  popupInside.appendChild(popupButton);

  return documentFragment;
};

// Окно (темплейт "Загружаем..."), которое показывается в процессе загрузки фанных формы на сервер
const createLoadForm = () => {
  const documentFragment = document.createDocumentFragment();

  const popupLoadForm = document.createElement('section');
  popupLoadForm.classList.add('img-upload__message');
  popupLoadForm.classList.add('img-upload__message--loading');
  popupLoadForm.classList.add('hidden');
  popupLoadForm.textContent = textPopupLoadForm;

  documentFragment.appendChild(popupLoadForm);

  return documentFragment;
};

const createErrorLoad = () => {
  const documentFragment = document.createDocumentFragment();

  const popupErrorLoad = document.createElement('section');
  popupErrorLoad.classList.add('load');
  // popupErrorLoad.classList.add('load__message--loading'); // ???
  popupErrorLoad.classList.add('hidden');

  const popupInside = document.createElement('div');
  popupInside.classList.add('load__inner');

  const popupText = document.createElement('h2');
  popupText.classList.add('load__title');
  popupText.textContent = textErrorLoad;

  documentFragment.appendChild(popupErrorLoad);
  popupErrorLoad.appendChild(popupInside);
  popupInside.appendChild(popupText);

  return documentFragment;
};

document.body.append(createPopupError());
document.body.append(createPopupSuccess());
document.body.append(createLoadForm());
document.body.append(createErrorLoad());

const showPopupErrorLoad = () => {
  setTimeout(() => {
    document.querySelector('.load').classList.add('hidden');
  }, SHOW_TIME);
};

export {showPopupErrorLoad};
