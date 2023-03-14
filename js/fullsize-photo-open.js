import {createArrayPhotos} from './pattern-photo.js';
import {createArrayPicture} from './rendering-photo.js';
import {drawFullsizePhoto} from './fullsize-photo.js';

const dataPhotosArray = createArrayPhotos(); // Данные по каждому изображению (фото + описание)

const sectionPictures = createArrayPicture(dataPhotosArray); // Отрисованный в DOM массив изображений

const photos = Array.from(sectionPictures.querySelectorAll('.picture')); // Преобразование DOM-изображений в настоящий массив, чтобы его перебрать и навесить обработчик клика
// const photos = Array.from(sectionPictures.children);

photos.forEach((photo) => {
  photo.addEventListener('click', (evt) => {
    // console.log('photo', photo);
    // console.log('evt', evt);
    // console.log('evt.currentTarget', evt.currentTarget);
    // console.log('evt.currentTarget.id', evt.currentTarget.id);
    // console.log('photo.id', photo.id);

    drawFullsizePhoto(dataPhotosArray[evt.currentTarget.id]);
    dataPhotosArray[evt.currentTarget.id].classList.add('big-picture__img');

    // console.log('photo.id', photo.id);
  });
});


