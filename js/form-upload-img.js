import {isEscKeydown} from './utils.js';
import {submitDataFormToServer} from './server.js';
import {createPopupLoadingForm, createPopupErrorFile, showTimeoutPopupErrorFile} from './popups.js';

const STEP_VALUE = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const STEP_STYLE_CONTROL = 0.25;
const FILE_TYPES = ['jpeg', 'jpg', 'png', 'svg', 'gif', 'webp', 'avif', 'bmp', 'tif', 'tiff', 'ico'];

const errorMessageHashtegUnique = 'Все #ХэшТеги должены быть разными';
const errorMessageHashtagPattern = '#ХэшТега начинается с #, а затем используйте кириллицу, латиницу и цифры; Всего может быть oт 2 до 20 символов одного #ХэшТега';
const errorMessageHashtagLength = 'Можно написать самое большее пять #ХэшТегов';
const errorMessageComments = 'Максимальная длина комментария - 140 символов';

// Значения по-умолчанию, которые будут меняться/перезаписываться
let defaultControlValue = 100;
let defaultTransformStyleValue = 1;

const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const openFileElement = formElement.querySelector('#upload-file');

const imageUploadElement = formElement.querySelector('.img-upload__overlay');
const closeElement = formElement.querySelector('#upload-cancel');

const controlSmallerElement = document.querySelector('.scale__control--smaller');
const controlValueElement = document.querySelector('.scale__control--value');
const controlBiggerElement = document.querySelector('.scale__control--bigger');

const imgPreviewElement = document.querySelector('.img-upload__preview img'); // img - <div><img></div>

const effectsElement = document.querySelector('.effects__list');
const sliderElement = document.querySelector('.img-upload__effect-level');
const sliderHandleElement = document.querySelector('.effect-level__slider');
const levelEffectElement = document.querySelector('.effect-level__value');

const hashtagsFieldElement = formElement.querySelector('.text__hashtags');
const commentsFieldElement = formElement.querySelector('.text__description');


// ОТКРЫТИЕ ФОРМЫ ПО ЗАГРУЗКЕ ФОТОГРАФИИ ПОЛЬЗОВАТЕЛЯ

// Открытие формы
const onOpenForm = () => {
  bodyElement.classList.add('modal-open');
  imageUploadElement.classList.remove('hidden');

  // Сброс маштаба, эффектов и полей ввода хештегов и комментариев в дефотное состояние (по-умолчанию)
  toResetScale();
  toResetEffects();
  toResetInputFields();

  // Создаю обработчики событий // Создаем EventListener-ы в одном порядке, а удаляем - в обратном!!!
  toCloseFormEventListenersCreate();
  toChangeSizePhotoEventListenersCreate();
  toEffectsPhotoEventListenersCreate();
  toFieldsValidateEventListenersCreate();
  toFormSubmitEventListenerCreate();
};

// Загрузка/подтягивание фортографии пользователя
const onOpenFileElementToChooseFile = () => {
  const file = openFileElement.files[0]; // Берем 1-й файл из массива файлов
  const fileName = file.name.toLowerCase(); // Приводим имя файла в нижний регистр
  const compareTypes = FILE_TYPES.some((item) => fileName.endsWith(item)); // Проверяем есть ли в указанном массиве расширений для file".js", то расширение файла, который выбрал пользователь
  if (compareTypes) { // Если верно (true), то
    imgPreviewElement.src = URL.createObjectURL(file); // генерируем ссылку для локальной фотографии пользователя
    onOpenForm();
  } else {
    // Показываю окно ошибки загрузки файла пользователя, которое скрывается через время
    bodyElement.append(createPopupErrorFile());
    showTimeoutPopupErrorFile();
  }
};

openFileElement.addEventListener('change', onOpenFileElementToChooseFile);


// ЗАКРЫТИЕ ФОРМЫ ПО ЗАГРУЗКЕ ФОТОГРАФИИ ПОЛЬЗОВАТЕЛЯ

// Закрытие формы
const onCloseElementToCloseForm = () => {
  bodyElement.classList.remove('modal-open');
  imageUploadElement.classList.add('hidden');
  openFileElement.value = ''; // Очищаю выбор загузки фото, чтобы можно было выбрать новое

  // Удаляю обработчики событий // Создаем EventListener-ы в одном порядке, а удаляем - в обратном!!!
  toFieldsValidateEventListenersDelete();
  toEffectsPhotoEventListenersDelete();
  toChangeSizePhotoEventListenersDelete();
  toFormSubmitEventListenerDelete();
  toCloseElementFormEventListenersDelete();
};

const onDocumentToEscCloseForm = (evt) => {
  if (((hashtagsFieldElement === document.activeElement) || (commentsFieldElement === document.activeElement)) || ((isEscKeydown(evt)) && ((hashtagsFieldElement === document.activeElement) || (commentsFieldElement === document.activeElement)))) { // Если курсор стоит в поле ХэшТега или Комментария (=== document.activeElement) (=== input:focus), то при нажатии на Esc форма не должна закрываться. Но при этом должна позволять нажимать на другие клавиши и не отправляться и не закрываться.
    evt.stopPropagation();
  } else {
    if (isEscKeydown(evt)) {
      evt.preventDefault();
      onCloseElementToCloseForm();
    }
  }
};

// Создание обработчиков для закрытия формы
function toCloseFormEventListenersCreate() {
  closeElement.addEventListener('click', onCloseElementToCloseForm);
  document.addEventListener('keydown', onDocumentToEscCloseForm);
}

// Удаление обработчиков для закрытия формы
function toCloseElementFormEventListenersDelete() {
  closeElement.removeEventListener('click', onCloseElementToCloseForm);
  document.removeEventListener('keydown', onDocumentToEscCloseForm);
}


// ИЗМЕНЕНИЕ МАСШТАБА/РАЗМЕРА ФОТОГРАФИИ ПОЛЬЗОВАТЕЛЯ

// Уменьшить фото, при клике на controlSmaller
const onControlSmallerElementToReducePhoto = (evt) => {
  evt.preventDefault();
  if (defaultControlValue > MIN_VALUE) {
    controlValueElement.value = `${defaultControlValue -= STEP_VALUE}%`;
    imgPreviewElement.style.transform = `scale(${defaultTransformStyleValue -= STEP_STYLE_CONTROL})`;
  } else {
    evt.stopPropagation();
  }
};

// Увеличить фото, при клике на controlBigger
const onControlBiggerElementToEnlargePhoto = (evt) => {
  evt.preventDefault();
  if (defaultControlValue < MAX_VALUE) {
    controlValueElement.value = `${defaultControlValue += STEP_VALUE}%`;
    imgPreviewElement.style.transform = `scale(${defaultTransformStyleValue += STEP_STYLE_CONTROL})`;
  } else {
    evt.stopPropagation();
  }
};

// Сброс/Обнуление маштаба
function toResetScale() {
  // Восстанавливаем значения по-умолчанию
  defaultControlValue = 100;
  defaultTransformStyleValue = 1;
  // и передаем их в соответствующие поля
  controlValueElement.value = `${defaultControlValue}%`;
  imgPreviewElement.style.transform = `scale(${defaultTransformStyleValue})`;
}

// Создаем обработчики клика по кнопкам "+"" и "-"
function toChangeSizePhotoEventListenersCreate() {
  controlSmallerElement.addEventListener('click', onControlSmallerElementToReducePhoto);
  controlBiggerElement.addEventListener('click', onControlBiggerElementToEnlargePhoto);
}

// Удаляем обработчики клика по кнопкам "+"" и "-"
function toChangeSizePhotoEventListenersDelete() {
  controlSmallerElement.removeEventListener('click', onControlSmallerElementToReducePhoto);
  controlBiggerElement.removeEventListener('click', onControlBiggerElementToEnlargePhoto);
}


// НАЛОЖЕНИЕ ЭФФЕКТОВ НА ФОТОГРАФИЮ ПОЛЬЗОВАТЕЛЯ

// Показать слайдер
const showSlider = () => sliderElement.classList.remove('visually-hidden');

// Спрятать слайдер
const hideSlider = () => sliderElement.classList.add('visually-hidden');

// Значение слайдера по-умолчанию
noUiSlider.create(sliderHandleElement, {
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
  sliderHandleElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  });
}

const chromeUpdateOptions = () => {
  sliderHandleElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });
};

const sepiaUpdateOptions = () => {
  sliderHandleElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });
};

const marvinUpdateOptions = () => {
  sliderHandleElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  });
};

const phobosUpdateOptions = () => {
  sliderHandleElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  });
};

const heatUpdateOptions = () => {
  sliderHandleElement.noUiSlider.updateOptions({
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
    case 'chrome':
      chromeUpdateOptions();
      break;
    case 'sepia':
      sepiaUpdateOptions();
      break;
    case 'marvin':
      marvinUpdateOptions();
      break;
    case 'phobos':
      phobosUpdateOptions();
      break;
    case 'heat':
      heatUpdateOptions();
      break;
  }
};

// Наложение/добавление эфффекта на фотографию
const toAddEffects = (effect, value) => {
  switch (effect) {
    case 'none':
      hideSlider();
      imgPreviewElement.removeAttribute('class');
      imgPreviewElement.classList.add('effects__preview--none');
      imgPreviewElement.style.filter = '';
      break;
    case 'chrome':
      showSlider();
      imgPreviewElement.removeAttribute('class');
      imgPreviewElement.classList.add('effects__preview--chrome');
      imgPreviewElement.style.filter = `grayscale(${value})`;
      break;
    case 'sepia':
      showSlider();
      imgPreviewElement.removeAttribute('class');
      imgPreviewElement.classList.add('effects__preview--sepia');
      imgPreviewElement.style.filter = `sepia(${value})`;
      break;
    case 'marvin':
      showSlider();
      imgPreviewElement.removeAttribute('class');
      imgPreviewElement.classList.add('effects__preview--marvin');
      imgPreviewElement.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      showSlider();
      imgPreviewElement.removeAttribute('class');
      imgPreviewElement.classList.add('effects__preview--phobos');
      imgPreviewElement.style.filter = `blur(${value}px)`;
      break;
    case 'heat':
      showSlider();
      imgPreviewElement.removeAttribute('class');
      imgPreviewElement.classList.add('effects__preview--heat');
      imgPreviewElement.style.filter = `brightness(${value})`;
      break;
  }
};

// Получение значений с "ручки" слайдера и "выбранного(:checked)" эффекта при помощи встроенного обработчика событий библиотеки noUiSlider
sliderHandleElement.noUiSlider.on('update', () => {
  const value = sliderHandleElement.noUiSlider.get();

  levelEffectElement.value = value;
  const effectElement = document.querySelector('input[name="effect"]:checked').value;

  toAddEffects(effectElement, value);
});

// Обработчик событий (addEventListener) передаст значения выбранного эффекта (evt.target.value) в написанные ранее функции (1- Переключение значений слайдера; 2- Наложение эфффекта на фотографию)

const onEffectsElementToSelectedEffect = (evt) => {
  evt.preventDefault();
  toUpdateHandle(evt.target.value);
  toAddEffects(evt.target.value, sliderHandleElement.noUiSlider.get());
};

function toEffectsPhotoEventListenersCreate() {
  effectsElement.addEventListener('change', onEffectsElementToSelectedEffect);
}

function toEffectsPhotoEventListenersDelete() {
  effectsElement.removeEventListener('change', onEffectsElementToSelectedEffect);
}

// Сброс/Обнуление эффекта
function toResetEffects() {
  imgPreviewElement.removeAttribute('class');
  imgPreviewElement.classList.add('effects__preview--none');
  setTimeout(() => { // Выполняем код ниже с задержкой по времени, т.к. элементы в DOM отрисовываются не моментально. Без этого отсроченного выполнения - на картинке остается ранее выбранний фильтр.
    imgPreviewElement.style.filter = 'none';
    noneUpdateOptions();
    hideSlider();
  }, 100);
  // Возвращаем "выбранной"(checked) изначальную радио-точку из списка визуальных эффектов
  document.querySelector('input[id="effect-none"]').checked = 'checked';
}

// ВАЛИДАЦИЯ ПОЛЕЙ И ОТПРАВКА ФОРМЫ

const pristine = new Pristine(formElement, {
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
  const hashtagsArray = textToArray(value);
  return hashtagsArray.length === new Set(hashtagsArray.map((arrayItem) => (arrayItem.toLowerCase()))).size;
};

// Проверка хеш-тега на соответствие шаблону
const isHashtagPattern = (value) => {
  if (value.trim() === '') {
    return true;
  }
  const hashtaPattern = /^#[A-Za-zА-Яа-яЁё\d]{1,19}$/im;
  const hashtagsArray = textToArray(value);

  for (let i = 0; i < hashtagsArray.length; i++) {
    const currentHashtag = hashtagsArray[i];
    if (!hashtaPattern.exec(currentHashtag)) {
      return false;
    }
  }

  return true;
};

// Проверяем количество введенных хеш-тегов
const isHashtagsLength = (value) => (value.trim() === '') || (textToArray(value).length <= 5);

// Проверка длинны комментариев
const isCommentsLength = (value) => (value.trim() === '') || (value.length <= 140);

// Схемы проверок
pristine.addValidator(hashtagsFieldElement, isHashtegUnique, errorMessageHashtegUnique);
pristine.addValidator(hashtagsFieldElement, isHashtagPattern, errorMessageHashtagPattern);
pristine.addValidator(hashtagsFieldElement, isHashtagsLength, errorMessageHashtagLength);
pristine.addValidator(commentsFieldElement, isCommentsLength, errorMessageComments);

// Вызываем проверку
const onInputFieldIsToValidate = () => pristine.validate();

// Создание обработчиков полей ввода данных (ХэшТегов и комментариев)
function toFieldsValidateEventListenersCreate() {
  hashtagsFieldElement.addEventListener('keyup', onInputFieldIsToValidate);
  commentsFieldElement.addEventListener('keyup', onInputFieldIsToValidate);
}

// Удаление обработчиков полей ввода данных (ХэшТегов и комментариев)
function toFieldsValidateEventListenersDelete() {
  hashtagsFieldElement.removeEventListener('keyup', onInputFieldIsToValidate);
  commentsFieldElement.removeEventListener('keyup', onInputFieldIsToValidate);
}

// Сброс/Обнуление (очистка) полейй ввода хештегов и комментариев
function toResetInputFields() {
  hashtagsFieldElement.value = '';
  commentsFieldElement.value = '';
}

// Отправка формы
const onFormToSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    // Показать темплейт "Загружаем..."
    bodyElement.append(createPopupLoadingForm());

    // Собираем и отправляем данные формы
    const formData = new FormData(formElement);
    submitDataFormToServer(formData);
  } else {
    evt.stopPropagation();
  }
};

// Создание обработчиков отправки формы
function toFormSubmitEventListenerCreate() {
  formElement.addEventListener('submit', onFormToSubmit);
}

// Удаление обработчиков отправки формы
function toFormSubmitEventListenerDelete() {
  formElement.addEventListener('submit', onFormToSubmit);
}

export {onCloseElementToCloseForm};
