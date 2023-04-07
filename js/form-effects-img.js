// const imgPreview = document.querySelector('.img-upload__preview img'); // img - <div><img></div>
// const effects = document.querySelector('.effects__list');
// const slider = document.querySelector('.img-upload__effect-level');
// const sliderHandle = document.querySelector('.effect-level__slider');
// const levelEffect = document.querySelector('.effect-level__value');

// // Значение слайдера по-умолчанию
// noUiSlider.create(sliderHandle, {
//   range: {
//     min: 0,
//     max: 100,
//   },
//   start: 100,
//   step: 1,
//   connect: 'lower',
//   format: {
//     to: function (value) {
//       if (Number.isInteger(value)) {
//         return value.toFixed(0);
//       }
//       return value.toFixed(1);
//     },
//     from: function (value) {
//       return parseFloat(value);
//     },
//   },
// });

// // Значения слайдера по каждому эффекту
// const noneUpdateOptions = () => {
//   sliderHandle.noUiSlider.updateOptions({
//     range: {
//       min: 0,
//       max: 100,
//     },
//     start: 100,
//     step: 1,
//   });
// };

// const chromeUpdateOptions = () => {
//   sliderHandle.noUiSlider.updateOptions({
//     range: {
//       min: 0,
//       max: 1,
//     },
//     start: 1,
//     step: 0.1,
//   });
// };

// const sepiaUpdateOptions = () => {
//   sliderHandle.noUiSlider.updateOptions({
//     range: {
//       min: 0,
//       max: 1,
//     },
//     start: 1,
//     step: 0.1,
//   });
// };

// const marvinUpdateOptions = () => {
//   sliderHandle.noUiSlider.updateOptions({
//     range: {
//       min: 0,
//       max: 100,
//     },
//     start: 100,
//     step: 1,
//   });
// };

// const phobosUpdateOptions = () => {
//   sliderHandle.noUiSlider.updateOptions({
//     range: {
//       min: 0,
//       max: 3,
//     },
//     start: 3,
//     step: 0.1,
//   });
// };

// const heatUpdateOptions = () => {
//   sliderHandle.noUiSlider.updateOptions({
//     range: {
//       min: 1,
//       max: 3,
//     },
//     start: 3,
//     step: 0.1,
//   });
// };

// // Переключение значений слайдера в зависимости от выбранного эффекта
// const toUpdateHandle = (effect) => {
//   switch (effect) {
//     case 'none':
//       noneUpdateOptions();
//       break;
//   }
//   switch (effect) {
//     case 'chrome':
//       chromeUpdateOptions();
//       break;
//   }
//   switch (effect) {
//     case 'sepia':
//       sepiaUpdateOptions();
//       break;
//   }
//   switch (effect) {
//     case 'marvin':
//       marvinUpdateOptions();
//       break;
//   }
//   switch (effect) {
//     case 'phobos':
//       phobosUpdateOptions();
//       break;
//   }
//   switch (effect) {
//     case 'heat':
//       heatUpdateOptions();
//       break;
//   }
// };

// // "Включение" слайдера === удаление "отключённого" состояния слайдера
// const removeDisabled = () => {
//   slider.removeAttribute('disabled');
//   sliderHandle.removeAttribute('disabled');
//   levelEffect.removeAttribute('disabled');
// };

// // Блокировка слайдера === установить "отключённое" состояние слайдера
// const setDisabled = () => {
//   slider.setAttribute('disabled', '');
//   sliderHandle.setAttribute('disabled', '');
//   levelEffect.setAttribute('disabled', '');
// };

// // Наложение/добавление эфффекта на фотографию
// const toAddEffects = (effect, value) => {
//   switch (effect) {
//     case 'none':
//       setDisabled();
//       imgPreview.removeAttribute('class');
//       imgPreview.style.filter = '';
//       break;
//     case 'chrome':
//       removeDisabled();
//       imgPreview.removeAttribute('class');
//       imgPreview.classList.add('effects__preview--chrome');
//       imgPreview.style.filter = `grayscale(${value})`;
//       break;
//     case 'sepia':
//       removeDisabled();
//       imgPreview.removeAttribute('class');
//       imgPreview.classList.add('effects__preview--sepia');
//       imgPreview.style.filter = `sepia(${value})`;
//       break;
//     case 'marvin':
//       removeDisabled();
//       imgPreview.removeAttribute('class');
//       imgPreview.classList.add('effects__preview--marvin');
//       imgPreview.style.filter = `invert(${value}%)`;
//       break;
//     case 'phobos':
//       removeDisabled();
//       imgPreview.removeAttribute('class');
//       imgPreview.classList.add('effects__preview--phobos');
//       imgPreview.style.filter = `blur(${value}px)`;
//       break;
//     case 'heat':
//       removeDisabled();
//       imgPreview.removeAttribute('class');
//       imgPreview.classList.add('effects__preview--heat');
//       imgPreview.style.filter = `brightness(${value})`;
//       break;
//   }
// };

// // Получение значений с "ручки" слайдера и "выбранного(:checked)" эффекта при помощи встроенного обработчика событий библиотеки noUiSlider
// sliderHandle.noUiSlider.on('update', () => {
//   const value = sliderHandle.noUiSlider.get();
//   levelEffect.value = value;

//   const effect = document.querySelector('input[name="effect"]:checked').value;

//   toAddEffects(effect, value);
// });

// // Обработчик событий (addEventListener) передаст значения выбранного эффекта (evt.target.value) в написанные ранее функции (1- Переключение значений слайдера; 2- Наложение эфффекта на фотографию)

// const selectedEffect = (evt) => {
//   evt.preventDefault();
//   toUpdateHandle(evt.target.value);
//   toAddEffects(evt.target.value, sliderHandle.noUiSlider.get());
// };

// const toCreateEffectsPhotoEventListeners = () => effects.addEventListener('change', selectedEffect);

// // Сброс/Обнуление эффекта
// const toResetEffects = () => {
//   setDisabled();
//   imgPreview.removeAttribute('class');
//   imgPreview.style.filter = '';
//   noneUpdateOptions();
// };

// export {noneUpdateOptions, toResetEffects, effects, selectedEffect, toCreateEffectsPhotoEventListeners};

// Записала удаление EventListener со строки 210(effects.addEventListener('change', selectedEffect)) в файле remove-event-listener.js, а вызываю это удаление в файле form-upload-img.js в строке 26(toDeleteCloseFormEventListeners()).
