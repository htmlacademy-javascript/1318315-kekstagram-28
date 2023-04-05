import {body} from './fullsize-photo.js';
import {form, toCreateFormSubmitEventListener, toCreateFieldsValidateEventListener} from './form-validation.js';
import {noneUpdateOptions, toCreateEffectsPhotoEventListeners, toResetEffects} from './form-effects-img.js';
import {controlValue, boxImgPreview, toCreateChangeSizePhotoEventListeners} from './form-change-size-img.js';

const openFile = form.querySelector('#upload-file');
const imageUpload = form.querySelector('.img-upload__overlay');

// Открытие формы по загрузке фотографии пользователя
const toOpenForm = () => {
  body.classList.add('modal-open');
  imageUpload.classList.remove('hidden');
  toCreateEffectsPhotoEventListeners();
  toCreateChangeSizePhotoEventListeners();
  toCreateFieldsValidateEventListener();
  toCreateFormSubmitEventListener();
  toResetEffects();
  noneUpdateOptions();
  controlValue.value = '100%';
  boxImgPreview.style.transform = 'scale(1)';
};

openFile.addEventListener('change', toOpenForm);
