import React, { Component } from 'react'
import './Styles.css'

import Alert from '../Alerts/Alert'
import {
    getAllData,
} from '../../Functions/Get'
import {
  ALERT_TIMEOUT,
  NO_ITEM_MESSAGE,
  NO_ITEMS_ERROR,
  ERROR_MESSAGE,
} from '../../Functions/Constants'
import { formatDateToLocal } from '../../Functions/Helpers'

class ListAllData extends Component {
  constructor() {
    super()
    this.state = {
      articles: [],
      node: '',

      // Auxiliary form states
      alert: '',
      timeout: '',
    }
  }

  componentDidMount() {
    let node = ''
    getAllData(node, this.setArticles)
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout)
  }

  handleChange = (event) => {
    let attribute = event.target.id
    let value = event.target.value

    if (attribute == 'node') {
      value = value.toLowerCase()
    }

    return this.setState({ [attribute]: value })
  }

  clearInputs = () => {
    return this.setState({
      node: '',
    })
  }


  routeEdit = (event) => {
    let id = event.target.id.split('-')
    let articles = this.state.articles
    let article = {}

    for (let i = 0; i < articles.length; i++) {
      let obj = articles[i]
      if (parseInt(id[1]) == obj.id) {
        article = obj
        continue
      }
    }

    let json = JSON.stringify(article)
    sessionStorage.setItem('edit_article', json)

    return this.props.changeSelected(8)
  }

  // Functions related to requests
  setArticles = async (response, body) => {
    if (response == 'success') {
      let temp = []
      for (let z = 0; z < body.length; z++) {
              temp.push(body[z])
          }

      if (!temp.length) {
        this.setState({ articles: temp })
        return this.buildAlert('attention', NO_ITEM_MESSAGE)
      }

      this.clearInputs()
      return this.setState({ articles: temp })
    }

    this.setState({ articles: [] })
    if (body == NO_ITEMS_ERROR) {
      return this.buildAlert('attention', NO_ITEM_MESSAGE)
    }

    return this.buildAlert('attention', ERROR_MESSAGE)
  }

  getAll = () => {
    this.close()

    return getAllData(this.state.node, this.setArticles)
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

  // Functions to handle modal
  showModal(name, label, obs) {
    return this.props.showModal(
      <Modal name={name} label={label} obs={obs} closeModal={this.closeModal} />
    )
  }

  closeModal = () => {
    return this.props.closeModal()
  }

  // Auxiliary functions
  setTable() {
    let rows = this.state.articles

    if (rows.length < 1) {
      return (
        <span className='global-body-text' style={{ marginBottom: '0px' }}>
          Actualmente no hay artículos guardados.
        </span>
      )
    }

    let table_rows = []
    for (let i = 0; i < rows.length; i++) {
      let obj = rows[i]

      table_rows.push(
        <tr key={obj.id}>
          <td style={{ textTransform: 'capitalize' }}>{obj.node}</td>
          <td style={{ textTransform: 'capitalize' }}>{obj.zone}</td>
          <td>{obj.pm2}</td>
          <td>{obj.co}</td>
          <td>{obj.no2}</td>
          <td>{obj.latitude}</td>
          <td>{obj.length}</td>
          <td>{formatDateToLocal(obj.date)}</td>
        </tr>
      )
    }

    let table = (
      <table>
        <tbody>
          <tr>
            <th>Nodo</th>
            <th>Zona</th>
            <th>PM2</th>
            <th>CO</th>
            <th>NO2</th>
            <th>Latitud</th>
            <th>Longitud</th>
            <th>Fecha y Hora de Registro</th>
          </tr>
          {table_rows}
        </tbody>
      </table>
    )

    return table
  }

  render() {
    let table = this.setTable()

    return (
      <div className='cu-container'>
        {this.state.alert}
        <span className='global-comp-title'>Lista de datos generados</span>
        <span className='global-comp-description'>
          Aquí podrá encontrar todos los datos generados por los nodos de los usuarios.
        </span>
        <div className='global-comp-form-container'>
          <span className='global-comp-sub-title'>
            LISTADO DE DATOS
          </span>
          <span className='global-comp-sub-text'>
          Indique el nodo que desea buscar.
          </span>
          <td/>
          <div className='global-special-form-group'>
          <input
              id='node'
              type='text'
              className='global-form-input-all'
              value={this.state.node}
              onChange={this.handleChange}
            />
            <td/>
            <button
              className='global-form-solid-button'
              onClick={this.getAll}
            >
              Enviar
            </button>
            <button
              className='global-form-outline-button'
              onClick={this.clearInputs}
            >
              Cancelar
            </button>
          </div>
          {table}
        </div>
      </div>
    )
  }
}

export default ListAllData
