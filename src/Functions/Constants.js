const { REACT_APP_HOST } = process.env

// SELECT OPTIONS

export const TYPE = [
  { name: 'Material particulado 2.5 (PM2)', value: 'pm2' },
  { name: 'Gas carbonico', value: 'co' },
  { name: 'Dióxido de nitrógeno', value: 'no2' },
]




export const ZONES = [
  { name: 'Suroccidente', value: 'SOC' },
  { name: 'Suroriente', value: 'SOR' },
  { name: 'Noroccidente', value: 'NOC' },
  { name: 'Nororiente', value: 'NOR' },
  { name: 'Todas las zonas', value: ''}
]

export const ROL_TYPES = [
  { name: 'Administrador', value: 'administrador' },
  { name: 'Ente gubernamental', value: 'ente gubernamental' },
  { name: 'Usuario', value: 'usuario' },
]

// SERVICES
export const HOST = REACT_APP_HOST
  ? REACT_APP_HOST
  : 'http://localhost:3001/api/'

export const LOGIN = 'user/login'
export const LIST_USERS = 'user/list'
export const USERS_BY_ID = 'user/detail'
export const CREATE_USER = 'user/create'
export const REGISTER_USER = 'user/register'
export const MODIFY_USER = 'user/update'

export const DATA_LIST = 'data/node'
export const DATA_ALL_LIST = 'data/all'
export const ALERT_LIST = 'alert/node'
export const ALERT_PUBLIC_LIST = 'alert/public'

export const RECOVER_PASSWORD = 'user/recover_pass'
export const TOKEN_VERIFICATION = 'user/token_verification'
export const PASSWORD_CHANGE = 'user/password_change'

// ALERTS
export const MANDATORY_MESSAGE =
  'Verifique que ha llenado todos los campos obligatorios.'
export const ERROR_MESSAGE =
  'Ha ocurrido un error. Por favor intente más tarde.'
export const EMAIL_MESSAGE =
  'El formato del correo electrónico no es válido. Por favor verifique.'
export const NO_ITEM_MESSAGE =
  'No hay registros disponibles para esta selección.'
export const INVALID_STRING_MESSAGE =
  'Alguno de los campos ingresados supera la extensión permitida o se detectó un patrón inválido. Por favor revise los campos.'
export const ALERT_TIMEOUT = 6000

// ERRORS
export const NO_ITEMS_ERROR = 'No hay registros en el sistema.'
export const INVALID_CLASSIF_ERROR = 'La clasificación es inválida.'
export const INVALID_LOGIN_ERROR = 'Error en el usuario o contraseña.'
export const USED_EMAIL_ERROR = 'El correo electrónico ya se encuentra en uso.'
export const ARTICLE_TYPE_EXIST_ERROR = 'El tipo de artículo deseado ya existe.'
export const NO_EMAIL_ERROR =
  'El correo electrónico no se encuentra registrado.'

// OTHERS
export const DAY_IN_MS = 1000 * 60 * 60 * 24
export const DATE_OPTIONS = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
}
