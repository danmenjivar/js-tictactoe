let playerOneTurn = true;

// GameBoard Module
const GameBoard = (() => {
  let board;

  const _hasWon = () => {
    // win condition: 3 rows, 3 cols, or 2 diagonals
    let winConditions = [
      [board[0], board[4], board[8]], // diagonals: [0,4,8] & [2,4,6]
      [board[2], board[4], board[6]],
      [board[0], board[3], board[6]], // cols: [0,3,6], [1,4,7], [2,5,8]
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
      [board[0], board[1], board[2]], // rows: [0,1,2], [3,4,5], [6,7,8]
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
    ];

    let won = false;
    for (let condition of winConditions) {
      if (
        condition.every((cell) => cell === "X") ||
        condition.every((cell) => cell === "O")
      ) {
        won = true;
      }
    }

    return won;
  };

  const createBoard = () => {
    board = new Array(9).fill("");
  };

  const makeMove = (move) => {
    console.log(`Trying to make move on cell i=${move}`);
    if (board[move] === "") {
      board[move] = playerOneTurn ? playerOne.marker : playerTwo.marker;
      _hasWon();
      return true;
    } else {
      return false;
    }
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

let playerOne = Player("Dan", "X");
let playerTwo = Player("Tom", "O");

console.log(playerOne, playerTwo);

playerOne.incrementScore();

console.log(playerOne.getScore(), playerTwo);
