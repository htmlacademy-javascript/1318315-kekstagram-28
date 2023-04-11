const templateFragment = document.querySelector('#picture').content;

const templatePicture = templateFragment.querySelector('.picture');

const picturesArray = document.querySelector('.pictures');

// Создание одной картинки (фото + описание)
const CreatePicture = (Object) => {
  const picture = templatePicture.cloneNode(true);
  picture.id = Object.id;
  picture.querySelector('.picture__img').src = Object.url;
  picture.querySelector('.picture__likes').textContent = Object.likes;
  picture.querySelector('.picture__comments').textContent = Object.comments.length;
  picture.querySelector('.picture__img').alt = Object.description;
  return picture;
};

// Создание массива картинок
const CreatePictures = (objects) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < objects.length; i++) {
    const newPicture = CreatePicture(objects[i]);
    fragment.appendChild(newPicture);
  }

  picturesArray.appendChild(fragment);
  return picturesArray;
};

export {CreatePictures};
