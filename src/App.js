import React, { Component } from 'react'
import LoginView from './Components/Login/LoginView'
import MenuView from './Components/Menu/MenuView'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      component: 'login',
    }
  }

  handleChange = (value) => {
    this.setState({ component: value })
  }

  componentDidMount() {
    if (!sessionStorage.getItem('token')) {
      return
    }

    this.setState({ component: 'Menu' })
  }

  render() {
    if (this.state.component == 'Menu') {
      return <MenuView changeView={this.handleChange} />
    }

    return <LoginView changeView={this.handleChange} />
  }
}

export default App
