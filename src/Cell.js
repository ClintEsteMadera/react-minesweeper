import React, { Component } from 'react'
import { decorate, computed, observable } from 'mobx'
import { observer } from 'mobx-react'

import ourGame from './Game'

class Cell extends Component {
  // Allows cell to be checked for mines
  checkCell = event => {
    ourGame.checkCell(this.props.row, this.props.col)
  }

  // Allows cell to be flagged,
  // ...meaning you think a mine is in it
  flagCell = event => {
    event.preventDefault()
    ourGame.flagCell(this.props.row, this.props.col)
  }

  // Allows program to assign classNames to cells
  // ...dynamically by pairing the cell's value
  // ...with a className that we style in the CSS file.
  cellClassName = () => {
    // Lookup table
    const CELLCLASSNAMES = {
      '1': 'cell-1',
      '2': 'cell-2',
      '3': 'cell-3',
      '4': 'cell-4',
      '5': 'cell-5',
      '6': 'cell-6',
      '7': 'cell-7',
      '8': 'cell-8',
      '9': 'cell-9',
      ' ': 'cell-covered',
      F: 'cell-flagged',
      '@': 'cell-flagged',
      '*': 'cell-bomb'
    }
    return CELLCLASSNAMES[this.props.value] || 'cell-exposed'
  }

  // Allows program to display a symbol we choose within the cell
  // ...as opposed to just the characters the API defaults to.
  lookupSymbol = () => {
    // Lookup table
    const CELLSYMBOLS = {
      _: ' ',
      F: '🚩',
      '@': '🚩',
      '*': '💣'
    }

    let symbol = CELLSYMBOLS[this.props.value] || this.props.value

    return symbol
  }

  render() {
    return (
      <td
        className={this.cellClassName()}
        onClick={this.checkCell}
        onContextMenu={this.flagCell}
      >
        {this.lookupSymbol()}
      </td>
    )
  }
}

export default observer(Cell)
