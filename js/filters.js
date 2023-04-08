import {SHOW_MIN_TIME} from './utils.js';

const boxFilters = document.querySelector('.img-filters');

// Показываем кнопки фильтров на главной странице
const showFilters = () => boxFilters.classList.remove('img-filters--inactive');

// Отрисовка кнопок будет происходить с небольшой задержкой
const showTimeoutFilters = () => {
  setTimeout(() => {
    showFilters();
  }, SHOW_MIN_TIME);
};


export {showTimeoutFilters};
