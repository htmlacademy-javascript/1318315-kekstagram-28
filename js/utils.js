// // Получение случайного числа
// const GetRandomNumber = (min, max) => {
//   if ((0 <= min) && (min < max)) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }
//   return 'Ошибка при введении чисел';
// };

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

export {/*GetRandomNumber, */isEscKeydown, getRandomOrder, Debounce};
