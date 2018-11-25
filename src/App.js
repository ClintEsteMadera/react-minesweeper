import React, { Component } from 'react'
import { decorate, computed, observable } from 'mobx'
import { observer } from 'mobx-react'

import './App.css'

import Cell from './Cell'
import ourGame from './Game'

class App extends Component {
  // Change text of gameboard header
  // ...prompting user to start new game
  // ...or displaying the number of which game they're playing.
  headerText = () => {
    if (ourGame.playing) {
      if (ourGame.api.state === 'won') {
        return 'You win!'
      } else if (ourGame.api.state === 'lost') {
        return 'You lose!'
      }
    }

    if (!ourGame.playing) {
      return 'Start a new game!'
    } else {
      return `Game number: ${ourGame.api.id}`
    }
  }

  // Change the emoji face based on whether
  // ...you're playing the game, won the game, or lost.
  buttonText = () => {
    if (ourGame.api.state === 'lost') {
      return '😭'
    } else if (ourGame.api.state === 'won') {
      return '🤩'
    } else {
      return '🙂'
    }
  }

  // Leave footer of gameboard blank
  // ...until user begins new game,
  // ...then display how many mines they have left to flag.
  minesText = () => {
    if (ourGame.playing) {
      return `${ourGame.api.mines} mines left`
    } else {
      return ''
    }
  }

  // Creates the gameboard dynamically
  boardRows = () => {
    return ourGame.api.board.map((row, rowIndex) => {
      return (
        <tr key={rowIndex}>
          {row.map((value, index) => {
            return <Cell key={index} row={rowIndex} col={index} value={value} />
          })}
        </tr>
      )
    })
  }

  // Makes the headers and footer of the gameboard
  // ...match the length of the rows of the gameboard
  boardSize = () => {
    return ourGame.api.board[0].length
  }

  render() {
    return (
      <div className="App">
        <table>
          <tbody>
            <tr>
              <td className="header" colSpan={this.boardSize()}>
                <select onChange={ourGame.chooseDifficulty}>
                  <option value="0">Easy</option>
                  <option value="1">Intermediate</option>
                  <option value="2">Expert</option>
                </select>
                <button onClick={ourGame.startNewGame}>
                  {this.buttonText()}
                </button>
              </td>
            </tr>
            <tr>
              <td className={ourGame.api.state} colSpan={this.boardSize()}>
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
export default observer(App)
