const STEP_VALUE = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const STEP_STYLE_CONTROL = 0.25;

const controlSmaller = document.querySelector('.scale__control--smaller');
const controlValue = document.querySelector('.scale__control--value');
const controlBigger = document.querySelector('.scale__control--bigger');

const boxImgPreview = document.querySelector('.img-upload__preview'); // div - <div><img></div>

// Значения по-умолчанию
let defaultValueControl = 100;
let defaultStyleControl = 1;

controlValue.value = `${defaultValueControl}%`;

// Уменьшить фото, при клике на controlSmaller
const toReducePhoto = (evt) => {
  evt.preventDefault();
  if (defaultValueControl > MIN_VALUE) {
    controlValue.value = `${defaultValueControl -= STEP_VALUE}%`;
    boxImgPreview.style.transform = `scale(${defaultStyleControl -= STEP_STYLE_CONTROL})`;
  }
};

// Увеличить фото, при клике на controlBigger
const toEnlargePhoto = (evt) => {
  evt.preventDefault();
  if (defaultValueControl < MAX_VALUE) {
    controlValue.value = `${defaultValueControl += STEP_VALUE}%`;
    boxImgPreview.style.transform = `scale(${defaultStyleControl += STEP_STYLE_CONTROL})`;
  }
};

const toCreateChangeSizePhotoEventListeners = () => {
  controlSmaller.addEventListener('click', toReducePhoto);
  controlBigger.addEventListener('click', toEnlargePhoto);
};

export {controlValue, boxImgPreview, controlSmaller, toReducePhoto, controlBigger, toEnlargePhoto, toCreateChangeSizePhotoEventListeners};

// Записала удаление EventListener со строки 28(controlSmaller.addEventListener('click', toReducePhoto)) и 39(controlBigger.addEventListener('click', toEnlargePhoto)) в файле remove-event-listener.js, а вызываю это удаление в файле form-upload-img.js в строке 26(toDeleteCloseFormEventListeners()).
