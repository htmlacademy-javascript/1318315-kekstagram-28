import {SHOW_MIN_TIME, getRandomNumber} from './utils.js';
import {createArrayPicture} from './rendering-photo.js';

const NUMBER_RUNDOM = 10;
const currentFilter = 'filter-default';

const filters = document.querySelector('.img-filters'); // boxFilters
const miniatures = document.querySelectorAll('.pictures .picture'); // Мне нужен массив с объектами <a> ???? <section> --- <section> ... <a><img></a> ... </section>


// Показываем кнопки фильтров на главной странице
const showFilters = () => filters.classList.remove('img-filters--inactive');

// Отрисовка кнопок будет происходить с небольшой задержкой
const showTimeoutFilters = () => {
  setTimeout(() => {
    showFilters();
  }, SHOW_MIN_TIME);
};


// Функция сортировки случайным образом - 10 миниатюр
const sortByRundom = () => {
  // Создаю копию массива объекта (внутри функции, т.к. этот скопированный массив будет изменен)
  const copiedArray = Array.slice(miniatures);
  copiedArray.sort(getRandomNumber()); // Не совсем подходит, т.к. нам нужно неповторяемых 10 миниатюр
  // или
  Set(copiedArray.map((arrayItem) => getRandomNumber(arrayItem)));
  return copiedArray;
};

// Функция сортировки по длинне комментариев
const sortByCommentsLength = () => {
  // Создаю копию массива объекта (внутри функции, т.к. этот скопированный массив будет изменен)
  const copiedArray = Array.slice(miniatures);

  copiedArray.sort();
  // или
  copiedArray.map();
  // или
  copiedArray.filter();

  return copiedArray;
};

// Отслеживание по какой именно кнопке был клик
const selectedFilter = (Array) => {
  switch (currentFilter) {
    case 'filter-default':
      console.log('Выбрани фильтр - По умолчанию');
      // Ничего не делаем, возвращаем массив миниатюр
      return miniatures;
      break;
    case 'filter-random':
      console.log('Выбрани фильтр - Случайные');
      // Случайным образом сортируем миниатюры (getRandomNumber)
      return sortByRundom(Array).slice(0, NUMBER_RUNDOM);
      break;
    case 'filter-discussed':
      console.log('Выбрани фильтр - Обсуждаемые');
      // Сортируем от max.comments.length до min.comments.length (по критерию количества комментариев)
      return sortByCommentsLength(Array);
      break;
  }
};

// Произошел клик
filters.addEventListener('click', () => {
  // Происходит отрисовка миниатюр по новому критерию (---> котоорый берется из switch)
  createArrayPicture(selectedFilter());
});

export {showTimeoutFilters};
