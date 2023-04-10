const SHOW_TIME = 5000;
const SHOW_MIN_TIME = 1750;

const getRandomNumber = (min, max) => {
  if ((0 <= min) && (min < max)) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return 'Ошибка при введении чисел';
};

const isEscKeydown = (evt) => evt.code === 'Escape'; // Нужно обязательно передавать evt !!! "if (isEscKeydown(evt)) {...", т.к. именно evt проверяет есть ли нажатая клавиша Esc

// Устранение дребезга
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomNumber, isEscKeydown, SHOW_TIME, SHOW_MIN_TIME, debounce};
