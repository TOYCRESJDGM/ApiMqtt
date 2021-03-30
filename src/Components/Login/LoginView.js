import React, { Component } from 'react'
import './Styles.css'

import Alert from '../Alerts/Alert'
import { postRequest } from '../../Functions/Post'

class LoginView extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      error: false,
    }
  }

  // showPasswd function changes color of icon and background when eye clicked
  showPasswd() {
    let container = document.getElementById('eye-icon-container')
    let icon = document.getElementById('eye-icon')
    let input = document.getElementById('password')

    if (input.attributes.type.value == 'password') {
      input.attributes.type.value = 'text'
      container.style.backgroundColor = '#b31d1d'
      icon.attributes.src.value = './eye_white.png'
    } else {
      input.attributes.type.value = 'password'
      container.style.backgroundColor = '#f2f4f7'
      icon.attributes.src.value = './eye_gray.png'
    }

    return
  }

  handleError = (event) => {
    this.setState({ error: false })
  }

  handleChange = (event) => {
    let attribute = event.target.id
    let value = event.target.value

    this.setState({ [attribute]: value })
  }

  responseHandler = (response, body) => {
    if (response == 'success' && body.hasOwnProperty('token')) {
      sessionStorage.setItem('token', body.token)
      localStorage.setItem('user_id', body.user.id)
      localStorage.setItem('user_name', body.user.name)
      localStorage.setItem('user_email', body.user.email)

      this.props.changeView('Menu')
      return
    }

    this.setState({ error: true })
    return
  }

  login = () => {
    let body = {
      email: this.state.email,
      password: this.state.password,
    }

    postRequest('user/login', body, this.responseHandler)
  }

  render() {
    let alert = ''

    if (this.state.error) {
      alert = (
        <Alert
          type='attention'
          text='Su correo electrónico o contraseña es incorrecta. Por favor, intente de nuevo.'
          handleError={this.handleError}
        />
      )
    }

    return (
      <div className='lg-container'>
        {alert}
        <div className='lg-card'>
          <div className='lg-content'>
            {/* HEADER */}
            <div className='lg-header'>
              <span className='lg-title'>
                Bienvenido a la aplicación de inventario
              </span>
              <span className='lg-text'>
                Inicie sesión con correo electrónico y contraseña
              </span>
            </div>
            {/* FORM */}
            <div className='lg-form'>
              <span className='lg-label'>Correo electrónico</span>
              <div className='lg-input-group'>
                <div className='lg-img-container'>
                  <img
                    className='lg-img'
                    src='./person_gray.png'
                    alt='person'
                  />
                </div>
                <input
                  id='email'
                  className='lg-input'
                  type='email'
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <span className='lg-label'>Contraseña</span>
              <div className='lg-input-group'>
                <div className='lg-img-container'>
                  <img className='lg-img' src='./key_gray.png' alt='key' />
                </div>
                <input
                  id='password'
                  className='lg-input'
                  type='password'
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <div
                  id='eye-icon-container'
                  className='lg-img-container'
                  style={{ cursor: 'pointer' }}
                  onClick={this.showPasswd}
                >
                  <img
                    id='eye-icon'
                    className='lg-img'
                    src='./eye_gray.png'
                    alt='eye'
                  />
                </div>
              </div>
              <button className='lg-button' onClick={this.login}>
                Iniciar sesión
              </button>
            </div>
            <span className='lg-link'>¿Olvidaste tu contraseña?</span>
            {/* LEGEND */}
            <div className='lg-legend-group'>
              <hr></hr>
              <span className='lg-label'>Desarrollado por</span>
              <hr></hr>
            </div>
            <div className='lg-logo-container'>
              <img className='lg-logo' src='./logo_valle_gray.png' alt='logo' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginView
