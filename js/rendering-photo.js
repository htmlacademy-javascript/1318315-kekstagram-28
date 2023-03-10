import {createArrayPhotos} from './pattern-photo.js';

const templateFragment = document.querySelector('#picture').content;

const templatePicture = templateFragment.querySelector('.picture');

const picturesArray = document.querySelector('.pictures');

// Создание одной картинки (фото + описание)
const cteatePicture = (photo) => {
  const picture = templatePicture.cloneNode(true);
  picture.querySelector('.picture__img').src = photo.url;
  picture.querySelector('.picture__likes').textContent = photo.likes;
  picture.querySelector('.picture__comments').textContent = photo.comments.length;

  return picture;
};

// Создание массива картинок
const cteateArrayPicture = (objects) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < objects.length; i++) {
    const newPicture = cteatePicture(objects[i]);
    fragment.appendChild(newPicture);
  }

  picturesArray.appendChild(fragment);
  return picturesArray;
};

const dataPhotosArray = createArrayPhotos();

cteateArrayPicture(dataPhotosArray);
