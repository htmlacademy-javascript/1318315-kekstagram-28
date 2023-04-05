import {createArrayPicture} from './rendering-photo.js';

const sectionPictures = (Object) => createArrayPicture(Object);

// Загрузка данных с удаленного сервера
fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((miniatures) => {
    console.log('miniatures', miniatures);
    const miniaturesRenderingServer = sectionPictures(miniatures);
    console.log('miniaturesRenderingServer', miniaturesRenderingServer);
  });
