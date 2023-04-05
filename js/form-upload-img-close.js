import {body} from './fullsize-photo.js';
import {isEscKeydown} from './utils.js';
import {hashtagsField, commentsField, form,} from './form-validation.js';
import {toDeleteCloseFormEventListeners} from './remove-event-listeners.js';

const openFile = form.querySelector('#upload-file');
const imageUpload = form.querySelector('.img-upload__overlay');
const close = form.querySelector('#upload-cancel');


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
  if (((hashtagsField === document.activeElement) || (commentsField === document.activeElement)) || ((isEscKeydown(evt)) && ((hashtagsField === document.activeElement) || (commentsField === document.activeElement)))) { // Если курсор стоит в поле ХэшТега или Комментария (=== document.activeElement) (=== input:focus), то при нажатии на Esc форма не должна закрываться. Но при этом должна позволять нажимать на другие клавиши и не отправляться и не закрываться.
    evt.stopPropagation();
  } else {
    evt.preventDefault();
    toCloseForm();
  }
};

document.addEventListener('keydown', toEscCloseForm);

// Нужно удалить EventListener со строки 29(close.addEventListener('click', toCloseForm)) и 38(document.addEventListener('keydown', toEscCloseForm))
// Записать их удаление в файле remove-event-listener.js, НЕЛЬЗЯ, т.к. вызываю это удаление в этом файле в строке 26 - И ТОГДА КОД РАБОТАЕТ НЕКОРРЕКТНО(toDeleteCloseFormEventListeners()).
