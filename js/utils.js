const getRandomNumber = (min, max) => {
  if ((0 <= min) && (min < max)) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return 'Ошибка при введении чисел';
};

export { getRandomNumber };
