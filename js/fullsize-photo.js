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
  console.log('min', start);
  console.log('max', end);
  const partComments = comments.slice(start, end);
  arrayComments.appendChild(creatingPartComments(partComments));

};

// Функция по отрисовке/подстановке массива комментариев для одного изображения
const drawArrayComments = (comments) => {
  arrayComments.textContent = '';
  let number = 0;
  const n = 5;
  const maxNumber = comments.length;

  if (maxNumber <= n) {
    slicePartComments(comments, number, maxNumber);
    countComments.textContent = maxNumber;
    loadingComments.classList.add('hidden');
    console.log('Сработало условие maxNumber <= n');
  } else {
    slicePartComments(comments, number, (number + n));
    number = number + n;
    countComments.textContent = number;
    console.log('Сработало условие else');
  }

  // Нажатие на кнопку "Загрузить еще"
  loadingComments.addEventListener('click', () => {
    // number = Number(countComments.textContent);
    console.log('maxNumber - n', maxNumber - n);
    if ((maxNumber - number) <= n) {
      slicePartComments(comments, number, maxNumber);
      countComments.textContent = maxNumber;
      loadingComments.classList.add('hidden');
      console.log('Сработал click (maxNumber - number) <= n');
    } else {
      slicePartComments(comments, number, (number + n));
      number = number + n;
      countComments.textContent = number;
      console.log('Сработал click else');
    }
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

  body.classList.add('.modal-open');
};

export {fullsizePhoto, body, arrayComments, countComments, loadingComments, drawFullsizePhoto};
