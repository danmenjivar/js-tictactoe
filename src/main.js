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

  const _hasTied = () => {
    return !board.includes("");
  };

  const _isGameOver = () => {
    return _hasWon() || _hasTied();
  };

  const createBoard = () => {
    board = new Array(9).fill("");
  };

  const makeMove = (move, pOne, pTwo) => {
    // console.log(`Trying to make move on cell i=${move}`);
    if (board[move] === "") {
      board[move] = Game.getPlayerOneTurn()
        ? pOne.getMarker()
        : pTwo.getMarker();
      if (_hasWon()) {
        let pName = Game.getPlayerOneTurn() ? pOne.getName() : pTwo.getName();
        DisplayController.displayWinner(pName);
      } else if (_hasTied()) {
        DisplayController.displayTie();
      }
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

  const setEventListeners = (pOne, pTwo) => {
    // set listeners for the ttt board
    for (let i = 0; i < htmlBoard.length; i++) {
      const cell = htmlBoard[i];
      cell.addEventListener("click", () => {
        if (GameBoard.makeMove(i, pOne, pTwo)) {
          if (Game.getPlayerOneTurn()) {
            cell.textContent = pOne.getMarker();
          } else {
            cell.textContent = pTwo.getMarker();
          }
          Game.togglePlayerOneTurn();
        }
      });
    }
  };

  const _clearView = () => {
    GameBoard.createBoard();
    for (let i = 0; i < htmlBoard.length; i++) {
      const cell = htmlBoard[i];
      cell.textContent = "";
    }
    Game.resetPlayerTurn();
  };

  const displaySetNames = (playerOne, playerTwo) => {
    let namesView = document.querySelector(".names-overlay");
    _setNamesOnDisplayFields(playerOne, playerTwo);
    namesView.style.display = "block";

    // Event handler for switching player names
    namesView.querySelector("#switch-mark").addEventListener("click", () => {
      let playerOneName = namesView.querySelector("#player-one");
      let playerTwoName = namesView.querySelector("#player-two");
      let temp = playerOneName.value;
      playerOneName.value = playerTwoName.value;
      playerTwoName.value = temp;
    });

    // Event handler for clicking start
    namesView.querySelector("#start-btn").addEventListener("click", () => {
      let playerOneName = namesView.querySelector("#player-one");
      playerOne.setName(playerOneName.value);
      let playerTwoName = namesView.querySelector("#player-two");
      playerTwo.setName(playerTwoName.value);

      let playerOneMark = namesView.querySelector("#player-one-mark");
      playerOne.setMarker("X");
      let playerTwoMark = namesView.querySelector("#player-two-mark");
      playerTwo.setMarker("O");

      namesView.style.display = "none";
      _clearView();
    });

    // Add event handler to names settings button
    document.querySelector("#name-btn").addEventListener("click", () => {
      // _setNamesOnDisplayFields(playerOne, playerTwo);
      namesView.style.display = "block";
    });

    // Event Handler for Reset Button
    document.querySelector("#reset-btn").addEventListener("click", () => {
      _clearView();
    });

    // Play Again
    document.querySelector("#play-again-btn").addEventListener("click", () => {
      _clearView();
      document.querySelector(".won-overlay").style.display = "none";
    });
  };

  const _setNamesOnDisplayFields = (playerOne, playerTwo) => {
    let playerOneName = document.querySelector("#player-one");
    playerOneName.value = playerOne.getName();
    let playerTwoName = document.querySelector("#player-two");
    playerTwoName.value = playerTwo.getName();
  };

  const displayWinner = (pName) => {
    let wonWindow = document.querySelector(".won-overlay ");
    let winMsg = `Congratulations ${pName}, you win!`;
    wonWindow.querySelector("p").textContent = winMsg;
    wonWindow.style.display = "block";
  };

  const displayTie = () => {
    let wonWindow = document.querySelector(".won-overlay ");
    let winMsg = `It's a tie!`;
    wonWindow.querySelector("p").textContent = winMsg;
    wonWindow.style.display = "block";
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
    displayWinner: displayWinner,
    displayTie: displayTie,
  };
})();

const Game = (() => {
  let playerOneTurn;
  let playerOne;
  let playerTwo;

  const getPlayerOneTurn = () => {
    return playerOneTurn;
  };

  const togglePlayerOneTurn = () => {
    playerOneTurn = !playerOneTurn;
  };

  const start = () => {
    playerOneTurn = true;
    playerOne = Player("Player One", "X");
    playerTwo = Player("Player Two", "O");
    DisplayController.displaySetNames(playerOne, playerTwo);
    GameBoard.createBoard();
    DisplayController.setEventListeners(playerOne, playerTwo);
  };

  const resetPlayerTurn = () => {
    playerOneTurn = true;
  };

  return {
    start: start,
    resetPlayerTurn: resetPlayerTurn,
    getPlayerOneTurn: getPlayerOneTurn,
    togglePlayerOneTurn: togglePlayerOneTurn,
  };
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

  const getMarker = () => {
    return marker;
  };

  return { name, marker, setName, getName, setMarker, getMarker };
};

Game.start();
