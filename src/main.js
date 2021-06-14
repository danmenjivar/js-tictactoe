// let playerOneTurn = true;

// GameBoard Module
const GameBoard = (() => {
  let board;

  const getBoard = () => {
    return board;
  };

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
    // set listeners for the ttt board
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

  const displaySetNames = (playerOne, playerTwo) => {
    let namesView = document.querySelector(".names-overlay");
    namesView.style.display = "block";

    // Event handler for switching marks
    namesView.querySelector("#switch-mark").addEventListener("click", () => {
      let playerOneMark = namesView.querySelector("#player-one-mark");
      let playerTwoMark = namesView.querySelector("#player-two-mark");
      let temp = playerOneMark.textContent;
      playerOneMark.textContent = playerTwoMark.textContent;
      playerTwoMark.textContent = temp;
    });

    // Event handler for clicking start
    namesView.querySelector("#start-btn").addEventListener("click", () => {
      let playerOneName = namesView.querySelector("#player-one");
      playerOne.setName(playerOneName.value);
      let playerTwoName = namesView.querySelector("#player-two");
      playerTwo.setName(playerTwoName.value);

      let playerOneMark = namesView.querySelector("#player-one-mark");
      playerOne.setMarker(playerOneMark.textContent);
      let playerTwoMark = namesView.querySelector("#player-two-mark");
      playerTwo.setMarker(playerTwoMark.textContent);

      namesView.style.display = "none";
    });
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
    displaySetNames: displaySetNames,
  };
})();

const Game = (() => {
  let playerOneTurn;
  let playerOne;
  let playerTwo;

  const _playerSelect = () => {};

  const start = () => {
    playerOneTurn = true;
    playerOne = Player("Player One", "X");
    playerTwo = Player("Player Two", "O");
    DisplayController.displaySetNames(playerOne, playerTwo);
  };

  const saveSettings = (playerOneSettings, playerTwoSettings) => {
    console.log("assigning names");

    playerOne.set;
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

  const setName = (newName) => {
    if (newName !== "") {
      name = newName;
    }
  };

  const getName = () => {
    return name;
  };

  const setMarker = (newMarker) => {
    marker = newMarker;
  };

  return { name, marker, setName, getName, setMarker };
};

// // Start a new Game
// GameBoard.createBoard();
// DisplayController.setEventListeners();

// let playerOne = Player("Dan", "X");
// let playerTwo = Player("Tom", "O");

// console.log(playerOne, playerTwo);

// playerOne.incrementScore();

// console.log(playerOne.getScore(), playerTwo);

// document.querySelector("#name-btn");

// // set listeners for reset button
// document.querySelector("#reset-btn").addEventListener("click", () => {
//   GameBoard.createBoard();
//   DisplayController.displayBoard(GameBoard.getBoard());
// });

Game.start();
