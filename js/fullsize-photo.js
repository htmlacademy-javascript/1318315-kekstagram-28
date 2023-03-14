// import {dataPhotosArray} from './rendering-photo.js'; // это нужно для проверки отрисовки полноэкранного фото

const IMG_WIDTH = 35;
const IMG_HEIGHT = 35;

const fullsizePhoto = document.querySelector('.big-picture');
const body = document.querySelector('body');

// Функция по отрисовке/подстановке одного комментария (object приходит из файла pattern-photo.js из функции createComment.js)
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

// Функция по отрисовке/подстановке массива комментариев для одного изображения
const drawArrayComments = (comments) => {
  const arrayComments = fullsizePhoto.querySelector('.social__comments');
  arrayComments.textContent = '';

  for (let i = 0; i < comments.length; i++) {
    const newComment = drawComment(comments[i]);
    arrayComments.appendChild(newComment);
  }

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

  const arrayComments = drawArrayComments(photo.comments);
  fullsizePhoto.querySelector('.social__comments').replaceWith(arrayComments);

  // Временно скроем блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader
  fullsizePhoto.querySelector('.social__comment-count').classList.add('hidden');
  fullsizePhoto.querySelector('.comments-loader').classList.add('hidden');

  body.classList.add('.modal-open');
};

// drawFullsizePhoto(dataPhotosArray[8]); // это нужно для проверки отрисовки полноэкранного фото

export {fullsizePhoto, body, drawFullsizePhoto};
