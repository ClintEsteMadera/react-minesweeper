import React, { Component } from 'react'
import './App.css'
import Table from './Table'
import Header from './Header'

class App extends Component {
  render() {
    return (
      <main>
        <Header />
        <Table />
      </main>
    )
  }
}

export default App
