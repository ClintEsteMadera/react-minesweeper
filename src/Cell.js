import React, { Component } from 'react'

class Cell extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  checkCell = event => {
    console.log('checked!')
    console.log('My row is ....')
    console.log('My col is ...')
  }
  render() {
    return <td onClick={this.checkCell}>{this.props.value}</td>
  }
}

export default Cell
