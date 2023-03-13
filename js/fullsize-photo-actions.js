import {fullsizePhoto, body} from './fullsize-photo.js';

const close = fullsizePhoto.querySelector('#picture-cancel');

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
