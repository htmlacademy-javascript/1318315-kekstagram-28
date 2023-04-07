import {isEscKeydown} from './utils.js';
import {submitDataFormToServer} from './server.js';

const STEP_VALUE = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const STEP_STYLE_CONTROL = 0.25;

const errorMessageHashtegUnique = 'Все #ХэшТеги должены быть разными';
const errorMessageHashtagPattern = '#ХэшТега начинается с #, а затем используйте кириллицу, латиницу и цифры; Всего может быть oт 2 до 20 символов одного #ХэшТега';
const errorMessageHashtagLength = 'Можно написать самое большее пять #ХэшТегов';
const errorMessageComments = 'Максимальная длина комментария - 140 символов';

// Значения по-умолчанию, которые будут меняться/перезаписываться
let defaultValueControl = 100;
let defaultStyleControl = 1;

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const openFile = form.querySelector('#upload-file');
const imageUpload = form.querySelector('.img-upload__overlay');
const close = form.querySelector('#upload-cancel');

const controlSmaller = document.querySelector('.scale__control--smaller');
const controlValue = document.querySelector('.scale__control--value');
const controlBigger = document.querySelector('.scale__control--bigger');

const boxImgPreview = document.querySelector('.img-upload__preview'); // div - <div><img></div>
const imgPreview = document.querySelector('.img-upload__preview img'); // img - <div><img></div>

const effects = document.querySelector('.effects__list');
const slider = document.querySelector('.img-upload__effect-level');
const sliderHandle = document.querySelector('.effect-level__slider');
const levelEffect = document.querySelector('.effect-level__value');

const hashtagsField = form.querySelector('.text__hashtags');
const commentsField = form.querySelector('.text__description');


// ОТКРЫТИЕ ФОРМЫ ПО ЗАГРУЗКЕ ФОТОГРАФИИ ПОЛЬЗОВАТЕЛЯ

// Открытие формы
const toOpenForm = () => {
  body.classList.add('modal-open');
  imageUpload.classList.remove('hidden');
  toCreateChangeSizePhotoEventListeners();
  toCreateEffectsPhotoEventListeners();
  toResetEffects();
  noneUpdateOptions();
  controlValue.value = '100%';
  boxImgPreview.style.transform = 'scale(1)';
  toCreateFieldsValidateEventListener();
  toCreateFormSubmitEventListener();
};

openFile.addEventListener('change', toOpenForm);


// ЗАКРЫТИЕ ФОРМЫ ПО ЗАГРУЗКЕ ФОТОГРАФИИ ПОЛЬЗОВАТЕЛЯ

// Закрытие формы
const toCloseForm = () => {
  body.classList.remove('modal-open');
  imageUpload.classList.add('hidden');
  openFile.value = ''; //Очищаю выбор загузки фото, чтобы можно было выбрать новое
  toDeleteChangeSizePhotoEventListeners();
  toDeleteEffectsPhotoEventListeners();
  hashtagsField.value = '';
  commentsField.value = '';
  toDeleteFieldsValidateEventListener();
  toDeleteFormSubmitEventListener();
  // toDeleteCloseFormEventListeners(); // ??????????
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


// ИЗМЕНЕНИЕ МАСШТАБА/РАЗМЕРА ФОТОГРАФИИ ПОЛЬЗОВАТЕЛЯ

// Значения по-умолчанию
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

// Создаем обработчики клика по кнопкам "+"" и "-"
function toCreateChangeSizePhotoEventListeners() {
  controlSmaller.addEventListener('click', toReducePhoto);
  controlBigger.addEventListener('click', toEnlargePhoto);
}

// Удаляем обработчики клика по кнопкам "+"" и "-"
function toDeleteChangeSizePhotoEventListeners() {
  controlSmaller.removeEventListener('click', toReducePhoto);
  controlBigger.removeEventListener('click', toEnlargePhoto);
}


// НАЛОЖЕНИЕ ЭФФЕКТОВ НА ФОТОГРАФИЮ ПОЛЬЗОВАТЕЛЯ

// Значение слайдера по-умолчанию
noUiSlider.create(sliderHandle, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

// Значения слайдера по каждому эффекту
function noneUpdateOptions() {
  sliderHandle.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  });
}

const chromeUpdateOptions = () => {
  sliderHandle.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });
};

const sepiaUpdateOptions = () => {
  sliderHandle.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });
};

const marvinUpdateOptions = () => {
  sliderHandle.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  });
};

const phobosUpdateOptions = () => {
  sliderHandle.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  });
};

const heatUpdateOptions = () => {
  sliderHandle.noUiSlider.updateOptions({
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  });
};

// Переключение значений слайдера в зависимости от выбранного эффекта
const toUpdateHandle = (effect) => {
  switch (effect) {
    case 'none':
      noneUpdateOptions();
      break;
  }
  switch (effect) {
    case 'chrome':
      chromeUpdateOptions();
      break;
  }
  switch (effect) {
    case 'sepia':
      sepiaUpdateOptions();
      break;
  }
  switch (effect) {
    case 'marvin':
      marvinUpdateOptions();
      break;
  }
  switch (effect) {
    case 'phobos':
      phobosUpdateOptions();
      break;
  }
  switch (effect) {
    case 'heat':
      heatUpdateOptions();
      break;
  }
};

// "Включение" слайдера === удаление "отключённого" состояния слайдера
const removeDisabled = () => {
  slider.removeAttribute('disabled');
  sliderHandle.removeAttribute('disabled');
  levelEffect.removeAttribute('disabled');
};

// Блокировка слайдера === установить "отключённое" состояние слайдера
const setDisabled = () => {
  slider.setAttribute('disabled', '');
  sliderHandle.setAttribute('disabled', '');
  levelEffect.setAttribute('disabled', '');
};

// Наложение/добавление эфффекта на фотографию
const toAddEffects = (effect, value) => {
  switch (effect) {
    case 'none':
      setDisabled();
      imgPreview.removeAttribute('class');
      imgPreview.style.filter = '';
      break;
    case 'chrome':
      removeDisabled();
      imgPreview.removeAttribute('class');
      imgPreview.classList.add('effects__preview--chrome');
      imgPreview.style.filter = `grayscale(${value})`;
      break;
    case 'sepia':
      removeDisabled();
      imgPreview.removeAttribute('class');
      imgPreview.classList.add('effects__preview--sepia');
      imgPreview.style.filter = `sepia(${value})`;
      break;
    case 'marvin':
      removeDisabled();
      imgPreview.removeAttribute('class');
      imgPreview.classList.add('effects__preview--marvin');
      imgPreview.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      removeDisabled();
      imgPreview.removeAttribute('class');
      imgPreview.classList.add('effects__preview--phobos');
      imgPreview.style.filter = `blur(${value}px)`;
      break;
    case 'heat':
      removeDisabled();
      imgPreview.removeAttribute('class');
      imgPreview.classList.add('effects__preview--heat');
      imgPreview.style.filter = `brightness(${value})`;
      break;
  }
};

// Получение значений с "ручки" слайдера и "выбранного(:checked)" эффекта при помощи встроенного обработчика событий библиотеки noUiSlider
sliderHandle.noUiSlider.on('update', () => {
  const value = sliderHandle.noUiSlider.get();
  levelEffect.value = value;

  const effect = document.querySelector('input[name="effect"]:checked').value;

  toAddEffects(effect, value);
});

// Обработчик событий (addEventListener) передаст значения выбранного эффекта (evt.target.value) в написанные ранее функции (1- Переключение значений слайдера; 2- Наложение эфффекта на фотографию)

const selectedEffect = (evt) => {
  evt.preventDefault();
  toUpdateHandle(evt.target.value);
  toAddEffects(evt.target.value, sliderHandle.noUiSlider.get());
};

function toCreateEffectsPhotoEventListeners() {
  effects.addEventListener('change', selectedEffect);
}

function toDeleteEffectsPhotoEventListeners() {
  effects.removeEventListener('change', selectedEffect);
}

// Сброс/Обнуление эффекта
function toResetEffects() {
  setDisabled();
  imgPreview.removeAttribute('class');
  imgPreview.style.filter = '';
  noneUpdateOptions();
}


// ВАЛИДАЦИЯ ПОЛЕЙ И ОТПРАВКА ФОРМЫ

const pristine = new Pristine(form, {
  classTo: 'img-upload__pristine',
  errorTextParent: 'img-upload__pristine',
  errorTextClass: 'img-upload__pristine--error-message',
}, true);

// Преобразовуем строку в массив
const textToArray = (text) => text.trim().split(/\s/);

// Проверяем на уникальность хеш-теги
const isHashtegUnique = (value) => {
  if (value.trim() === '') {
    return true;
  }
  const hashtagArray = textToArray(value);
  return hashtagArray.length === new Set(hashtagArray.map((arrayItem) => (arrayItem.toLowerCase()))).size;
  // return ????
};

// Проверка хеш-тега на соответствие шаблону
const isHashtagPattern = (value) => {
  if (value.trim() === '') {
    return true;
  }
  const hashtaPattern = /^#[A-Za-zА-Яа-яЁё\d]{1,19}$/im;
  const hashtagArray = textToArray(value);

  for (let i = 0; i < hashtagArray.length; i++) {
    const currentHashtag = hashtagArray[i];
    if (!hashtaPattern.exec(currentHashtag)) {
      return false;
    }
  }

  return true; // ???
};

// Проверяем количество введенных хеш-тегов
const isHashtagLength = (value) => (value.trim() === '') || (textToArray(value).length <= 5);

// Проверка длинны комментариев
const isCommentsLength = (value) => (value.trim() === '') || (value.length <= 140);

// Схемы проверок
pristine.addValidator(hashtagsField, isHashtegUnique, errorMessageHashtegUnique);
pristine.addValidator(hashtagsField, isHashtagPattern, errorMessageHashtagPattern);
pristine.addValidator(hashtagsField, isHashtagLength, errorMessageHashtagLength);
pristine.addValidator(commentsField, isCommentsLength, errorMessageComments);

// Вызываем проверку
const isFieldsValidate = () => pristine.validate();

// Создание обработчиков полей ввода данных (ХэшТегов и комментариев)
function toCreateFieldsValidateEventListener() {
  hashtagsField.addEventListener('keyup', isFieldsValidate);
  commentsField.addEventListener('keyup', isFieldsValidate);
}

// Удаление обработчиков полей ввода данных (ХэшТегов и комментариев)
function toDeleteFieldsValidateEventListener() {
  hashtagsField.removeEventListener('keyup', isFieldsValidate);
  commentsField.removeEventListener('keyup', isFieldsValidate);
}

// Отправка формы
const toSubmitForm = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    // Показать темплейт "Загружаем..."
    document.querySelector('.img-upload__message').classList.remove('hidden');

    // Собираем и отправляем данные формы
    const formData = new FormData(form);
    submitDataFormToServer(formData);

    toCloseForm();
  } else {
    evt.stopPropagation();
  }
};

// Создание обработчиков отправки формы
function toCreateFormSubmitEventListener() {
  form.addEventListener('submit', toSubmitForm);
}

// Удаление обработчиков отправки формы
function toDeleteFormSubmitEventListener() {
  form.addEventListener('submit', toSubmitForm);
}

export {toCloseForm};
