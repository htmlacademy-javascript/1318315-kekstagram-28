// import {form} from './form-upload-img.js';
const form = document.querySelector('.img-upload__form');
const hashtagsField = form.querySelector('.text__hashtags');
// console.log('hashtagsField.value', hashtagsField.value);
const errorMessageHashtegs = 'Должно быть минимум два символа. Максимальная длина одного #ХэшТега - 20 символов, можно написать самое большее пять #ХэшТегов. Используйте кириллицу, латиницу и цифры.';

const hashtagSymbol = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/im;

window.onload = function () {
  // console.log('hashtagsField.value2', hashtagsField.value);

  const pristine = new Pristine(form, {
    classTo: 'img-upload__hashtags',
    errorTextParent: 'img-upload__hashtags',
    errorTextClass: 'img-upload__hashtags--error-message'
  });

  const validationHashtagField = (string) => {
    // Разбиваем строку на массив хеш-тегов
    // console.log('HashtagField value', string);
    const hashtagArray = string.split(/\s/);
    // console.log('hashtagArray', hashtagArray);

    // Проверяем на уникальность хеш-теги, приводя их к нижнему регистру
    const isHashtegUnique = (value) => (
      value.length === new Set(value.map((text) => (text.toLowerCase()))).size
    ); // Почему кругрые скобки ????

    // Проверка хеш-тега на соответствие шаблону hashtagSymbol = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/im;
    const isHashtagPattern = () => {
      if (hashtagArray.length === 1) {
        return true;
      } else {
        for (let i = 0; i < hashtagArray.length; i++) {
          const currentHashtag = hashtagArray[i];
          if (hashtagSymbol.exec(currentHashtag)) {
            return true;
          }
          return false;
        }
      }
    };

    // Проверяем количество введенных хеш-тегов
    const isHashtagLength = (val) => (
      val.length <= 5
    );

    return isHashtegUnique(hashtagArray) && isHashtagPattern(hashtagArray) && isHashtagLength(hashtagArray);
  };

  pristine.addValidator(hashtagsField, validationHashtagField, errorMessageHashtegs);

  // const validationForm = (evt) => {
  //   const isValid = pristine.validate();
  //   return isValid ? form.submit() : evt.preventDefault();
  // };

  const validationForm = (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      // console.log('Форма прошла проверку - можно отправлять');
      form.submit();
    } else {
      // console.log('Форма не валидна - исправь ошибки');
      evt.stopPropagation();
    }
  };

  form.addEventListener('submit', validationForm);

};

export {hashtagsField, form};
