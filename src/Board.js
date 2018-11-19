import React, { Component } from 'react'
import Cell from './Cell.js'

class Board extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  check = () => {}

  render() {
    return (
      <div>
        {Object.values(this.props.board).map((row, rowIndex) => {
          return (
            <tr>
              <Cell
                value={row[0]}
                col={0}
                rowIndex={rowIndex}
                check={this.props.check}
                flag={this.props.flag}
              />
              <Cell
                value={row[1]}
                col={1}
                rowIndex={rowIndex}
                check={this.props.check}
                flag={this.props.flag}
              />
              <Cell
                value={row[2]}
                col={2}
                rowIndex={rowIndex}
                check={this.props.check}
                flag={this.props.flag}
              />
              <Cell
                value={row[3]}
                col={3}
                rowIndex={rowIndex}
                check={this.props.check}
                flag={this.props.flag}
              />
              <Cell
                value={row[4]}
                col={4}
                rowIndex={rowIndex}
                check={this.props.check}
                flag={this.props.flag}
              />
              <Cell
                value={row[5]}
                col={5}
                rowIndex={rowIndex}
                check={this.props.check}
                flag={this.props.flag}
              />
              <Cell
                value={row[6]}
                col={6}
                rowIndex={rowIndex}
                check={this.props.check}
                flag={this.props.flag}
              />
              <Cell
                value={row[7]}
                col={7}
                rowIndex={rowIndex}
                check={this.props.check}
                flag={this.props.flag}
              />
            </tr>
          )
        })}
        <button onClick={this.props.fetchTheBoard}>New Game</button>
      </div>
    )
  }
}

export default Board
