import {body} from './fullsize-photo.js';
import {isEscKeydown} from './utils.js';
import {hashtagsField, commentsField, form} from './form-validation.js';
import {toDeleteCloseFormEventListeners} from './remove-event-listeners.js';
import {noneUpdateOptions, toCreateEffectsPhotoEventListeners, toResetEffects} from './form-effects-img.js';
import {controlValue, boxImgPreview, toCreateChangeSizePhotoEventListeners} from './form-change-size-img.js';

const openFile = form.querySelector('#upload-file');
const imageUpload = form.querySelector('.img-upload__overlay');
const close = form.querySelector('#upload-cancel');

// Открытие формы по загрузке фотографии пользователя
const toOpenForm = () => {
  body.classList.add('modal-open');
  imageUpload.classList.remove('hidden');
  toCreateEffectsPhotoEventListeners();
  toCreateChangeSizePhotoEventListeners();
  toResetEffects();
  noneUpdateOptions();
  controlValue.value = '100%';
  boxImgPreview.style.transform = 'scale(1)';
};

openFile.addEventListener('change', toOpenForm);

// Закрытие формы по загрузке фотографии пользователя
const toCloseForm = () => {
  body.classList.remove('modal-open');
  imageUpload.classList.add('hidden');
  openFile.value = ''; //Очищаю выбор загузки фото, чтобы можно было выбрать новое
  hashtagsField.value = '';
  commentsField.value = '';
  toDeleteCloseFormEventListeners();
};

close.addEventListener('click', toCloseForm);

const toEscCloseForm = (evt) => {
  if (isEscKeydown(evt) && ((hashtagsField === document.activeElement) || (commentsField === document.activeElement))) { // Если курсор стоит в поле ХэшТега или Комментария (=== document.activeElement) (=== input:focus), то при нажатии на Esc форма не закрывается.
    evt.stopPropagation();
  } else {
    evt.preventDefault();
    toCloseForm();
  }
};

document.addEventListener('keydown', toEscCloseForm);

export {close, toCloseForm, toEscCloseForm};
// Записала удаление EventListener со строки 29(close.addEventListener('click', toCloseForm)) и 38(document.addEventListener('keydown', toEscCloseForm)) в файле remove-event-listener.js, а вызываю это удаление в этом файле в строке 26(toDeleteCloseFormEventListeners()).
