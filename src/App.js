import React, { Component } from 'react'
import axios from 'axios'

import './App.css'

import Cell from './Cell'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playing: false,
      difficulty: 0,
      game: {
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
  }

  // Use API to start a new game.
  startNewGame = event => {
    axios
      .post('https://minesweeper-api.herokuapp.com/games/', {
        difficulty: this.state.difficulty
      })
      .then(response => {
        this.setState({
          playing: true,
          game: response.data
        })
      })
  }

  // Change text of gameboard header
  // ...prompting user to start new game
  // ...or displaying the number of which game they're playing.
  headerText = () => {
    if (this.state.playing) {
      if (this.state.game.state === 'won') {
        return 'You win!'
      } else if (this.state.game.state === 'lost') {
        return 'You lose!'
      }
    }

    if (!this.state.playing) {
      return 'Start a new game!'
    } else {
      return `Game number: ${this.state.game.id}`
    }
  }

  // Change the emoji face based on whether
  // ...you're playing the game, won the game, or lost.
  buttonText = () => {
    if (this.state.game.state === 'lost') {
      return '😭'
    } else if (this.state.game.state === 'won') {
      return '🤩'
    } else {
      return '🙂'
    }
  }

  // Leave footer of gameboard blank
  // ...until user begins new game,
  // ...then display how many mines they have left to flag.
  minesText = () => {
    if (this.state.playing) {
      return `${this.state.game.mines} mines left`
    } else {
      return ''
    }
  }

  // Change the size of the gameboard
  // ...depending on how hard the user wants the game.
  // Difficulty is sent to API through startNewGame function.
  chooseDifficulty = event => {
    this.setState({
      difficulty: parseInt(event.target.value)
    })
  }

  // Creates the gameboard dynamically
  boardRows = () => {
    return this.state.game.board.map((row, rowIndex) => {
      return (
        <tr key={rowIndex}>
          {row.map((value, index) => {
            return (
              <Cell
                key={index}
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={rowIndex}
                col={index}
                value={value}
              />
            )
          })}
        </tr>
      )
    })
  }

  // Makes the headers and footer of the gameboard
  // ...match the length of the rows of the gameboard
  boardSize = () => {
    return this.state.game.board[0].length
  }

  // Check cells for mines by passing the API
  // ...the row and column of each cell clicked.
  // The id of the game goes into the url.
  checkCell = (row, col) => {
    // Guard clause
    // Denies user the ability to check cells before a
    // ...new game has started
    if (!this.state.playing) {
      return
    }
    axios
      .post(
        `https://minesweeper-api.herokuapp.com/games/${
          this.state.game.id
        }/check`,
        {
          row: row,
          col: col
        }
      )
      .then(response => {
        this.setState({
          game: response.data
        })
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
    if (!this.state.playing) {
      return
    }
    axios
      .post(
        `https://minesweeper-api.herokuapp.com/games/${
          this.state.game.id
        }/flag`,
        {
          row: row,
          col: col
        }
      )
      .then(response => {
        this.setState({
          game: response.data
        })
      })
  }

  render() {
    return (
      <div className="App">
        <table>
          <tbody>
            <tr>
              <td className="header" colSpan={this.boardSize()}>
                <select onChange={this.chooseDifficulty}>
                  <option value="0">Easy</option>
                  <option value="1">Intermediate</option>
                  <option value="2">Expert</option>
                </select>
                <button onClick={this.startNewGame}>{this.buttonText()}</button>
              </td>
            </tr>
            <tr>
              <td className={this.state.game.state} colSpan={this.boardSize()}>
                {this.headerText()}
              </td>
            </tr>
            {this.boardRows()}
            <tr>
              <td className="footer" colSpan={this.boardSize()}>
                {this.minesText()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
export default App
