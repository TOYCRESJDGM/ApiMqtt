import React, { Component } from 'react'
import './Styles.css'

import Alert from '../Alerts/Alert'
import {
  getArticles,
} from '../../Functions/Get'
import {
  ALERT_TIMEOUT,
  NO_ITEM_MESSAGE,
  NO_ITEMS_ERROR,
  ERROR_MESSAGE,
} from '../../Functions/Constants'
import { formatDateToLocal } from '../../Functions/Helpers'

class ListArticle extends Component {
  constructor() {
    super()
    this.state = {
      articles: [],

      // Auxiliary form states
      alert: '',
      timeout: '',
    }
  }

  componentDidMount() {
    let node = sessionStorage.getItem('user_node')
    getArticles(node, this.setArticles)
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout)
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

      return this.setState({ articles: temp })
    }

    this.setState({ articles: [] })
    if (body == NO_ITEMS_ERROR) {
      return this.buildAlert('attention', NO_ITEM_MESSAGE)
    }

    return this.buildAlert('attention', ERROR_MESSAGE)
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
          Aquí podrá encontrar todos los datos generados por su nodo.
        </span>
        <div className='global-comp-form-container'>
          <span className='global-comp-sub-title'>
            LISTADO DE DATOS
          </span>
          {table}
        </div>
      </div>
    )
  }
}

export default ListArticle
