let playerOneTurn = true;

// GameBoard Module
const GameBoard = (() => {
  let board;

  const createBoard = () => {
    board = new Array(9).fill(0);
  };

  const makeMove = (move) => {
    // TODO check if valid, if so make the move and display it
    console.log(`Trying to make move on cell i=${move}`);
    if (board[move] === 0) {
      board[move] = 1;
      return true;
    } else {
      return false;
    }
  };

  const hasWon = (player) => {
    // win condition: 3 rows, 3 cols, or 2 diagonals
  };

  return { createBoard, makeMove };
})();

// DisplayController Module
const DisplayController = (() => {
  let htmlBoard = document.querySelector("#ttt-grid-container").children;

  const setEventListeners = () => {
    for (let i = 0; i < htmlBoard.length; i++) {
      const cell = htmlBoard[i];
      cell.addEventListener("click", () => {
        if (GameBoard.makeMove(i)) {
          if (playerOneTurn) {
            cell.textContent = playerOne.marker;
            playerOneTurn = false;
          } else {
            cell.textContent = playerTwo.marker;
            playerOneTurn = true;
          }
        }
      });
    }
  };

  function displayBoard(board) {
    for (let i = 0; i < htmlBoard.length; i++) {
      const cell = htmlBoard[i];
      cell.textContent = "X";
      console.log(cell);
    }
  }

  return {
    displayBoard: displayBoard,
    setEventListeners: setEventListeners,
  };
})();

const Game = (() => {
  let playerOneTurn;
  let playerOne;
  let playerTwo;

  const _playerSelect = () => {};

  const start = () => {
    playerOneTurn = true;
  };

  return { start: start };
})();

// Player Object created with factory pattern
const Player = (name, marker) => {
  let score = 0;

  const getScore = () => score;

  const incrementScore = () => {
    score++;
  };

  const resetScore = () => {
    score = 0;
  };

  return { name, marker, getScore, incrementScore, resetScore };
};

DisplayController.setEventListeners();
// Start a new Game
GameBoard.createBoard();

// DisplayController.displayBoard();

let playerOne = Player("Dan", "X");
let playerTwo = Player("Tom", "O");

console.log(playerOne, playerTwo);

playerOne.incrementScore();

console.log(playerOne.getScore(), playerTwo);
