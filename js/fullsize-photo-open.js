// import {createArrayPhotos} from './pattern-photo.js';
// import {createArrayPicture} from './rendering-photo.js';
// import {drawFullsizePhoto} from './fullsize-photo.js';
// import {toCreateCloseFullsizePhotoEvventListener} from './fullsize-photo-close.js';

// Данные по каждому изображению (фото + описание) ---> закомментировала, т.к. данные приходят с сервена из модуля server.js
// const dataPhotosArray = createArrayPhotos();

// Отрисованный в DOM массив изображений ---> перенесла в файл server.js
// const sectionPictures = createArrayPicture(dataPhotosArray);
// const sectionPictures = createArrayPicture(Object); // Object должен приходить из модуля server.js

// const showFullsizePhoto = (data) => {
//   // Поиск массива в DOM, чтобы его перебрать и навесить обработчик клика
//   const photos = document.querySelectorAll('.picture');

//   photos.forEach((photo) => {
//     photo.addEventListener('click', (evt) => {
//       drawFullsizePhoto(data[evt.currentTarget.dataset.id]); // photo должно браться из массива photos, который мы находим на странице, после отрисовки данных с сервера
//       toCreateCloseFullsizePhotoEvventListener(); // Создаю обработчики полноэкранного фото
//     });
//   });
// };

// export {showFullsizePhoto};
