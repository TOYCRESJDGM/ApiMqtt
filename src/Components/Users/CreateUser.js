import React, { Component } from 'react'
import './Styles.css'

class CreateUser extends Component {
  // showPasswd function changes color of icon and background when eye clicked
  showPasswd(event) {
    let container, icon, input

    if (
      event.target.id == 'eye-icon-container-1' ||
      event.target.id == 'eye-icon-1'
    ) {
      container = document.getElementById('eye-icon-container-1')
      icon = document.getElementById('eye-icon-1')
      input = document.getElementById('password')
    } else {
      container = document.getElementById('eye-icon-container-2')
      icon = document.getElementById('eye-icon-2')
      input = document.getElementById('password-2')
    }

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
      <div className='cu-container'>
        <span className='global-comp-title'>Crear usuario</span>
        <span className='global-comp-description'>
          Diligencie el formulario para crear un nuevo usuario. Todos los campos
          son obligatorios.
        </span>
        <div className='global-comp-form-container'>
          <div className='global-form-group'>
            <span className='global-form-label'>
              Nombre completo
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <input className='global-form-input' />
          </div>

          <div className='global-form-group'>
            <span className='global-form-label'>
              Correo electrónico
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <input className='global-form-input' />
          </div>

          <div className='global-form-group'>
            <span className='global-form-label'>
              Teléfono
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <input className='global-form-input' />
          </div>

          <div className='global-form-group'>
            <span className='global-form-label'>
              Rama
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <input className='global-form-input' />
          </div>

          <div className='global-form-group'>
            <span className='global-form-label'>
              Contraseña
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <div className='global-form-input-group'>
              <input
                id='password'
                className='global-form-input'
                type='password'
              />
              <div
                id='eye-icon-container-1'
                tag='holi'
                className='global-form-img-container'
                style={{ cursor: 'pointer' }}
                onClick={this.showPasswd}
              >
                <img
                  id='eye-icon-1'
                  className='global-form-img'
                  src='./eye_gray.png'
                  alt='eye'
                />
              </div>
            </div>
          </div>

          <div className='global-form-group'>
            <span className='global-form-label'>
              Confirme contraseña
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <div className='global-form-input-group'>
              <input
                id='password-2'
                className='global-form-input'
                type='password'
              />
              <div
                id='eye-icon-container-2'
                className='global-form-img-container'
                style={{ cursor: 'pointer' }}
                onClick={this.showPasswd}
              >
                <img
                  id='eye-icon-2'
                  className='global-form-img'
                  src='./eye_gray.png'
                  alt='eye'
                />
              </div>
            </div>
          </div>
          <div className='global-form-buttons-container'>
            <button className='global-form-solid-button'>Enviar</button>
            <button className='global-form-outline-button'>Cancelar</button>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateUser
