// import {createArrayPhotos} from './pattern-photo.js';

const templateFragment = document.querySelector('#picture').content;

const templatePicture = templateFragment.querySelector('.picture');

const picturesArray = document.querySelector('.pictures');

let photoId = 1; // Это id нужно для открытия полноэкранного изображения

// Создание одной картинки (фото + описание)
const createPicture = (photo) => {
  const picture = templatePicture.cloneNode(true);
  picture.querySelector('.picture__img').src = photo.url;
  picture.querySelector('.picture__likes').textContent = photo.likes;
  picture.querySelector('.picture__comments').textContent = photo.comments.length;
  picture.querySelector('.picture__img').alt = photo.description;
  picture.querySelector('.picture__img').id = photo.id;

  // templatePicture.id = picture.querySelector('.picture__img').id;
  // Этот вариант нумерует templatePicture.id с 0, и не открывается первая картинка!!!

  templatePicture.id = photoId++; // Это id нужно для открытия полноэкранного изображения
  // Этот вариант также нумерует templatePicture.id с 0, и не открывается первая картинка!!!

  return picture;
};

// Создание массива картинок
const createArrayPicture = (objects) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < objects.length; i++) {
    const newPicture = createPicture(objects[i]);
    fragment.appendChild(newPicture);
  }

  picturesArray.appendChild(fragment);
  return picturesArray;
};

// const dataPhotosArray = createArrayPhotos();

// createArrayPicture(dataPhotosArray); // отрисовывает на странице сайта картинки (фото с описанием). Если вместо dataPhotosArray передать аргументом createArrayPhotos(), то отрисовка изображений на странице не происходит! createArrayPicture(createArrayPhotos()); - не работает. Нужно вызов функции запиать а переменную const dataPhotosArray = createArrayPhotos();

// export {dataPhotosArray, createArrayPicture}; // это нужно для проверки отрисовки полноэкранного фото

export {createArrayPicture}; // это нужно для проверки отрисовки полноэкранного фото
