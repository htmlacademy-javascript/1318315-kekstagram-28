import {createArrayPhotos} from './pattern-photo.js';
import {createArrayPicture} from './rendering-photo.js';
import {drawFullsizePhoto} from './fullsize-photo.js';

const dataPhotosArray = createArrayPhotos(); // Данные по каждому изображению (фото + описание)

const sectionPictures = createArrayPicture(dataPhotosArray); // Отрисованный в DOM массив изображений

const photos = Array.from(sectionPictures.querySelectorAll('.picture')); // Преобразование DOM-изображений в настоящий массив, чтобы его перебрать и навесить обработчик клика

photos.forEach((photo) => {
  photo.addEventListener('click', (evt) => {
    drawFullsizePhoto(dataPhotosArray[evt.currentTarget.id]);
  });
});


