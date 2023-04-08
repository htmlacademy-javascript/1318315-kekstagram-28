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

const getNumber = (text) => String(text).match(/[0-9]+/gi) ? Math.abs(String(text).match(/[0-9]+/gi).join('')) : NaN;

getNumber('а я томат');


// ФУНКЦИЯ 4

const makeNewString = (string, maxLength, symbol) => {
  const difference = maxLength - string.length;

  let newString = ''.concat(string);
  let newSymbol = symbol;

  if (string.length >= maxLength) {
    return string;
  } else if (symbol.length >= difference) {
    newSymbol = symbol.substr(0, difference);
    newString = newSymbol.concat(string);
    return newString;
  }
  newSymbol = symbol.slice(0, difference % symbol.length) + symbol.repeat(difference / symbol.length);
  newString = newSymbol.concat(string);
  return newString;
};

makeNewString('q', 4, 'we');
