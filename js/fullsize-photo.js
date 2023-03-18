const IMG_WIDTH = 35;
const IMG_HEIGHT = 35;

const fullsizePhoto = document.querySelector('.big-picture');
const body = document.querySelector('body');
const arrayComments = fullsizePhoto.querySelector('.social__comments');
const loadingComments = fullsizePhoto.querySelector('.comments-loader');

let number = 0;

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

// Функция по отрисовке/подстановке массива комментариев для одного изображения
const drawArrayComments = (comments) => {
  arrayComments.textContent = '';

  const firstComments = comments.slice(number, number += 5);

  arrayComments.appendChild(creatingPartComments(firstComments));
  // console.log('arrayComments', arrayComments);

  fullsizePhoto.querySelector('.current-comments-count').textContent = number;

  // Нажатие на кнопку "Загрузить еще"
  loadingComments.addEventListener('click', () => {
    if (number < comments.length) {
      console.log('number = ', number);

      const nextComments = comments.slice(number, number += 5);
      console.log('number', number);

      arrayComments.appendChild(creatingPartComments(nextComments));
      console.log('arrayComments', arrayComments);
    }
    fullsizePhoto.querySelector('.current-comments-count').textContent = number;
  });

  if (number < 5) {
    console.log('number = ', number);

    const littleComments = comments.slice(number, comments.length);

    arrayComments.appendChild(creatingPartComments(littleComments));
    console.log('arrayComments', arrayComments);

    fullsizePhoto.querySelector('.current-comments-count').textContent = comments.length; // не срабатывает

    loadingComments.classList.add('hidden'); // не срабатывает
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
  // fullsizePhoto.querySelector('.social__comment-count').classList.add('hidden');
  // fullsizePhoto.querySelector('.comments-loader').classList.add('hidden');

  body.classList.add('.modal-open');
};

export {fullsizePhoto, body, drawFullsizePhoto};
