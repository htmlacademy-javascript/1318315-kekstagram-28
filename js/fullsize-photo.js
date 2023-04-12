import {isEscKeydown} from './utils.js';

const IMG_WIDTH = 35;
const IMG_HEIGHT = 35;

const bodyElement = document.querySelector('body');
const fullsizePhotoElement = document.querySelector('.big-picture');
const arrayCommentsElement = fullsizePhotoElement.querySelector('.social__comments');
const countCommentsElement = fullsizePhotoElement.querySelector('.current-comments-count');
const loadingCommentsElement = fullsizePhotoElement.querySelector('.comments-loader');
const closeElement = fullsizePhotoElement.querySelector('#picture-cancel');


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
  arrayCommentsElement.appendChild(creatingPartComments(partComments));
};

// Функция по отрисовке/подстановке массива комментариев для одного изображения
const drawArrayComments = (comments) => {
  arrayCommentsElement.textContent = '';
  let valueCountComments = 0;
  const STEP_COUNT = 5;
  const maxValueCountComments = comments.length;

  const sliceSmallPart = () => {
    slicePartComments(comments, valueCountComments, maxValueCountComments);
    countCommentsElement.textContent = maxValueCountComments;
    loadingCommentsElement.classList.add('hidden');
  };

  const sliceNextPart = () => {
    slicePartComments(comments, valueCountComments, (valueCountComments + STEP_COUNT));
    valueCountComments = valueCountComments + STEP_COUNT;
    countCommentsElement.textContent = valueCountComments;
  };

  const showFirstComments = () => (maxValueCountComments <= STEP_COUNT) ? sliceSmallPart() : sliceNextPart();
  showFirstComments();

  // Нажатие на кнопку "Загрузить еще"
  const onLoadingCommentsElementToShowMore = () => ((maxValueCountComments - valueCountComments) <= STEP_COUNT) ? sliceSmallPart() : sliceNextPart();

  loadingCommentsElement.addEventListener('click', onLoadingCommentsElementToShowMore);

  // Удаляю обработчик клика на кнопку "Загрузить еще", чтобы удалять то что запоминает колбэк-функция
  fullsizePhotoElement.querySelector('#picture-cancel').onclick = function () {
    loadingCommentsElement.removeEventListener('click', onLoadingCommentsElementToShowMore);
  };

  // Удаляю обработчик Esc, чтобы удалять то что запоминает колбэк-функция при нажатии на кнопку "Загрузить еще"
  document.onkeydown = function (evt) {
    if (isEscKeydown(evt)) {
      evt.preventDefault();
      loadingCommentsElement.removeEventListener('click', onLoadingCommentsElementToShowMore);
    }
  };

  return arrayCommentsElement;
};

// Функция по отрисовке полноэкранного фото
const drawFullsizePhoto = (photo) => {
  fullsizePhotoElement.classList.remove('hidden');

  fullsizePhotoElement.querySelector('.big-picture__img img').src = photo.url;

  fullsizePhotoElement.querySelector('.social__caption').textContent = photo.description;

  fullsizePhotoElement.querySelector('.likes-count').textContent = '';
  fullsizePhotoElement.querySelector('.likes-count').textContent = photo.likes;

  fullsizePhotoElement.querySelector('.comments-count').textContent = photo.comments.length;

  drawArrayComments(photo.comments);
  fullsizePhotoElement.querySelector('.social__comments').replaceWith(arrayCommentsElement);

  bodyElement.classList.add('.modal-open');
};


// Инициализация/настройка миниатюр для отображения полноэкранного изображения (навешивание обработчика событий)

const initPictures = (data) => {
  // Поиск массива в DOM, чтобы его перебрать и навесить обработчик клика
  const photos = document.querySelectorAll('.picture');

  photos.forEach((photo) => {
    photo.addEventListener('click', (evt) => {
      drawFullsizePhoto(data[evt.currentTarget.id]); // photo должно браться из массива photos, который мы находим на странице, после отрисовки данных с сервера
      onCloseElementToCloseFullsizePhotoEventListenersCreate(); // Создаю обработчики полноэкранного фото
    });
  });
};


// Закрываю окно полноэкранного отображения картинки

const closePhoto = () => {
  bodyElement.classList.remove('.modal-open');
  fullsizePhotoElement.classList.add('hidden');
  arrayCommentsElement.textContent = '';
  countCommentsElement.textContent = '0';
  loadingCommentsElement.classList.remove('hidden');
  onCloseElementToCloseFullsizePhotoEventListenersDelete(); // Удаляю обработчики закрытия полноэкранного изображения
  document.onkeydown = null;
};

const onCloseElementToCloseFullsizePhoto = (evt) => {
  evt.preventDefault();
  closePhoto();
};

const onDocumentToEscCloseFullsizePhoto = (evt) => {
  if (isEscKeydown(evt)) {
    evt.preventDefault();
    closePhoto();
  }
};

// Создаю обработчики закрытия полноэкранного изображения
function onCloseElementToCloseFullsizePhotoEventListenersCreate() {
  closeElement.addEventListener('click', onCloseElementToCloseFullsizePhoto);
  document.addEventListener('keydown', onDocumentToEscCloseFullsizePhoto);
}

// Удаляю обработчики закрытия полноэкранного изображения
function onCloseElementToCloseFullsizePhotoEventListenersDelete() {
  closeElement.removeEventListener('click', onCloseElementToCloseFullsizePhoto);
  document.removeEventListener('keydown', onDocumentToEscCloseFullsizePhoto);
}

export {initPictures};
