import { decorate, observable } from 'mobx'
import { GamesApi } from 'minesweeper-sdk';

const api = new GamesApi()

class Game {
  constructor() {
    this.playing = false;
    this.difficulty = 0;
    this.game = {
      id: "0",
      name: "",
      board: {
        rowsCount: 8,
        columnsCount: 8,
        minesCount: 0,
        cells: [
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
        ],
      },
      outcome: undefined
    }
  }

  // Use API to start a new game.
  startNewGame = () => {
    const gameCreationData = {
      username: "jchiocchio@gmail.com",
      rowsCount: this.getSizeRow(),
      columnsCount: this.getSizeColumn(),
      minesCount: this.getMinesCount()
    };

    api.createGame(gameCreationData).then(data => {
      this.playing = true;
      this.game = data
    })
  }

  getSizeRow() {
    switch (this.difficulty) {
      case "0":
        return 9;
      case "1":
        return 16;
      case "2":
        return 16;
      default:
        return 8;
    }
  }

  getSizeColumn() {
    switch (this.difficulty) {
      case "0":
        return 9;
      case "1":
        return 16;
      case "2":
        return 30;
      default:
        return 8;
    }
  }

  getMinesCount() {
    switch (this.difficulty) {
      case "0":
        return 10;
      case "1":
        return 40;
      case "2":
        return 99;
      default:
        return 10;
    }
  }


  // Check cells for mines by passing the API
  // ...the row and column of each cell clicked.
  // The id of the game goes into the url.
  checkCell = (row, col) => {
    // Guard clause
    // Denies user the ability to check cells before a
    // ...new game has started
    if (!this.playing) {
      return
    }
    const gameUpdate = {
      row: row,
      column: col,
      cellUpdateAction: 'REVEAL'
    }
    api.updateGame(this.game.id, gameUpdate).then(data => {
      this.game = data
    })
  }

  // flag cells that you think have mines in them
  // ...by passing the API the row and column of each
  // ...cell that is right-clicked.
  // The id of the game goes into the url.
  flagCell = (row, col) => {
    // Guard clause
    // Denies user the ability to flag cells before a
    // ...new game has started
    if (!this.playing) {
      return
    }
    const gameUpdate = {
      row: row,
      column: col,
      cellUpdateAction: 'ADD_RED_FLAG'
    }
    api.updateGame(this.game.id, gameUpdate).then(data => {
      this.game = data
    })
  };

  unFlagCell = (row, col) => {
    // Guard clause
    // Denies user the ability to flag cells before a
    // ...new game has started
    if (!this.playing) {
      return
    }
    const gameUpdate = {
      row: row,
      column: col,
      cellUpdateAction: 'UNFLAG'
    }
    api.updateGame(this.game.id, gameUpdate).then(data => {
      this.game = data
    })
  }

  // Change the size of the gameboard
  // ...depending on how hard the user wants the game.
  // Difficulty is sent to API through startNewGame function.
  chooseDifficulty = event => {
    this.difficulty = event.target.value
  }
}

decorate(Game, {
  difficulty: observable,
  playing: observable,
  game: observable
})

export default new Game()
