import React, { Component } from 'react'
import { observer } from 'mobx-react'

import ourGame from './Game'

class Cell extends Component {
  // Allows cell to be checked for mines
  checkCell = event => {
    ourGame.checkCell(this.props.row, this.props.column)
  }

  // Allows cell to be flagged,
  // ...meaning you think a mine is in it
  flagCell = event => {
    event.preventDefault()
    if (this.props.flag === "RED_FLAG") {
      ourGame.unFlagCell(this.props.row, this.props.column)
    } else {
      ourGame.flagCell(this.props.row, this.props.column)
    }
  }


  // Allows program to assign classNames to cells
  // ...dynamically by pairing the cell's value
  // ...with a className that we style in the CSS file.
  cellClassName = () => {
    // Lookup table
    const CELLCLASSNAMES = {
      '0': 'cell-0',
      '1': 'cell-1',
      '2': 'cell-2',
      '3': 'cell-3',
      '4': 'cell-4',
      '5': 'cell-5',
      '6': 'cell-6',
      '7': 'cell-7',
      '8': 'cell-8',
      '9': 'cell-9'
    };

    if (this.props.revealed === false) {
      return 'cell-covered';
    }
    if (this.props.mine === true) {
      return 'cell-bomb';
    }
    if (this.props.flag === "QUESTION_MARK") {
      return 'cell-flagged';
    }
    if (this.props.flag === "RED_FLAG") {
      return 'cell-flagged';
    }
    return 'cell-exposed ' + CELLCLASSNAMES[this.props.minesAround];
  }

  // Allows program to display a symbol we choose within the cell
  // ...as opposed to just the characters the API defaults to.
  lookupSymbol = () => {
    if (this.props.mine === true && this.props.revealed === true) {
      return '💣';
    }
    if (this.props.flag === "QUESTION_MARK") {
      return '?';
    }
    if (this.props.flag === "RED_FLAG") {
      return '🚩';
    }
    if (this.props.revealed === true) {
      if (this.props.minesAround === 0) {
        return ' ';
      }
      return this.props.minesAround;
    }
    return ' ';
  };

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
