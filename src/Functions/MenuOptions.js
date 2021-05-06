export function setOptionsByRol(rol, collapse, changeSelected) {
  // STATIC LABELS
  const USERS = (
    <div id='s1' className='m-menu-static-label'>
      <img className='m-icon' src='./person_gray.png' alt='person' />
      <span className='m-label'>Usuarios</span>
      <img
        id='header-1'
        className='m-icon'
        src='./arrow_gray.png'
        alt='arrow'
        onClick={collapse}
      />
    </div>
  )

  const WAREHOUSES = (
    <div id='s2' className='m-menu-static-label'>
      <img className='m-icon' src='./inventory_gray.png' alt='inventory' />
      <span className='m-label'>Bodegas</span>
      <img
        id='header-2'
        className='m-icon'
        src='./arrow_gray.png'
        alt='arrow'
        onClick={collapse}
      />
    </div>
  )

  const ARTICLE_TYPES = (
    <div id='s3' className='m-menu-static-label'>
      <img className='m-icon' src='./types_gray.png' alt='types' />
      <span className='m-label'>Tipos de artículo</span>
      <img
        id='header-3'
        className='m-icon'
        src='./arrow_gray.png'
        alt='arrow'
        onClick={collapse}
      />
    </div>
  )

  const ARTICLES = (
    <div id='s4' className='m-menu-static-label'>
      <img className='m-icon' src='./articles_gray.png' alt='articles' />
      <span className='m-label'>Artículos</span>
      <img
        id='header-4'
        className='m-icon'
        src='./arrow_gray.png'
        alt='arrow'
        onClick={collapse}
      />
    </div>
  )

  const BORROWINGS = (
    <div id='s5' className='m-menu-static-label'>
      <img className='m-icon' src='./outbox_gray.png' alt='outbox' />
      <span className='m-label'>Préstamos</span>
      <img
        id='header-5'
        className='m-icon'
        src='./arrow_gray.png'
        alt='arrow'
        onClick={collapse}
      />
    </div>
  )

  const RETURNINGS = (
    <div id='s6' className='m-menu-static-label'>
      <img className='m-icon' src='./inbox_gray.png' alt='inbox' />
      <span className='m-label'>Devoluciones</span>
      <img
        id='header-6'
        className='m-icon'
        src='./arrow_gray.png'
        alt='arrow'
        onClick={collapse}
      />
    </div>
  )

  // GROUP LABELS
  // USERS
  const LIST_USERS_LABEL = (
    <div id={1} className='m-menu-label' onClick={changeSelected}>
      Listar usuarios
    </div>
  )

  const CREATE_USER_LABEL = (
    <div id={2} className='m-menu-label' onClick={changeSelected}>
      Crear usuario
    </div>
  )

  const MODIFY_USER_LABEL = (
    <div id={3} className='m-menu-label' onClick={changeSelected}>
      Modificar usuario
    </div>
  )

  // WAREHOUSES
  const CREATE_WAREHOUSE_LABEL = (
    <div id={4} className='m-menu-label' onClick={changeSelected}>
      Crear bodega
    </div>
  )

  // ARTICLE TYPES
  const CREATE_ARTICLE_TYPE_LABEL = (
    <div id={5} className='m-menu-label' onClick={changeSelected}>
      Crear tipo de artículo
    </div>
  )

  // ARTICLES
  const LIST_ARTICLES_LABEL = (
    <div id={6} className='m-menu-label' onClick={changeSelected}>
      Listar artículos
    </div>
  )

  const CREATE_ARTICLE_LABEL = (
    <div id={7} className='m-menu-label' onClick={changeSelected}>
      Crear artículo
    </div>
  )

  const MODIFY_ARTICLE_LABEL = (
    <div id={8} className='m-menu-label' onClick={changeSelected}>
      Modificar artículo
    </div>
  )

  // BORROWINGS
  const LIST_BORROWINGS_LABEL = (
    <div id={9} className='m-menu-label' onClick={changeSelected}>
      Listar préstamos
    </div>
  )

  const CREATE_BORROWING_LABEL = (
    <div id={10} className='m-menu-label' onClick={changeSelected}>
      Solicitar préstamo
    </div>
  )

  const MODIFY_BORROWING_LABEL = (
    <div id={11} className='m-menu-label' onClick={changeSelected}>
      Modificar préstamo
    </div>
  )

  const AUTH_BORROWING_LABEL = (
    <div id={12} className='m-menu-label' onClick={changeSelected}>
      Autorizar préstamo
    </div>
  )

  // RETURNINGS
  const LIST_RETURNINGS_LABEL = (
    <div id={13} className='m-menu-label' onClick={changeSelected}>
      Listar constancias
    </div>
  )

  const CREATE_RETURNING_LABEL = (
    <div id={14} className='m-menu-label' onClick={changeSelected}>
      Crear constancia
    </div>
  )

  const MODIFY_RETURNING_LABEL = (
    <div id={15} className='m-menu-label' onClick={changeSelected}>
      Modificar constancia
    </div>
  )

  const AUTH_RETURNING_LABEL = (
    <div id={16} className='m-menu-label' onClick={changeSelected}>
      Autorizar constancias
    </div>
  )

  // GROUPS
  // USERS
  const USERS_GROUP = (
    <div id='group-1' className='m-menu-group' style={{ display: 'none' }}>
      {LIST_USERS_LABEL}
      {CREATE_USER_LABEL}
      {MODIFY_USER_LABEL}
    </div>
  )

  const WAREHOUSES_GROUP = (
    <div id='group-2' className='m-menu-group' style={{ display: 'none' }}>
      {CREATE_WAREHOUSE_LABEL}
    </div>
  )

  const ARTICLE_TYPES_GROUP = (
    <div id='group-3' className='m-menu-group' style={{ display: 'none' }}>
      {CREATE_ARTICLE_TYPE_LABEL}
    </div>
  )

  const ARTICLES_GROUP = (
    <div id='group-4' className='m-menu-group' style={{ display: 'none' }}>
      {LIST_ARTICLES_LABEL}
      {CREATE_ARTICLE_LABEL}
      {MODIFY_ARTICLE_LABEL}
    </div>
  )

  const BORROWINGS_GROUP = (
    <div id='group-5' className='m-menu-group' style={{ display: 'none' }}>
      {LIST_BORROWINGS_LABEL}
      {CREATE_BORROWING_LABEL}
      {MODIFY_BORROWING_LABEL}
      {AUTH_BORROWING_LABEL}
    </div>
  )

  const RETURNINGS_GROUP = (
    <div id='group-6' className='m-menu-group' style={{ display: 'none' }}>
      {LIST_RETURNINGS_LABEL}
      {CREATE_RETURNING_LABEL}
      {MODIFY_RETURNING_LABEL}
      {AUTH_RETURNING_LABEL}
    </div>
  )

  let array = []

  switch (rol) {
    case 'administrador':
      array.push(USERS)
      array.push(USERS_GROUP)
      array.push(WAREHOUSES)
      array.push(WAREHOUSES_GROUP)
      array.push(ARTICLE_TYPES)
      array.push(ARTICLE_TYPES_GROUP)
      array.push(ARTICLES)
      array.push(ARTICLES_GROUP)
      array.push(BORROWINGS)
      array.push(BORROWINGS_GROUP)
      array.push(RETURNINGS)
      array.push(RETURNINGS_GROUP)

      return array

    case 'jefe de bodega':
      array.push(ARTICLE_TYPES)
      array.push(ARTICLE_TYPES_GROUP)
      array.push(ARTICLES)
      array.push(ARTICLES_GROUP)
      array.push(BORROWINGS)
      array.push(BORROWINGS_GROUP)
      array.push(RETURNINGS)
      array.push(RETURNINGS_GROUP)

      return array

    default:
      let default_borrowings = (
        <div id='group-5' className='m-menu-group' style={{ display: 'none' }}>
          {LIST_BORROWINGS_LABEL}
          {CREATE_BORROWING_LABEL}
        </div>
      )
      let default_returnings = (
        <div id='group-6' className='m-menu-group' style={{ display: 'none' }}>
          {LIST_RETURNINGS_LABEL}
          {CREATE_RETURNING_LABEL}
        </div>
      )

      array.push(BORROWINGS)
      array.push(default_borrowings)
      array.push(RETURNINGS)
      array.push(default_returnings)

      return array
  }
}
