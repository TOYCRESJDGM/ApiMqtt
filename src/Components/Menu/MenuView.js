import React, { Component } from 'react'
import './Styles.css'

class MenuView extends Component {
  constructor() {
    super()
    this.state = {
      selected: 1,
    }
  }

  changeSelected = (event) => {
    let newID = event.target.id

    document.getElementById(this.state.selected).className = 'm-menu-label'
    document.getElementById(newID).className = 'm-menu-label selected'

    this.setState({ selected: newID })
  }

  render() {
    return (
      <div className='m-container'>
        {/* HEADER */}
        <div className='m-header'>
          <div className='m-logo-container'>
            <img className='m-logo' src='./logo-scouts.png' alt='logo' />
            <span className='m-label'>Grupo Scout Centinelas 113</span>
          </div>
          <div className='m-loged-user-container'>
            <div className='m-ellipse'></div>
            <span className='m-user-name'>Nombre Apellido</span>
            <img className='m-icon' src='./arrow_gray.png' alt='arrow' />
          </div>
        </div>
        {/* MENU */}
        <div className='m-body-container'>
          <div className='m-menu-container'>
            <div className='m-menu-static-label'>
              <img className='m-icon' src='./home_gray.png' alt='home' />
              <span className='m-label'>Cuadro de seguimiento</span>
            </div>
            <div className='m-menu-group'>
              <div
                id={1}
                className='m-menu-label selected'
                onClick={this.changeSelected}
              >
                Artículos
              </div>
            </div>

            <div className='m-menu-static-label'>
              <img className='m-icon' src='./person_gray.png' alt='person' />
              <span className='m-label'>Usuarios</span>
            </div>
            <div className='m-menu-group'>
              <div
                id={2}
                className='m-menu-label'
                onClick={this.changeSelected}
              >
                Crear usuario
              </div>
            </div>

            <div className='m-menu-static-label'>
              <img
                className='m-icon'
                src='./inventory_gray.png'
                alt='inventory'
              />
              <span className='m-label'>Bodegas</span>
            </div>
            <div className='m-menu-group'>
              <div
                id={3}
                className='m-menu-label'
                onClick={this.changeSelected}
              >
                Crear bodega
              </div>
            </div>

            <div className='m-menu-static-label'>
              <img className='m-icon' src='./types_gray.png' alt='types' />
              <span className='m-label'>Tipos de artículo</span>
            </div>
            <div className='m-menu-group'>
              <div
                id={4}
                className='m-menu-label'
                onClick={this.changeSelected}
              >
                Crear tipo de artículo
              </div>
            </div>

            <div className='m-menu-static-label'>
              <img
                className='m-icon'
                src='./articles_gray.png'
                alt='articles'
              />
              <span className='m-label'>Artículos</span>
            </div>
            <div className='m-menu-group'>
              <div
                id={5}
                className='m-menu-label'
                onClick={this.changeSelected}
              >
                Crear artículo
              </div>
            </div>

            <div className='m-menu-static-label'>
              <img className='m-icon' src='./outbox_gray.png' alt='outbox' />
              <span className='m-label'>Préstamos</span>
            </div>
            <div className='m-menu-group'>
              <div
                id={6}
                className='m-menu-label'
                onClick={this.changeSelected}
              >
                Solicitar préstamo
              </div>
              <div
                id={7}
                className='m-menu-label'
                onClick={this.changeSelected}
              >
                Autorizar solicitudes
              </div>
            </div>

            <div className='m-menu-static-label'>
              <img className='m-icon' src='./inbox_gray.png' alt='inbox' />
              <span className='m-label'>Devoluciones</span>
            </div>
            <div className='m-menu-group'>
              <div
                id={8}
                className='m-menu-label'
                onClick={this.changeSelected}
              >
                Autorizar solicitudes
              </div>
            </div>
          </div>
          <div className='m-component-container'></div>
        </div>
      </div>
    )
  }
}

export default MenuView
