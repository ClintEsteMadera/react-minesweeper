import axios from 'axios'
import React, { Component } from 'react'
import Board from './Board.js'

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
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

  newGame = event => {
    axios
      .post(`https://minesweeper-api.herokuapp.com/games`)
      .then({ game: this.updateState })
  }

  updateState = response => this.setState({ game: response.data })

  fetchTheBoard = () => {
    axios
      .post('https://minesweeper-api.herokuapp.com/games/')
      .then(response => {
        this.setState({
          game: response.data
        })
      })
  }

  checkCell = (rowIndex, col) => {
    this.flagOrCheck(rowIndex, col, 'check')
  }

  flagCell = (rowIndex, col) => {
    this.flagOrCheck(rowIndex, col, 'flag')
  }

  flagOrCheck = (rowIndex, col, action) => {
    console.log(this.state.game.id)
    console.log(`inside flagOrCheck ${rowIndex} ${col}`)
    axios
      .post(
        `https://minesweeper-api.herokuapp.com/games/${
          this.state.game.id
        }/${action}`,
        {
          row: rowIndex,
          col: col
        }
      )
      .then(this.updateState)
    console.log(this.state.game.id)
  }

  gameNumberRow = () => {
    if (this.state.game.id > 0) {
      return (
        <tr className="game-number-row">Game Number: {this.state.game.id}</tr>
      )
    } else {
      return <tr className="game-number-row">Please start a game</tr>
    }
  }

  render() {
    return (
      <div>
        <table>
          <tr>
            <td className="table-header">
              <select>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
              <button className="emoji-button">🙂</button>
            </td>
          </tr>
          {this.gameNumberRow()}
          <Board
            fetchTheBoard={this.fetchTheBoard}
            board={this.state.game.board}
            check={this.checkCell}
            flag={this.flagCell}
          />
          <tr>
            <td className="table-footer">
              Mines left: {this.state.game.mines}
            </td>
          </tr>
        </table>
      </div>
    )
  }
}

export default Table
