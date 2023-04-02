const templateFragment = document.querySelector('#picture').content;

const templatePicture = templateFragment.querySelector('.picture');

const picturesArray = document.querySelector('.pictures');

let photoId = 0;

// Создание одной картинки (фото + описание)
const createPicture = (photo) => {
  const picture = templatePicture.cloneNode(true);
  picture.id = photoId++;
  picture.querySelector('.picture__img').src = photo.url;
  picture.querySelector('.picture__likes').textContent = photo.likes;
  picture.querySelector('.picture__comments').textContent = photo.comments.length;
  picture.querySelector('.picture__img').alt = photo.description;
  picture.querySelector('.picture__img').id = photo.id;
  return picture;
};

// Создание массива картинок
const createArrayPicture = (objects) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < objects.length; i++) {
    const newPicture = createPicture(objects[i]);
    fragment.appendChild(newPicture);
  }

  picturesArray.appendChild(fragment);
  return picturesArray;
};

export {createArrayPicture};
