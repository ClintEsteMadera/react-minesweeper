import { decorate, computed, observable } from 'mobx'
import { observer } from 'mobx-react'
import axios from 'axios'

class Game {
  constructor() {
    this.playing = false
    this.difficulty = 0
    this.api = {
      id: 0,
      board: [
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
      ],
      state: 'new',
      mines: 10
    }
  }

  // Use API to start a new game.
  startNewGame = () => {
    axios
      .post('https://minesweeper-api.herokuapp.com/games/', {
        difficulty: this.difficulty
      })
      .then(response => {
        this.playing = true
        this.api = response.data
      })
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
    axios
      .post(
        `https://minesweeper-api.herokuapp.com/games/${this.api.id}/check`,
        {
          row: row,
          col: col
        }
      )
      .then(response => {
        this.api = response.data
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
    axios
      .post(`https://minesweeper-api.herokuapp.com/games/${this.api.id}/flag`, {
        row: row,
        col: col
      })
      .then(response => {
        this.api = response.data
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
  api: observable
})

export default new Game()
