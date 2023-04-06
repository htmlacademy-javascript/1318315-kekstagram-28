const templateFragment = document.querySelector('#picture').content;

const templatePicture = templateFragment.querySelector('.picture');

const picturesArray = document.querySelector('.pictures');

let photoId = 0;
let dataId = 0;

// Создание одной картинки (фото + описание)
const createPicture = (Object) => {
  const picture = templatePicture.cloneNode(true);
  picture.id = photoId++;
  picture.querySelector('.picture__img').src = Object.url;
  picture.querySelector('.picture__likes').textContent = Object.likes;
  picture.querySelector('.picture__comments').textContent = Object.comments.length;
  picture.querySelector('.picture__img').alt = Object.description;
  return picture;
};

// Создание массива картинок
const createArrayPicture = (objects) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < objects.length; i++) {
    const newPicture = createPicture(objects[i]);
    //Здесь создаю "data-id", а не "id", чтобы атрибут data-id прописывался сссылке/объекту <a><img>...</a>, а не просто одной картинке (без коментариев, лайков...) <a><img>...</a>
    newPicture.dataset.id = dataId++;
    fragment.appendChild(newPicture);
  }

  picturesArray.appendChild(fragment);
  return picturesArray;
};

export {createArrayPicture};
// export {createArrayPicture} into fullsize-photo-open.js
