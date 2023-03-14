import {createArrayPhotos} from './pattern-photo.js';
import {createArrayPicture} from './rendering-photo.js'
import {fullsizePhoto, body, drawFullsizePhoto} from './fullsize-photo.js';

const close = fullsizePhoto.querySelector('#picture-cancel');

// Открытие полноэкранного фото
const dataPhotosArray = createArrayPhotos(); // Данные по каждому изображению (фото + описание)

const sectionPictures = createArrayPicture(dataPhotosArray); // Отрисованный в DOM массив изображений

const photos = Array.from(sectionPictures.querySelectorAll('.picture')); // Преобразование DOM-изображений в настоящий массив, чтобы его перебрать и навесить обработчик клика
// const photos = Array.from(sectionPictures.children);

photos.forEach((photo) => {
  photo.addEventListener('click', (evt) => {
    drawFullsizePhoto(dataPhotosArray[evt.currentTarget.id]);
  });
});


// Закрытие полноэкранного фото

const closePhoto = () => {
  body.classList.remove('.modal-open');
  fullsizePhoto.classList.add('hidden');
};

const toCloseFullsizePhoto = (evt) => {
  evt.preventDefault();
  closePhoto();
};

const toEscFullScreen = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePhoto();
  }
};

close.addEventListener('click', toCloseFullsizePhoto);
document.addEventListener('keydown', toEscFullScreen);
