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

  // Check cells for mines by passing the API
  // ...the row and column of each cell clicked.
  // The id of the game goes into the url.
  checkCell = (row, col) => {
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
              <td className="header" colSpan="8">
                <select onChange={this.chooseDifficulty}>
                  <option value="0">Easy</option>
                  <option value="1">Intermediate</option>
                  <option value="2">Expert</option>
                </select>
                <button onClick={this.startNewGame}>{this.buttonText()}</button>
              </td>
            </tr>
            <tr>
              <td className="header not-playing" colSpan="8">
                {this.headerText()}
              </td>
            </tr>
            <tr>
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={0}
                col={0}
                value={this.state.game.board[0][0]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={0}
                col={1}
                value={this.state.game.board[0][1]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={0}
                col={2}
                value={this.state.game.board[0][2]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={0}
                col={3}
                value={this.state.game.board[0][3]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={0}
                col={4}
                value={this.state.game.board[0][4]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={0}
                col={5}
                value={this.state.game.board[0][5]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={0}
                col={6}
                value={this.state.game.board[0][6]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={0}
                col={7}
                value={this.state.game.board[0][7]}
              />
            </tr>
            <tr>
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={1}
                col={0}
                value={this.state.game.board[1][0]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={1}
                col={1}
                value={this.state.game.board[1][1]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={1}
                col={2}
                value={this.state.game.board[1][2]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={1}
                col={3}
                value={this.state.game.board[1][3]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={1}
                col={4}
                value={this.state.game.board[1][4]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={1}
                col={5}
                value={this.state.game.board[1][5]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={1}
                col={6}
                value={this.state.game.board[1][6]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={1}
                col={7}
                value={this.state.game.board[1][7]}
              />
            </tr>
            <tr>
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={2}
                col={0}
                value={this.state.game.board[2][0]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={2}
                col={1}
                value={this.state.game.board[2][1]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={2}
                col={2}
                value={this.state.game.board[2][2]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={2}
                col={3}
                value={this.state.game.board[2][3]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={2}
                col={4}
                value={this.state.game.board[2][4]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={2}
                col={5}
                value={this.state.game.board[2][5]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={2}
                col={6}
                value={this.state.game.board[2][6]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={2}
                col={7}
                value={this.state.game.board[2][7]}
              />
            </tr>
            <tr>
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={3}
                col={0}
                value={this.state.game.board[3][0]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={3}
                col={1}
                value={this.state.game.board[3][1]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={3}
                col={2}
                value={this.state.game.board[3][2]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={3}
                col={3}
                value={this.state.game.board[3][3]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={3}
                col={4}
                value={this.state.game.board[3][4]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={3}
                col={5}
                value={this.state.game.board[3][5]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={3}
                col={6}
                value={this.state.game.board[3][6]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={3}
                col={7}
                value={this.state.game.board[3][7]}
              />
            </tr>
            <tr>
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={4}
                col={0}
                value={this.state.game.board[4][0]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={4}
                col={1}
                value={this.state.game.board[4][1]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={4}
                col={2}
                value={this.state.game.board[4][2]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={4}
                col={3}
                value={this.state.game.board[4][3]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={4}
                col={4}
                value={this.state.game.board[4][4]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={4}
                col={5}
                value={this.state.game.board[4][5]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={4}
                col={6}
                value={this.state.game.board[4][6]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={4}
                col={7}
                value={this.state.game.board[4][7]}
              />
            </tr>
            <tr>
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={5}
                col={0}
                value={this.state.game.board[5][0]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={5}
                col={1}
                value={this.state.game.board[5][1]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={5}
                col={2}
                value={this.state.game.board[5][2]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={5}
                col={3}
                value={this.state.game.board[5][3]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={5}
                col={4}
                value={this.state.game.board[5][4]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={5}
                col={5}
                value={this.state.game.board[5][5]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={5}
                col={6}
                value={this.state.game.board[5][6]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={5}
                col={7}
                value={this.state.game.board[5][7]}
              />
            </tr>
            <tr>
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={6}
                col={0}
                value={this.state.game.board[6][0]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={6}
                col={1}
                value={this.state.game.board[6][1]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={6}
                col={2}
                value={this.state.game.board[6][2]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={6}
                col={3}
                value={this.state.game.board[6][3]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={6}
                col={4}
                value={this.state.game.board[6][4]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={6}
                col={5}
                value={this.state.game.board[6][5]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={6}
                col={6}
                value={this.state.game.board[6][6]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={6}
                col={7}
                value={this.state.game.board[6][7]}
              />
            </tr>
            <tr>
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={7}
                col={0}
                value={this.state.game.board[7][0]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={7}
                col={1}
                value={this.state.game.board[7][1]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={7}
                col={2}
                value={this.state.game.board[7][2]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={7}
                col={3}
                value={this.state.game.board[7][3]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={7}
                col={4}
                value={this.state.game.board[7][4]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={7}
                col={5}
                value={this.state.game.board[7][5]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={7}
                col={6}
                value={this.state.game.board[7][6]}
              />
              <Cell
                checkCell={this.checkCell}
                flagCell={this.flagCell}
                row={7}
                col={7}
                value={this.state.game.board[7][7]}
              />
            </tr>
            <tr>
              <td className="header" colSpan="8">
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
