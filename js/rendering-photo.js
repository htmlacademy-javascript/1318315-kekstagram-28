import {createArrayPhotos} from './pattern-photo.js';

const templateFragment = document.querySelector('#picture').content;
console.log('templateFragment', templateFragment);

const templatePicture = templateFragment.querySelector('.picture');
console.log('templatePicture', templatePicture);

const picturesArray = document.querySelector('.pictures');
console.log('picturesArray -', picturesArray);

// Создание одной картинки (фото + описание)
const cteatePicture = (photo) => {
  const picture = templatePicture.cloneNode(true);
  console.log('picture', picture);

  picture.querySelector('.picture__img').src = photo.url;
  console.log('picture.querySelector(.picture__img).src =', picture.querySelector('.picture__img').src);

  picture.querySelector('.picture__likes').textContent = photo.likes;
  console.log('picture.querySelector(.picture__likes).textContent =', picture.querySelector('.picture__likes').textContent);

  picture.querySelector('.picture__comments').textContent = photo.comments.length;
  console.log('picture.querySelector(.picture__comments).textContent', picture.querySelector('.picture__comments').textContent);

  console.log('picture - ', picture);
  return picture;
};

// Создание массива картинок
const cteateArrayPicture = (objects) => {
  const fragment = document.createDocumentFragment();
  console.log('fragment -', fragment);
  for (let i = 0; i < objects.length; i++) {


    const newPicture = cteatePicture(objects[i]);
    console.log('newPicture -', newPicture);

    fragment.appendChild(newPicture);
    console.log('fragment 2-', fragment);


  }
  console.log('picturesArray -', picturesArray);
  picturesArray.appendChild(fragment);
  console.log('picturesArray 2-', picturesArray);

  console.log('picturesArray 3-', picturesArray);
  return picturesArray;
};

const dataPhotosArray = createArrayPhotos();

// cteateArrayPicture(dataPhotosArray);
console.log(cteateArrayPicture(dataPhotosArray));
