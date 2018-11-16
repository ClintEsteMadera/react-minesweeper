import React, { Component } from 'react'
import Cell from './Cell.js'

class Board extends Component {
  render() {
    return (
      <div>
        {Object.values(this.props.board).map(row => {
          return (
            <tr>
              <Cell value={row[0]} />
              <Cell value={row[1]} />
              <Cell value={row[2]} />
              <Cell value={row[3]} />
              <Cell value={row[4]} />
              <Cell value={row[5]} />
              <Cell value={row[6]} />
              <Cell value={row[7]} />
            </tr>
          )
        })}
        <button onClick={this.props.fetchTheBoard}>New Game</button>
      </div>
    )
  }
}

export default Board
