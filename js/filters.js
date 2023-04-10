import {SHOW_MIN_TIME, debounce} from './utils.js';

const NUMBER_RANDOM = 10;
const RERENDER_DELAY = 500;

const filters = document.querySelector('.img-filters'); // boxFilters

const filterDefault = filters.querySelector('#filter-default');
const filterRandom = filters.querySelector('#filter-random');
const filterDiscussed = filters.querySelector('#filter-discussed');

const picturesArray = document.querySelector('.pictures');

const defaultArrayId = [];

// Показываем кнопки фильтров на главной странице
const showFilters = () => filters.classList.remove('img-filters--inactive');

// Отрисовка кнопок будет происходить с небольшой задержкой
const showTimeoutFilters = () => {
  setTimeout(() => {
    const pictures = document.querySelectorAll('.picture'); // Все картинки, загруженные с сервера
    pictures.forEach((picture) => {
      defaultArrayId.push(picture.id); // Собираем в массив defaultArrayId все id картинок
    });
    showFilters();
  }, SHOW_MIN_TIME);
};


// ФИЛЬТРАЦИЯ МИНИАТЮР НА СТРАНИЦЕ

// Удаляем кнопке активный класс (со стилями выделения кнопки другим цветом, например)  и назначаем его новой кнопке
const updateButtonClass = (button) => {
  filters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
};

// Обновление картинок на главной странице
const updatePictures = (array) => {
  const pictures = picturesArray.querySelectorAll('.picture'); // Картинки, те, что в данный момент есть в DOM
  let lastPicture = pictures[pictures.length - 1]; //Последний элемент/миниатюра в DOM

  // Собственно сам процесс сортировки/перестроения миниатюр
  array.forEach((pictureId) => {
    // Находим элемент минматюры по id
    const picture = picturesArray.querySelector(`[id="${pictureId}"]`);

    // Вставляем найденный элемент в конец
    lastPicture.after(picture);

    // Вставленный элемент становится последним
    lastPicture = picture;
  });
};

// Отображение всех картинок (ранее часть спрятали)
const showPictures = () => {
  const pictures = picturesArray.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picture.style = 'display: ';
  });
};

// Сортировка миниатюр "По умолчанию"
const sortDefaultPictures = () => {
  updateButtonClass(filterDefault); // Удаляем у "ранее кликнутой" кнопки активный класс и назначаем его новой "кликнутой" кнопке
  updatePictures(defaultArrayId); // Перестраиваем миниатюры
  showPictures(); // Показываем все картинки, т.к. ранее они могли быть скрыты
};

// Обработчик события клик на кнопку "По умолчанию"
filterDefault.addEventListener('click', sortDefaultPictures);

// Устранение дребезга при нажатии на кнопку
filterDefault(debounce(
  () => sortDefaultPictures(),
  RERENDER_DELAY,
));

// Сортировка миниатюр по критерию "Случайные"
const sortRandomPictures = () => {
  updateButtonClass(filterRandom); // Удаляем у "ранее кликнутой" кнопки активный класс и назначаем его новой "кликнутой" кнопке - filterRandom
  const cloneArrayId = [...defaultArrayId]; // Клонируем массив с id
  cloneArrayId.sort(() => Math.random() - 0.5); // Сортируем новый массив в случайном порядке
  updatePictures(cloneArrayId.slice(0, NUMBER_RANDOM - 1)); // Перестраиваем миниатюры по отсортированному склонированному массиву id
  const hiddenPicturesId = cloneArrayId.slice(NUMBER_RANDOM); // Остаток id от id миниатюр, которые надо спрятать
  showPictures(); // Показываем все картинки

  // Прячем ненужные миниатюры
  hiddenPicturesId.forEach((pictureId) => {
    const picture = picturesArray.querySelector(`[id="${pictureId}"]`); // Находим картинки по id, миниатюры которых которые надо спрятать
    picture.style = 'display: none'; // Собственно прячем
  });
};

// Обработчик события клик на кнопку "Случайные"
filterRandom.addEventListener('click', sortRandomPictures);

// Устранение дребезга при нажатии на кнопку
filterRandom(debounce(
  () => sortRandomPictures(),
  RERENDER_DELAY,
));

// Сортировка миниатюр по критерию "Обсуждаемые"
const sortDiscussedPictures = () => {
  updateButtonClass(filterDiscussed); // Удаляем у "ранее кликнутой" кнопки активный класс и назначаем его новой "кликнутой" кнопке - filterDiscussed
  const pictures = picturesArray.querySelectorAll('.picture'); // Находим все картинки
  const arrayCommentsCount = []; // Создаем пустой массив для записи количества комментариев в всязке с id
  pictures.forEach((picture) => {
    const commentCount = picture.querySelector('.picture__comments'); // Находим все комментарии в одной картинке
    const count = commentCount.textContent.padStart(2, '0'); // Подставляем "00" впереди цифр для корректной сортировки (js сортирует по своим правилам)
    arrayCommentsCount.push(`${count},${picture.id}`); // Записываем в новый массив количество комментариев в всязке с id
  });
  arrayCommentsCount.sort().reverse(); // Сортируем количество комментариев .sort() ---> от меньшего к большему, а затем переворячиваем и записіваем в обратном порядке ---> .reverse()
  const newArrayCommentsCount = arrayCommentsCount.map((item) => item.split(',')[1]); // Создаем новый массив, в который попадают только вторые значения из ранее перевернутого в порядкуе убывания массива
  updatePictures(newArrayCommentsCount); // Перестраиваем все картинки
  showPictures(); // Показываем все картинки
};

// Обработчик события клик на кнопку "Обсуждаемые"
filterDiscussed.addEventListener('click', sortDiscussedPictures);


// Устранение дребезга при нажатии на кнопку
filterDiscussed(debounce(
  () => sortDiscussedPictures(),
  RERENDER_DELAY,
));


export {showTimeoutFilters};
