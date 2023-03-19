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

// Функция по отрисовке/подстановке массива комментариев для одного изображения
const drawArrayComments = (comments) => {
  arrayComments.textContent = '';
  let number = 0;

  if (comments.length < 5) {
    // console.log('number (comments.length<5) = ', number);

    const littleComments = comments.slice(number, comments.length);

    arrayComments.appendChild(creatingPartComments(littleComments));
    // console.log('arrayComments (comments.length<5)', arrayComments);

    number = comments.length;
    countComments.textContent = number;
    // console.log('countComments (comments.length<5)', countComments);

    loadingComments.classList.add('hidden'); // не срабатывает
    // console.log('loadingComments (comments.length<5)', loadingComments);
  }

  const firstComments = comments.slice(number, number += 5);

  arrayComments.appendChild(creatingPartComments(firstComments));
  // console.log('arrayComments', arrayComments);

  countComments.textContent = number;
  // console.log('countComments - first', countComments);

  // Нажатие на кнопку "Загрузить еще"
  loadingComments.addEventListener('click', () => {
    if (number < comments.length) {
      // console.log('number - show more = ', number);

      const nextComments = comments.slice(number, number += 5);
      // console.log('number - show more 2 =', number);

      arrayComments.appendChild(creatingPartComments(nextComments));
      // console.log('arrayComments - show more ', arrayComments);

      countComments.textContent = number;
      // console.log('countComments- show more ', countComments);
    }
    // console.log('number (number >= comments.length) = ', number);

    const littleComments = comments.slice(number, comments.length);

    arrayComments.appendChild(creatingPartComments(littleComments));
    // console.log('arrayComments (number >= comments.length)', arrayComments);

    number = comments.length;
    countComments.textContent = number;
    // console.log('countComments (number >= comments.length)', countComments);

    loadingComments.classList.add('hidden');
    // console.log('loadingComments (number >= comments.length)', loadingComments);
  });

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

  // Временно скроем блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader
  // fullsizePhoto.querySelector('.social__comment-count').classList.add('hidden');
  // fullsizePhoto.querySelector('.comments-loader').classList.add('hidden');

  body.classList.add('.modal-open');
};

export {fullsizePhoto, body, arrayComments, countComments, loadingComments, drawFullsizePhoto};
