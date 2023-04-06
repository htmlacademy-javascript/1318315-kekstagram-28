import {controlSmaller, toReducePhoto, controlBigger, toEnlargePhoto} from './form-change-size-img.js';
import {toResetEffects, effects, selectedEffect} from './form-effects-img.js';
import {form, toSubmitForm} from './form-validation.js';
import {body} from './fullsize-photo.js';
import {buttonPopupSuccess, removePopupSuccess, removeToEscPopupSuccess, buttonPopupError, removePopupError, removeToEscPopupError, buttonPopupErrorLoad, removePopupErrorLoad, removeToEscPopupErrorLoad} from './popup-close.js';

const toDeleteCloseFormEventListeners = () => {
  controlSmaller.removeEventListener('click', toReducePhoto);
  controlBigger.removeEventListener('click', toEnlargePhoto);
  effects.removeEventListener('change', selectedEffect);
  form.removeEventListener('submit', toSubmitForm);
  toResetEffects();
};

const toDeleteClosePopupSuccessEventListeners = () => {
  buttonPopupSuccess.removeEventListener('click', removePopupSuccess());
  document.removeEventListener('keydown', removeToEscPopupSuccess());
  body.removeEventListener('click', removePopupSuccess());
};

const toDeleteClosePopupErrorEventListeners = () => {
  buttonPopupError.removeEventListener('click', removePopupError());
  document.removeEventListener('keydown', removeToEscPopupError());
  body.removeEventListener('click', removePopupError());
};

const toDeleteClosePopupErrorLoadEventListeners = () => {
  buttonPopupErrorLoad.addEventListener('click', removePopupErrorLoad());
  document.addEventListener('keydown', removeToEscPopupErrorLoad());
  body.addEventListener('click', removePopupErrorLoad());
};

export {toDeleteCloseFormEventListeners, toDeleteClosePopupSuccessEventListeners, toDeleteClosePopupErrorEventListeners, toDeleteClosePopupErrorLoadEventListeners};
