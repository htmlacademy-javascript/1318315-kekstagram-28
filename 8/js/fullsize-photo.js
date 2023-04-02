import {isEscKeydown} from './utils.js';
const IMG_WIDTH = 35;
const IMG_HEIGHT = 35;

const fullsizePhoto = document.querySelector('.big-picture');
const body = document.querySelector('body');
const arrayComments = fullsizePhoto.querySelector('.social__comments');
const countComments = fullsizePhoto.querySelector('.current-comments-count');
const loadingComments = fullsizePhoto.querySelector('.comments-loader');


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
  const n = 5;
  const maxNumber = comments.length;

  const sliceSmallPart = () => {
    slicePartComments(comments, number, maxNumber);
    countComments.textContent = maxNumber;
    loadingComments.classList.add('hidden');
  };

  const sliceNextPart = () => {
    slicePartComments(comments, number, (number + n));
    number = number + n;
    countComments.textContent = number;
  };

  const showFirstComments = () => (maxNumber <= n) ? sliceSmallPart() : sliceNextPart();
  showFirstComments();

  // Нажатие на кнопку "Загрузить еще"
  const showMoreComments = () => ((maxNumber - number) <= n) ? sliceSmallPart() : sliceNextPart();

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

export {fullsizePhoto, body, arrayComments, countComments, loadingComments, drawFullsizePhoto};
