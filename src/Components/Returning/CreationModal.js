import React, { Component } from 'react'

import { setSelectOptions } from '../../Functions/Helpers'
import { getElementById } from '../../Functions/Get'
import { postRequest } from '../../Functions/Post'
import {
  BORROWING_BY_ID,
  CREATE_RETURNING,
  STATES,
} from '../../Functions/Constants'

class CreationModal extends Component {
  constructor() {
    super()
    this.state = {
      // Information states
      user_name: '',

      // Form states
      physical_state: 'Funcional',
      obs: '',
    }
  }

  componentDidMount() {
    let path = BORROWING_BY_ID + '?borrowing_id=' + this.props.borrowing_id
    return getElementById(path, this.setBorrowingInformation)
  }

  // Functions to handle states
  handleChange = (event) => {
    let attribute = event.target.id
    let value = event.target.value

    return this.setState({ [attribute]: value })
  }

  // Functions to handle modal
  closeModal = () => {
    return this.props.closeModal()
  }

  // Functions related to requests
  setBorrowingInformation = (response, body) => {
    if (response == 'success') {
      return this.setState({
        user_name: body.Asociado.user_name,
      })
    }

    this.props.handleAlerts(response, body)

    return this.props.closeModal()
  }

  responseHandler = (response, body) => {
    this.props.handleAlerts(response, body)
    return this.props.closeModal()
  }

  createReturning = () => {
    let body = {
      state: this.state.physical_state,
      obs: this.state.obs,
      borrowing_fk: this.props.borrowing_id,
      auth_user_fk: sessionStorage.getItem('user_id'),
    }

    postRequest(CREATE_RETURNING, body, this.responseHandler)
  }

  // Auxiliary functions
  setArticleList() {
    // let articles = this.props.borrowing.article_list

    // let list = []
    // for (let i = 0; i < articles.length; i++) {
    //   let a = articles[i]
    //   list.push(
    //     <li>
    //       <span className='global-modal-text'>
    //         {a.article_type_name + ': ' + a.article_label}
    //       </span>
    //     </li>
    //   )
    // }

    // return list
    return []
  }

  render() {
    let article_list = this.setArticleList()

    return (
      <div className='global-modal-background'>
        <div className='global-modal-container'>
          <div className='global-modal-header'>
            <span className='global-modal-title'>
              Crear constancia para solicitud # {this.props.borrowing_id}
            </span>
            <img
              className='global-modal-icon'
              src='./close_white.png'
              alt='close'
              onClick={this.closeModal}
            />
          </div>
          <div className='global-modal-body'>
            <div className='global-modal-group-container'>
              <span className='global-form-label'>Nombre responsable</span>
              <span className='global-modal-text'>{this.state.user_name}</span>
            </div>
            <div className='global-modal-group-container'>
              <span className='global-form-label'>Bodega</span>
              <span className='global-modal-text'>
                {/* {this.props.borrowing.warehouse_name} */}
              </span>
            </div>
            <div
              className='global-modal-group-container'
              style={{ alignItems: 'flex-start' }}
            >
              <span className='global-form-label'>Artículos a devolver</span>
              <ul>{article_list}</ul>
            </div>

            <div className='global-modal-group-container'>
              <span className='global-form-label'>
                Estado
                <strong className='global-form-mandatory'> *</strong>
              </span>
              <select
                id='physical_state'
                className='global-form-input-select'
                defaultValue={'Funcional'}
                value={this.state.physical_state}
                onChange={this.handleChange}
              >
                {setSelectOptions(STATES)}
              </select>
            </div>

            <div className='global-modal-group-container'>
              <span className='global-form-label'>Observaciones</span>
              <input
                id='obs'
                type='text'
                className='global-form-input'
                value={this.state.obs}
                onChange={this.handleChange}
              />
            </div>
            <div className='global-modal-button-container'>
              <button
                className='global-form-outline-button'
                style={{ height: '30px' }}
                onClick={this.closeModal}
              >
                Cancelar
              </button>
              <button
                className='global-form-solid-button'
                style={{ height: '30px' }}
                onClick={this.createReturning}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreationModal
