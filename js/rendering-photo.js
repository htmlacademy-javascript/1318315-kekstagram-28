const templateFragmentElement = document.querySelector('#picture').content;
const templatePictureElement = templateFragmentElement.querySelector('.picture');
const picturesArrayElement = document.querySelector('.pictures');

// Создание одной картинки (фото + описание)
const createPicture = (Object) => {
  const picture = templatePictureElement.cloneNode(true);
  picture.id = Object.id;
  picture.querySelector('.picture__img').src = Object.url;
  picture.querySelector('.picture__likes').textContent = Object.likes;
  picture.querySelector('.picture__comments').textContent = Object.comments.length;
  picture.querySelector('.picture__img').alt = Object.description;
  return picture;
};

// Создание массива картинок
const createPictures = (objects) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < objects.length; i++) {
    const newPicture = createPicture(objects[i]);
    fragment.appendChild(newPicture);
  }

  picturesArrayElement.appendChild(fragment);
  return picturesArrayElement;
};

export {createPictures};
