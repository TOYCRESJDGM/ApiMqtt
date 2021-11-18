import React, { Component } from 'react'
import './Styles.css'

import Alert from '../Alerts/Alert'
import { validateEmail } from '../../Functions/Helpers'
import { simpleRequest } from '../../Functions/Post'
import {
  REGISTER_USER,
  ERROR_MESSAGE,
  EMAIL_MESSAGE,
  ALERT_TIMEOUT,
  USED_EMAIL_ERROR
} from '../../Functions/Constants'

class RegisterView extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      node: '',
      phone: '',
      name: '',
      rol:'',
      alert: '',
      timeout: '',
    }
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout)
  }

  // Functions to handle states
  handleChange = (event) => {
    let attribute = event.target.id
    let value = event.target.value

    if (attribute == 'email') {
      value = value.toLowerCase()
    }

    return this.setState({ [attribute]: value })
  }

  // Functions to handle alerts
  close = () => {
    return this.setState({ alert: '' })
  }

  buildAlert = (type, text) => {
    clearTimeout(this.state.timeout)

    this.setState({
      timeout: setTimeout(() => this.setState({ alert: '' }), ALERT_TIMEOUT),
    })

    return this.setState({
      alert: <Alert type={type} text={text} close={this.close} />,
    })
  }

  // Functions related to requests
  responseHandler = (response, body) => {
    console.log(response)
    if (response == 'success') {
        sessionStorage.removeItem('users')
        setTimeout(() =>  this.buildAlert('success', 'Usuario creado con éxito.', 10))
        return
    }

    if (body == USED_EMAIL_ERROR) {
      return this.buildAlert(
        'attention',
        'El correo electrónico ya se encuentra en uso.'
      )
    }

    return this.buildAlert('error', ERROR_MESSAGE)
  }

  register = () => {
    this.close()

    // Verify that the required fields are filled
    if (!this.state.email || !this.state.password || !this.state.phone || !this.state.node || !this.state.name) {
      setTimeout(
        () =>
          this.buildAlert(
            'attention',
            'Verifique que ha llenado todos los campos.'
          ),
        10
      )
      return
    }

    // Verify that the required fields are filled
    if (!validateEmail(this.state.email)) {
      setTimeout(() => this.buildAlert('attention', EMAIL_MESSAGE), 10)
      return
    }

    let body = {
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone,
      node: this.state.node,
      name: this.state.name,
      rol: "usuario"
    }

    return simpleRequest(REGISTER_USER, 'POST', body, this.responseHandler)
  }

  // Auxiliary functions
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

  render() {
    return (
      <div className='rg-container'>
        {this.state.alert}
        <div className='rg-card'>
          <div className='lg-content'>
            {/* HEADER */}
            <div className='rg-header'>
              <span className='lg-title'>
                Formulario de Registro
              </span>
              <span className='lg-text'>
                Por favor diligencie los campos de registro.
              </span>
            </div>
            {/* FORM */}
            
            <div className='lg-form'>
              <span className='global-form-label'>Nombre de usuario</span>
              <div
                className='global-form-input-group'
                style={{ marginTop: '5px' }}
              >
                <div className='global-form-img-container'>
                  <img
                    className='global-form-img'
                    src='./person_gray.png'
                    alt='person'
                  />
                </div>
                <input
                  id='name'
                  className='global-form-input'
                  type='text'
                  style={{ marginBottom: '20px' }}
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </div>
              <span className='global-form-label'>Nodo</span>
              <div
                className='global-form-input-group'
                style={{ marginTop: '5px' }}
              >
                <div className='global-form-img-container'>
                  <img
                    className='global-form-img'
                    src='./articles_gray.png'
                    alt='node'
                  />
                </div>
                <input
                  id='node'
                  className='global-form-input'
                  type='text'
                  style={{ marginBottom: '20px' }}
                  value={this.state.node}
                  onChange={this.handleChange}
                />
              </div>
              <span className='global-form-label'>Telefono</span>
              <div
                className='global-form-input-group'
                style={{ marginTop: '5px' }}
              >
                <div className='global-form-img-container'>
                  <img
                    className='global-form-img'
                    src='./phone_black.png'
                    alt='person'
                  />
                </div>
                <input
                  id='phone'
                  className='global-form-input'
                  type='text'
                  style={{ marginBottom: '20px' }}
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
              </div>
              <span className='global-form-label'>Correo electrónico</span>
              <div
                className='global-form-input-group'
                style={{ marginTop: '5px' }}
              >
                <div className='global-form-img-container'>
                  <img
                    className='global-form-img'
                    src='./person_gray.png'
                    alt='person'
                  />
                </div>
                <input
                  id='email'
                  className='global-form-input'
                  type='email'
                  style={{ marginBottom: '20px' }}
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <span className='global-form-label'>Contraseña</span>
              <div
                className='global-form-input-group'
                style={{ marginTop: '5px' }}
              >
                <div className='global-form-img-container'>
                  <img
                    className='global-form-img'
                    src='./key_gray.png'
                    alt='key'
                  />
                </div>
                <input
                  id='password'
                  className='global-form-input'
                  type='password'
                  style={{ marginBottom: '20px' }}
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <div
                  id='eye-icon-container'
                  className='global-form-img-container'
                  style={{ cursor: 'pointer' }}
                  onClick={this.showPasswd}
                >
                  <img
                    id='eye-icon'
                    className='global-form-img'
                    src='./eye_gray.png'
                    alt='eye'
                  />
                </div>
              </div>
              <button className='lg-button' onClick={this.register}>
                Registro
              </button>
            </div>
            {/* LEGEND */}
            <div className='lg-logo-container'>
              <img className='lg-logo' src='./logo.png' alt='logo' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterView
