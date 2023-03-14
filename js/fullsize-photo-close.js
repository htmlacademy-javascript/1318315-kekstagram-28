import {fullsizePhoto, body} from './fullsize-photo.js';

const close = fullsizePhoto.querySelector('#picture-cancel');

const closePhoto = () => {
  body.classList.remove('.modal-open');
  fullsizePhoto.classList.add('hidden');
  fullsizePhoto.querySelector('.big-picture__img img').classList.remove('big-picture__img');
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
