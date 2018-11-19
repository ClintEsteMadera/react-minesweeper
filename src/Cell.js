import React, { Component } from 'react'

class Cell extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleCheckCell = event => {
    console.log('checked!')
    console.log(`My row is ${this.props.rowIndex}`)
    console.log(`My col is ${this.props.col}`)
    console.log(`My value is ${this.props.value}`)
    this.props.check(this.props.rowIndex, this.props.col)
    event.preventDefault()
  }

  handleFlagCell = event => {
    console.log('checked!')
    console.log(`My row is ${this.props.rowIndex}`)
    console.log(`My col is ${this.props.col}`)
    this.props.flag(this.props.rowIndex, this.props.col)
    event.preventDefault()
  }

  classNames = {
    ' ': 'unchecked-cell',
    F: 'flagged-cell',
    '@': 'flagged-cell-after',
    '*': 'bomb'
  }

  classValues = {
    _: ' ',
    F: '🚩',
    '@': '🚩',
    '*': '💣'
  }

  render() {
    return (
      <td
        onClick={this.handleCheckCell}
        onContextMenu={this.handleFlagCell}
        className={this.classNames[this.props.value] || 'cell-checked'}
      >
        {this.classValues[this.props.value] || this.props.value}
      </td>
    )
  }
}

export default Cell
