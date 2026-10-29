
"use strict";

// ---------- Gameboard ----------
const Gameboard = (() => {
  const board = Array(9).fill("");

  const getBoard = () => [...board];

  const placeMarker = (index, marker) => {
    if (!Number.isInteger(index) || index < 0 || index > 8 || board[index]) {
      return false;
    }

    board[index] = marker;
    return true;
  };

  const reset = () => board.fill("");

  return { getBoard, placeMarker, reset };
})();

// ---------- Player ----------
const createPlayer = (name, marker) => {
  let score = 0;

  return {
    name,
    marker,
    getScore: () => score,
    addScore: () => score++
  };
};

// ---------- Game rules ----------
const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function getResult(board) {
  for (const line of winningLines) {
    const [a, b, c] = line;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }

  return board.includes("") ? null : { winner: null, line: null };
}

// ---------- Game controller ----------
function createGame(player1, player2) {
  let currentPlayer = player1;
  let gameOver = false;

  const players = [player1, player2];

  const playTurn = (index) => {
    if (gameOver || !Gameboard.placeMarker(index, currentPlayer.marker)) {
      return { valid: false };
    }

    const result = getResult(Gameboard.getBoard());

    if (result) {
      gameOver = true;

      if (result.winner) {
        players.find(p => p.marker === result.winner).addScore();
      }

      return { valid: true, ...result };
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;

    return { valid: true, nextPlayer: currentPlayer };
  };

  const reset = () => {
    Gameboard.reset();
    currentPlayer = player1;
    gameOver = false;
  };

  return {
    playTurn,
    reset,
    getCurrentPlayer: () => currentPlayer,
    getBoard: Gameboard.getBoard
  };
}

// ---------- Play ----------
const player1 = createPlayer("Player 1", "O");
const player2 = createPlayer("Player 2", "X");
const game = createGame(player1, player2);

console.log(game.playTurn(0));
console.log(game.playTurn(3));
console.log(game.playTurn(1));
console.log(game.playTurn(4));
console.log(game.playTurn(2)); // Player 1 wins

console.log(player1.getScore()); // 1
