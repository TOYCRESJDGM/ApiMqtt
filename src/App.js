import React, { Component } from 'react'
// import LoginView from './Components/Login/LoginView'
import MenuView from './Components/Menu/MenuView'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return <MenuView />
  }
}

export default App
