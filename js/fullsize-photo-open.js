// import {createArrayPhotos} from './pattern-photo.js';
// import {createArrayPicture} from './rendering-photo.js';
import {drawFullsizePhoto} from './fullsize-photo.js';

// Данные по каждому изображению (фото + описание) ---> закомментировала, т.к. данные приходят с сервена из модуля server.js
// const dataPhotosArray = createArrayPhotos();

// Отрисованный в DOM массив изображений ---> перенесла в файл server.js
// const sectionPictures = createArrayPicture(dataPhotosArray);
// const sectionPictures = createArrayPicture(Object); // Object должен приходить из модуля server.js

const photos = Array.from(document.querySelectorAll('.picture')); // Преобразование DOM-изображений в настоящий массив, чтобы его перебрать и навесить обработчик клика

photos.forEach((photo) => {
  photo.addEventListener('click', (evt) => {
    // drawFullsizePhoto(dataPhotosArray[evt.currentTarget.id]);
    drawFullsizePhoto(Object[evt.currentTarget.id]); // Object должен приходить из модуля server.js
  });
});
