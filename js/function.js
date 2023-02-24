//  ФУНКЦИЯ 1

const checkLengthString = (string, maxSymbol) => string.length <= maxSymbol;

checkLengthString('hello', 3);


//  ФУНКЦИЯ 2

//  ПЕРВЫЙ ВАРИАНТ
const isPalidrom = (string) => {
  const newString = string.replace(/ /g,'').toLowerCase();

  let reverse = '';
  for (let i = newString.length - 1; i >= 0; i--) {
    reverse += newString[i];
  }

  return newString === reverse;
};

isPalidrom('Лёша на полке клопа нашёл ');


//  ВТОРОЙ ВАРИАНТ

const isPalidromTwo = (string) => {
  const newString = string.replace(/ /g,'').toLowerCase();
  const reverse = newString.split().reverse().join();
  return newString === reverse;
};

isPalidromTwo('Лёша на полке клопа нашёл ');


//  ФУНКЦИЯ 3

const getNumber = (text) => text.toString().match(/\d+/gi) ? Math.abs(text.toString().match(/\d+/gi).join('')) : NaN;

getNumber('а я томат');
// console.log(getNumber(-1.5));


// ФУНКЦИЯ 4

// имяФункции('q', 4, 'we');     // 'wweq' - в этом случае не соответствует

const makeNewString = (string, maxLength, symbol) => {
  const difference = maxLength - string.length;

  let newString = ''.concat(string);
  let newSymbol = symbol;
  if (string.length >= maxLength) {
    newString = string;
    return newString;
  } else if (symbol.length >= difference) {
    newSymbol = symbol.substr(0, difference);
    newString = newSymbol.concat(string);
    return newString;
  }
  // symbol.length < difference
  newSymbol = symbol;
  for (let i = 0; i <= difference - 2; i++) {
    newSymbol = symbol.concat(newSymbol);
  }
  newString = newSymbol.concat(string);

  return newString;
};

makeNewString('qwerty', 4, '0');
