import {body} from './fullsize-photo.js';
import {isEscKeydown} from './utils.js';
import {hashtagsField} from './form-validation.js';

const form = document.querySelector('.img-upload__form');
const openFile = form.querySelector('#upload-file');
const imageUpload = form.querySelector('.img-upload__overlay');
const close = form.querySelector('#upload-cancel');
const commentsField = form.querySelector('.text__description');

// Открытие формы по загрузке фотографии пользователя
const toOpenForm = () => {
  body.classList.add('modal-open');
  imageUpload.classList.remove('hidden');
};

openFile.addEventListener('change', toOpenForm);

// Закрытие формы по загрузке фотографии пользователя
const toCloseForm = () => {
  body.classList.remove('modal-open');
  imageUpload.classList.add('hidden');
  openFile.value = ''; //Очищаю выбор загузки фото, чтобы можно было выбрать новое
  hashtagsField.value = '';
  commentsField.value = '';
};

close.addEventListener('click', toCloseForm);

const toEscCloseForm = (evt) => {
  if (isEscKeydown(evt)) {
    evt.preventDefault();
    toCloseForm();
  }
};

document.addEventListener('keydown', toEscCloseForm);
