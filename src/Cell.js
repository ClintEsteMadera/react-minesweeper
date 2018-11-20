import React, { Component } from 'react'

class Cell extends Component {
  // allows cell to be checked for mines
  checkCell = event => {
    this.props.checkCell(this.props.row, this.props.col)
  }

  // allows cell to be flagged,
  // ...meaning you think a mine is in it
  flagCell = event => {
    event.preventDefault()
    this.props.flagCell(this.props.row, this.props.col)
  }

  render() {
    return (
      <td onClick={this.checkCell} onContextMenu={this.flagCell}>
        {this.props.value}
      </td>
    )
  }
}

export default Cell
