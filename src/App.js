import React, { Component } from 'react'
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
      if (ourGame.game.outcome === undefined) {
        return `${ourGame.game.username}`
      } else if (ourGame.game.outcome === 'WON') {
        return 'You win!'
      } else if (ourGame.game.outcome === 'LOST') {
        return 'You lose!'
      }
    }

    if (!ourGame.playing) {
      return 'Click on the smiley face to start!'
    }
  }

  // Change the emoji face based on whether
  // ...you're playing the game, won the game, or lost.
  buttonText = () => {
    if (ourGame.game.outcome === 'LOST') {
      return '😭'
    } else if (ourGame.game.outcome === 'WON') {
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
      return `${ourGame.game.board.minesCount} mines`
    } else {
      return ''
    }
  }

  // Creates the gameboard dynamically
  boardRows = () => {
    return ourGame.game.board.cells.map((row, rowIndex) => {
      return (
        <tr key={rowIndex}>
          {row.map((element, index) => {
            return <Cell key={index} row={rowIndex} column={index} mine={element.mine} revealed={element.revealed}
                         flag={element.flag} minesAround={element.minesAround}/>
          })}
        </tr>
      )
    })
  }

  // Makes the headers of the gameboard
  // ...match the length of the columns of the gameboard
  boardSize = () => {
    return ourGame.game.board.columnsCount
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
            <td className={ourGame.game.outcome} colSpan={this.boardSize()}>
              {this.headerText()}
            </td>
          </tr>
          {this.boardRows()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default observer(App)
