console.log('funguju');

let player = 'circle';

const policko = document.querySelectorAll('.policko-btn');

const hraje = (event) => {
  event.target.classList.add('zahrany_tah');
  event.target.disabled = true;
  const playerIcon = document.querySelector('.ikony');
  event.target.classList.add(`policko--${player}`);
  player = player === 'circle' ? 'cross' : 'circle';
  playerIcon.src = `${player}.svg`;

  if (isWinningMove(event.target)) {
    if (player === 'cross') {
      confirm('Hráč, který měl kolečka, vyhrává!');
    } else {
      confirm('Hráč, který měl křížek vyhrává!');
    }
  }
};

const getSymbol = (policko) => {
  if (policko.classList.contains('policko--cross')) {
    return 'cross';
  } else if (policko.classList.contains('policko--circle')) {
    return 'circle';
  }
};

const boardSize = 10;

const getField = (row, column) => {
  return policko[row * boardSize + column];
};

console.log(getField(1, 3));

const getPosition = (button) => {
  let fieldIndex = 0;
  while (fieldIndex < policko.length && button !== policko[fieldIndex]) {
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};
console.log(getPosition(1, 3));

const symbolsToWin = 5;
const isWinningMove = (policko) => {
  const origin = getPosition(policko);
  const symbol = getSymbol(policko);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  return false;
};

for (let i = 0; i < policko.length; i++) {
  policko[i].addEventListener('click', hraje);
}
