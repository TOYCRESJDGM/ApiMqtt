import React, { Component } from 'react'
import LoginView from './Components/Login/LoginView'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return <LoginView />
  }
}

export default App
