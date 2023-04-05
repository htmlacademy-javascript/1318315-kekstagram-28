// Загрузка данных с удаленного сервера
fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((miniatures) => {
    console.log('miniatures', miniatures);
  });
