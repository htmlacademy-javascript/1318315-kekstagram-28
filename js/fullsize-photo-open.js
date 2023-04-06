// import {createArrayPhotos} from './pattern-photo.js';
// import {createArrayPicture} from './rendering-photo.js';
import {drawFullsizePhoto} from './fullsize-photo.js';

// Данные по каждому изображению (фото + описание) ---> закомментировала, т.к. данные приходят с сервена из модуля server.js
// const dataPhotosArray = createArrayPhotos();

// Отрисованный в DOM массив изображений ---> перенесла в файл server.js
// const sectionPictures = createArrayPicture(dataPhotosArray);
// const sectionPictures = createArrayPicture(Object); // Object должен приходить из модуля server.js

const showFullsizePhoto = () => {
  // Преобразование DOM-изображений в настоящий массив, чтобы его перебрать и навесить обработчик клика
  const photos = Array.from(document.querySelectorAll('.picture'));

  photos.forEach((photo) => {
    photo.addEventListener('click', (evt) => {
      // console.log('evt.currentTarget', evt.currentTarget);
      // console.log('evt.currentTarget.dataset.id', evt.currentTarget.dataset.id);
      // drawFullsizePhoto(dataPhotosArray[evt.currentTarget.id]);
      drawFullsizePhoto(photo[evt.currentTarget.dataset.id]); // photo должно браться из массива photos, который мы находим на странице, после отрисовки данных с сервера
    });
  });
};

export {showFullsizePhoto};
