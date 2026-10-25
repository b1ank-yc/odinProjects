
function clearBoard(board) {
  for (let i = 0; i < board.length; i++) {
    board[i] = '';
  }
}


const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => board;

  const assignMarker = (cell, marker) => {
    const c = Number(cell);
    if (board[c] !== '' || c > 8 || c < 0) {
      return false;
    } else {
      board[c] = marker;
      return true;
    }
  }

  return { getBoard, assignMarker };
})();


function createPlayer(name, marker) {
  let score = 0;

  const addScore = () => score++;
  const getScore = () => score;
  const getMarker = () => marker;

  return { name, addScore, getScore, getMarker };
};


function checkRules(board) {

  const checkBoard = () => {
    const [a, b, c, d, e, f, g, h, i] = board;

    if (a !== '' && [a, b, c].every(value => value === a)) {
      return [a, 1];
    } else if (d !== '' && [d, e, f].every(value => value === d)) {
      return [d, 2];
    } else if (g !== '' && [g, h, i].every(value => value === g)) {
      return [g, 3];
    } else if (a !== '' && [a, d, g].every(value => value === a)) {
      return [a, 4];
    } else if (b !== '' && [b, e, h].every(value => value === b)) {
      return [b, 5];
    } else if (c !== '' && [c, f, i].every(value => value === c)) {
      return [c, 6];
    } else if (a !== '' && [a, e, i].every(value => value === a)) {
      return [a, 7];
    } else if (c !== '' && [c, e, g].every(value => value === c)) {
      return [c, 8];
    } else if (!board.includes('')) {
      return 'draw';
    } else {
      return false;
    }
  };

    return { checkBoard };
};


function playRound(board, p1, p2) {
  const status = checkRules(board.getBoard());
  let currentPlayer = 1;
  let cond = status.checkBoard();

  while (board.getBoard().includes('')) {

    if (currentPlayer === 1) {
      let result = board.assignMarker(prompt("p1"), p1.getMarker());
      if (result === false) {
        currentPlayer = 1;
        continue;
      } else {
        currentPlayer = 2;

        cond = status.checkBoard();
        if (Array.isArray(cond)) {
          p1.addScore();
          return cond;
        } else if (cond === 'draw') {
          return 'Draw';
        }
      }
    } else if (currentPlayer === 2) {
      let result = board.assignMarker(prompt("p2"), p2.getMarker());
      if (result === false) {
        currentPlayer = 2;
        continue;
      } else {
        currentPlayer = 1;
        
        cond = status.checkBoard();
        if (Array.isArray(cond)) {
          p2.addScore();
          return cond;
        } else if (cond === 'draw') {
          return "Draw";
        };
      };
    };
  };    
};


function playGame() {
  const p1 = createPlayer(prompt("p1 enter your name"), "O");
  const p2 = createPlayer(prompt("p2 enter ur name"), "X");
  let play = prompt("Do you wish to begin playing?");
  let roundResult;

  if (play !== 'Yes') {
    console.log('Refresh the page to play.');
  }

  while (play === "Yes") {
    roundResult = playRound(gameBoard, p1, p2);
    console.log(roundResult);
    if (Array.isArray(roundResult && roundResult[0] === "O")) {
      console.log(`${p1.name} won the round!`);
    } else if (Array.isArray(roundResult && oundResult[0] === "X")) {
      console.log(`${p2.name} won the round!`)
    } else {
      console.log("It was a Draw!");
    }
    console.log(`${p1.name}'s score is ${p1.getScore()}\n${p2.name}'s score is ${p2.getScore()}`);  
    clearBoard(gameBoard);
    play = prompt("Do you wish to play another round?");
  };
};


playGame();
