const textPopupSuccessHead = 'Изображение успешно загружено';
const textPopupSuccessButton = 'Круто!';
const textPopupErrorHead = 'Ошибка загрузки файла';
const textPopupErrorButton = 'Попробовать ещё раз';
const textPopupLoadForm = 'Загружаем...';

// Окно, которое показывается при успешной отправке формы
const createPopupSuccess = () => {
  const documentFragment = document.createDocumentFragment();

  const popupSuccess = document.createElement('section');
  popupSuccess.classList.add('success');

  const popupInside = document.createElement('div');
  popupInside.classList.add('success__inner');

  const popupHead = document.createElement('h2');
  popupHead.classList.add('success__title');
  popupHead.textContent = textPopupSuccessHead;

  const popupButton = document.createElement('button');
  popupButton.classList.add('success__button');
  popupButton.textContent = textPopupSuccessButton;

  documentFragment.appendChild(popupSuccess);
  popupSuccess.appendChild(popupInside);
  popupInside.appendChild(popupHead);
  popupInside.appendChild(popupButton);

  return documentFragment;
};

const showPopupSuccess = () => {
  Alert(createPopupSuccess());
};

// Окно, которое показывается в случае ошибки отправки формы
const createPopupError = () => {
  const documentFragment = document.createDocumentFragment();

  const popupError = document.createElement('section');
  popupError.classList.add('error');

  const popupInside = document.createElement('div');
  popupInside.classList.add('error__inner');

  const popupHead = document.createElement('h2');
  popupHead.classList.add('error__title');
  popupHead.textContent = textPopupErrorHead;

  const popupButton = document.createElement('button');
  popupButton.classList.add('error__button');
  popupButton.textContent = textPopupErrorButton;

  documentFragment.appendChild(popupError);
  popupError.appendChild(popupInside);
  popupInside.appendChild(popupHead);
  popupInside.appendChild(popupButton);

  return documentFragment;
};

const showPopupError = () => {
  alert(createPopupError());
};

// Окно, которое показывается в процессе загрузки фанных формы на сервер
const createLoadForm = () => {
  const documentFragment = document.createDocumentFragment();

  const popupLoadForm = document.createElement('section');
  popupLoadForm.classList.add('img-upload__message');
  popupLoadForm.classList.add('img-upload__message--loading');
  popupLoadForm.textContent = textPopupLoadForm;

  documentFragment.appendChild(popupLoadForm);

  return documentFragment;
};

const showLoadForm = () => {
  alert(createLoadForm());
};

export {showPopupSuccess, showPopupError, showLoadForm};
