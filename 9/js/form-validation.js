const form = document.querySelector('.img-upload__form');
const hashtagsField = form.querySelector('.text__hashtags');
const commentsField = form.querySelector('.text__description');

const errorMessageHashtegUnique = 'Текст #ХэшТега не должен повторяться';
const errorMessageHashtagPattern = 'Начните с #, а затем используйте кириллицу, латиницу и цифры oт 2 до 20 символов';
const errorMessageHashtagLength = 'Можно написать самое большее пять #ХэшТегов';
const errorMessageComments = 'Максимальная длина комментария - 140 символов';

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

  return true;
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
hashtagsField.addEventListener('keyup', () => {
  pristine.validate();
});

commentsField.addEventListener('keyup', () => {
  pristine.validate();
});

// Отправка формы
form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    form.submit();
  } else {
    evt.stopPropagation();
  }
});

export {hashtagsField, commentsField, form};

// Нужно поудалять Обработчики
