const isEscKeydown = (evt) => evt.code === 'Escape'; // Нужно обязательно передавать evt !!! "if (isEscKeydown(evt)) {...", т.к. именно evt проверяет есть ли нажатая клавиша Esc

// Получение случайного порядка / Перемешивание
const getRandomOrder = () => Math.random() - 0.5;

// Устранение дребезга
const Debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {isEscKeydown, getRandomOrder, Debounce};
