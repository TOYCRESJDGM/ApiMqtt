import React, { Component } from 'react'
import './Styles.css'

import Alert from '../Alerts/Alert'
import { getFilteredNotifications } from '../../Functions/Get'
import { setSelectOptions, formatDateToLocal } from '../../Functions/Helpers'
import {
  ALERT_TIMEOUT,
  NO_ITEMS_ERROR,
  NO_ITEM_MESSAGE,
  ERROR_MESSAGE,
  ZONES,
  TYPE,
} from '../../Functions/Constants'

class ListNotifications extends Component {
  constructor() {
    super()
    this.state = {
      notifications: [],
      filtered_notifications: [],
      zones: '',
      type: '',
      auth_state: 'all',

      // Auxiliary form states
      alert: '',
      timeout: '',
    }
  }

  componentDidMount() {
    let node = sessionStorage.getItem('user_node')
    let zone = ''
    let type = ''
    getFilteredNotifications(node, zone, type, this.setNotifications)
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout)
  }

  // Functions to handle states
  handleChange = (event) => {
    let attribute = event.target.id
    let node = sessionStorage.getItem('user_node')
    let value = event.target.value
    this.setState({ auth_state: value })

    if (attribute == 'zones') {
      
      let zones = value
      getFilteredNotifications(
        node,
        zones,
        this.state.type,
        this.setNotifications
      )
    }

    if (attribute == 'type') {

      let type = value
      getFilteredNotifications(
        node,
        this.state.zones,
        type,
        this.setNotifications
      )
    }

    return this.filterNotifications(value)
  }


  // Functions related to requests
  setNotifications = async (response, body) => {
    if (response == 'success') {
      this.setState({ filtered_notifications: body })
      return this.setState({ notifications: body })

    }

    this.setState({ notifications: [] })

    if (body == NO_ITEMS_ERROR) {
      return this.buildAlert('attention', NO_ITEM_MESSAGE)
    }
    else{
      return this.buildAlert('error', ERROR_MESSAGE)
    }
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


  // Auxiliary functions
  filterNotifications(response, body) {
    if (response == 'success') {
      let temp = []
      for (let z = 0; z < body.length; z++) {
              temp.push(body[z])
          }

      if (!temp.length) {
        this.setState({ filtered_notifications: temp })
        return this.buildAlert('attention', NO_ITEM_MESSAGE)
      }

      return this.setState({ filtered_notifications: temp })
    }

    this.setState({ filtered_notifications: [] })
    if (body == NO_ITEMS_ERROR) {
      return this.buildAlert('attention', NO_ITEM_MESSAGE)
    }

  }

  setTable() {
    let rows = this.state.filtered_notifications

    if (rows.length < 1 || !rows) {
      return (
        <span
          className='global-body-text'
          style={{ marginBottom: '0px', marginTop: '20px' }}
        >
          Actualmente no hay alertas con los filtros seleccionados.
        </span>
      )
    }

    let table_rows = []
    for (let i = 0; i < rows.length; i++) {
      let obj = rows[i]

      table_rows.push(
        <tr key={obj.id}>
          <td>{obj.origin}</td>
          <td style={{ textTransform: 'capitalize' }}>{obj.node}</td>
          <td style={{ textTransform: 'capitalize' }}>{obj.zone}</td>
          <td>{obj.type}</td>
          <td>{obj.ica}</td>
          <td>{obj.description}</td>
          <td>{formatDateToLocal(obj.date)}</td>
        </tr>
      )
    }

    let table = (
      <table style={{ marginTop: '20px' }}>
        <tbody>
          <tr>
            <th>Dato de origen</th>
            <th>Nodo</th>
            <th>Zona</th>
            <th>Tipo de alerta</th>
            <th>Indice de calidad de aire (ICA)</th>
            <th>Descripción</th>
            <th>Fecha de creación</th>
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
        <span className='global-comp-title'>Alertas generadas</span>
        <span className='global-comp-description'>
          Aquí podrá listar todas las alertas generadas a partir de los datos. utilice las
          listas desplegables para filtrar los elementos.
        </span>
        <div className='global-comp-form-container'>
          <span className='global-comp-sub-title'>
            ALERTAS
          </span>
          <div className='global-special-form-group'>
            <select
              id='zones'
              className='global-special-form-input-select'
              value={this.state.zones}
              onChange={this.handleChange}
            >
              <option value=''>Todas las zonas...</option>
              {setSelectOptions(ZONES)}
            </select>
            <select
              id='type'
              className='global-special-sec-form-input-select'
              value={this.state.type}
              onChange={this.handleChange}
            >
              <option value=''>Todos los tipos de alertas...</option>
              {setSelectOptions(TYPE)}
            </select>
          </div>
          {table}
        </div>
      </div>
    )
  }
}

export default ListNotifications
