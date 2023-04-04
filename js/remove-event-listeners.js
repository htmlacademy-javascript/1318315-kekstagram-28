import {controlSmaller, toReducePhoto, controlBigger, toEnlargePhoto} from './form-change-size-img.js';
import {toResetEffects, effects, selectedEffect} from './form-effects-img.js';
import {form, toSubmitForm} from './form-validation.js';

const toDeleteCloseFormEventListeners = () => {
  controlSmaller.removeEventListener('click', toReducePhoto);
  controlBigger.removeEventListener('click', toEnlargePhoto);
  effects.removeEventListener('change', selectedEffect);
  form.removeEventListener('submit', toSubmitForm);
  toResetEffects();
};

export {toDeleteCloseFormEventListeners};
