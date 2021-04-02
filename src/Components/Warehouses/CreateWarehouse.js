import React, { Component } from 'react'
import './Styles.css'

class CreateWarehouse extends Component {

  render() {
    return (
      <div className='cu-container'>
        <span className='global-comp-title'>Crear bodega</span>
        <span className='global-comp-description'>
          Diligencie el formulario para crear un bodega. Los campos
          marcados con <strong className='global-form-mandatory'>*</strong> son obligatorios.
        </span>
        <div className='global-comp-form-container'>
          <div className='global-form-group'>
            <span className='global-form-label'>
              Nombre de referencia
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <input className='global-form-input' />
          </div>

          <div className='global-form-group'>
            <span className='global-form-label'>
              Dirección
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <input className='global-form-input' />
          </div>

          <div className='global-form-group'>
            <span className='global-form-label'>
              Descripción corta
            </span>
            <input className='global-form-input' />
          </div>

          <div className='global-form-group'>
            <span className='global-form-label'>
              Correo responsable
              <strong className='global-form-mandatory'> *</strong>
            </span>
            <input className='global-form-input' type='email' />
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

export default CreateWarehouse