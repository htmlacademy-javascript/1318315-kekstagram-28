// import {fullsizePhoto, body, arrayComments, countComments, loadingComments} from './fullsize-photo.js';
// import { isEscKeydown } from './utils.js';
// import {toDeleteCloseFullsizePhotoEvventListener} from './remove-event-listeners.js';

// const close = fullsizePhoto.querySelector('#picture-cancel');

// const closePhoto = () => {
//   body.classList.remove('.modal-open');
//   fullsizePhoto.classList.add('hidden');
//   arrayComments.textContent = '';
//   countComments.textContent = '0';
//   loadingComments.classList.remove('hidden');
//   toDeleteCloseFullsizePhotoEvventListener(); // Удаляю обработчики закрытия полноэкранного изображения
// };

// const toCloseFullsizePhoto = (evt) => {
//   evt.preventDefault();
//   closePhoto();
// };

// const toEscFullScreen = (evt) => {
//   if (isEscKeydown) {
//     evt.preventDefault();
//     closePhoto();
//   }
// };

// const toCreateCloseFullsizePhotoEvventListener = () => { // Создаю обработчики закрытия полноэкранного изображения, вызываю в fullsize-photo-open.js
//   close.addEventListener('click', toCloseFullsizePhoto);
//   document.addEventListener('keydown', toEscFullScreen);
// };

// export {close, toCloseFullsizePhoto, toEscFullScreen, toCreateCloseFullsizePhotoEvventListener};
