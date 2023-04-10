import {isEscKeydown} from './utils.js';

const IMG_WIDTH = 35;
const IMG_HEIGHT = 35;

const body = document.querySelector('body');
const fullsizePhoto = document.querySelector('.big-picture');
const arrayComments = fullsizePhoto.querySelector('.social__comments');
const countComments = fullsizePhoto.querySelector('.current-comments-count');
const loadingComments = fullsizePhoto.querySelector('.comments-loader');
const close = fullsizePhoto.querySelector('#picture-cancel');


// ФУНКЦИИ ПО ПОДСТАНОВКЕ В DOM-ЭЛЕМЕНТЫ ЗНАЧЕНИЙ/ДАННЫХ, ВЗЯТЫХ ИЗ МАССИВА

// Функция по отрисовке/подстановке одного комментария
const drawComment = (object) => {
  const newComment = document.createElement('li');
  newComment.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = object.avatar;
  img.alt = object.name;
  img.width = IMG_WIDTH;
  img.height = IMG_HEIGHT;
  newComment.appendChild(img);

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = object.message;
  newComment.appendChild(text);

  return newComment;
};

//Функция по отрисовке части комментариев
const creatingPartComments = (comments) => {
  const documentFragment = document.createDocumentFragment();
  for (let i = 0; i < comments.length; i++) {
    const newComment = drawComment(comments[i]);
    documentFragment.appendChild(newComment);
  }
  return documentFragment;
};

const slicePartComments = (comments, start, end) => {
  const partComments = comments.slice(start, end);
  arrayComments.appendChild(creatingPartComments(partComments));
};

// Функция по отрисовке/подстановке массива комментариев для одного изображения
const drawArrayComments = (comments) => {
  arrayComments.textContent = '';
  let number = 0;
  const N = 5;
  const maxNumber = comments.length;

  const sliceSmallPart = () => {
    slicePartComments(comments, number, maxNumber);
    countComments.textContent = maxNumber;
    loadingComments.classList.add('hidden');
  };

  const sliceNextPart = () => {
    slicePartComments(comments, number, (number + N));
    number = number + N;
    countComments.textContent = number;
  };

  const showFirstComments = () => (maxNumber <= N) ? sliceSmallPart() : sliceNextPart();
  showFirstComments();

  // Нажатие на кнопку "Загрузить еще"
  const showMoreComments = () => ((maxNumber - number) <= N) ? sliceSmallPart() : sliceNextPart();

  loadingComments.addEventListener('click', showMoreComments);

  // Удаляю обработчик клика на кнопку "Загрузить еще", чтобы удалять то что запоминает колбэк-функция
  fullsizePhoto.querySelector('#picture-cancel').onclick = function () {
    loadingComments.removeEventListener('click', showMoreComments);
  };

  // Удаляю обработчик клика на кнопку "Загрузить еще", чтобы удалять то что запоминает колбэк-функция
  document.onkeydown = function (evt) {
    if (isEscKeydown(evt)) {
      evt.preventDefault();
      loadingComments.removeEventListener('click', showMoreComments);
    }
  };

  return arrayComments;
};

// Функция по отрисовке полноэкранного фото
const drawFullsizePhoto = (photo) => {
  fullsizePhoto.classList.remove('hidden');

  fullsizePhoto.querySelector('.big-picture__img img').src = photo.url;

  fullsizePhoto.querySelector('.social__caption').textContent = photo.description;

  fullsizePhoto.querySelector('.likes-count').textContent = '';
  fullsizePhoto.querySelector('.likes-count').textContent = photo.likes;

  fullsizePhoto.querySelector('.comments-count').textContent = photo.comments.length;

  drawArrayComments(photo.comments);
  fullsizePhoto.querySelector('.social__comments').replaceWith(arrayComments);

  body.classList.add('.modal-open');
};


// Инициализация/настройка миниатюры для отображения полноэкранного изображения (навешивание обработчика событий)

const initPictures = (data) => {
  // Поиск массива в DOM, чтобы его перебрать и навесить обработчик клика
  const photos = document.querySelectorAll('.picture');

  photos.forEach((photo) => {
    photo.addEventListener('click', (evt) => {
      drawFullsizePhoto(data[evt.currentTarget.id]); // photo должно браться из массива photos, который мы находим на странице, после отрисовки данных с сервера
      toCreateCloseFullsizePhotoEvventListener(); // Создаю обработчики полноэкранного фото
    });
  });
};


// Закрываю окно полноэкранного отображения картинки

const closePhoto = () => {
  body.classList.remove('.modal-open');
  fullsizePhoto.classList.add('hidden');
  arrayComments.textContent = '';
  countComments.textContent = '0';
  loadingComments.classList.remove('hidden');
  toDeleteCloseFullsizePhotoEvventListener(); // Удаляю обработчики закрытия полноэкранного изображения
  document.onkeydown = null;
};

const toCloseFullsizePhoto = (evt) => {
  evt.preventDefault();
  closePhoto();
};

const toEscFullScreen = (evt) => {
  if (isEscKeydown(evt)) {
    evt.preventDefault();
    closePhoto();
  }
};

// Создаю обработчики закрытия полноэкранного изображения
function toCreateCloseFullsizePhotoEvventListener() {
  close.addEventListener('click', toCloseFullsizePhoto);
  document.addEventListener('keydown', toEscFullScreen);
}

// Удаляю обработчики закрытия полноэкранного изображения
function toDeleteCloseFullsizePhotoEvventListener() {
  close.removeEventListener('click', toCloseFullsizePhoto);
  document.removeEventListener('keydown', toEscFullScreen);
}

export {initPictures};
