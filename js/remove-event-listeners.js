import {controlSmaller, toReducePhoto, controlBigger, toEnlargePhoto} from './form-change-size-img.js';
import {toResetEffects, effects, selectedEffect} from './form-effects-img.js';
import {close, toCloseForm, toEscCloseForm} from './form-upload-img.js';

const toDeleteCloseFormEventListeners = () => {
  controlSmaller.removeEventListener('click', toReducePhoto);
  controlBigger.removeEventListener('click', toEnlargePhoto);
  effects.removeEventListener('change', selectedEffect);
  toResetEffects();
  close.removeEventListener('click', toCloseForm);
  document.removeEventListener('keydown', toEscCloseForm);
};

export {toDeleteCloseFormEventListeners};
