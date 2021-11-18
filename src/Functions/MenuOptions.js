export function setOptionsByRol(rol, collapse, changeSelected) {
  // STATIC LABELS
  const USERS = (
    <div key='s1' id='s1' className='m-menu-static-label'>
      <img className='m-icon' src='./person_gray.png' alt='person' />
      <span className='m-label'>Usuarios</span>
      <img
        id='header-1'
        className='m-icon'
        src='./arrow_gray.png'
        alt='arrow'
        onClick={collapse}
        style={{ cursor: 'pointer' }}
      />
    </div>
  )

  const DATA = (
    <div key='s4' id='s4' className='m-menu-static-label'>
      <img className='m-icon' src='./articles_gray.png' alt='articles' />
      <span className='m-label'>Datos</span>
      <img
        id='header-4'
        className='m-icon'
        src='./arrow_gray.png'
        alt='arrow'
        onClick={collapse}
        style={{ cursor: 'pointer' }}
      />
    </div>
  )

  const ALERT = (
    <div key='s5' id='s5' className='m-menu-static-label'>
      <img className='m-icon' src='./outbox_gray.png' alt='outbox' />
      <span className='m-label'>Alertas</span>
      <img
        id='header-5'
        className='m-icon'
        src='./arrow_gray.png'
        alt='arrow'
        onClick={collapse}
        style={{ cursor: 'pointer' }}
      />
    </div>
  )


  // GROUP LABELS
  // USERS
  const LIST_USERS_LABEL = (
    <div key='l1' id={1} className='m-menu-label' onClick={changeSelected}>
      Listar usuarios
    </div>
  )

  const CREATE_USER_LABEL = (
    <div key='l2' id={2} className='m-menu-label' onClick={changeSelected}>
      Crear usuario
    </div>
  )

  const MODIFY_USER_LABEL = (
    <div key='l3' id={3} className='m-menu-label' onClick={changeSelected}>
      Modificar usuario
    </div>
  )


  // DATA
  const LIST_DATA_LABEL = (
    <div key='l6' id={6} className='m-menu-label' onClick={changeSelected}>
      Listar Datos
    </div>
  )

  const LIST_ALL_DATA = (
    <div key='l6' id={7} className='m-menu-label' onClick={changeSelected}>
      Listar todos los datos
    </div>
  )

  // ALERT
  const LIST_ALERT_LABEL = (
    <div key='l9' id={9} className='m-menu-label' onClick={changeSelected}>
      Alertas propias
    </div>
  )

  const LIST_PUBLIC_ALERT_LABEL = (
    <div key='l10' id={10} className='m-menu-label' onClick={changeSelected}>
      Alertas publicas
    </div>
  )




  // GROUPS
  // USERS
  const USERS_GROUP = (
    <div
      key='g1'
      id='group-1'
      className='m-menu-group'
      style={{ display: 'none' }}
    >
      {LIST_USERS_LABEL}
      {CREATE_USER_LABEL}
      {MODIFY_USER_LABEL}
    </div>
  )

  const DATA_GROUP = (
    <div
      key='g4'
      id='group-4'
      className='m-menu-group'
      style={{ display: 'none' }}
    >
      {LIST_ALL_DATA}
    </div>
  )

  const ALERT_GROUP = (
    <div
      key='g5'
      id='group-5'
      className='m-menu-group'
      style={{ display: 'none' }}
    >
      {LIST_PUBLIC_ALERT_LABEL}
    </div>
  )

  let array = []

  switch (rol) {
    case 'administrador':
      array.push(USERS)
      array.push(USERS_GROUP)
      array.push(DATA)
      array.push(DATA_GROUP)
      array.push(ALERT)
      array.push(ALERT_GROUP)

      return array

    case 'ente gubernamental':
      let default_USERS = (
        <div id='group-1' className='m-menu-group' style={{ display: 'none' }}>
          {LIST_USERS_LABEL}
        </div>
      )

      array.push(USERS)
      array.push(default_USERS)
      array.push(DATA)
      array.push(DATA_GROUP)
      array.push(ALERT)
      array.push(ALERT_GROUP)
      
      
      
      return array

    default:
      let default_DATA = (
        <div
          key='g4'
          id='group-4'
          className='m-menu-group'
          style={{ display: 'none' }}
        >
          {LIST_DATA_LABEL}
        </div>
      )
      let default_ALERT = (
        <div id='group-5' className='m-menu-group' style={{ display: 'none' }}>
          {LIST_ALERT_LABEL}
          {LIST_PUBLIC_ALERT_LABEL}
        </div>
      )

      array.push(DATA)
      array.push(default_DATA)
      array.push(ALERT)
      array.push(default_ALERT)

      return array
  }
}
