import {
  HOST,
  DATA_LIST,
  ALERT_LIST,
  ALERT_PUBLIC_LIST,
  DATA_ALL_LIST,
  DAY_IN_MS,
  NO_ITEMS_ERROR,
} from './Constants'

function handleErrors(response) {
  if (response.status >= 500) {
    throw Error(response.statusText)
  }
  return response
}

function getFromStorage(key) {
  let session_object = sessionStorage.getItem(key)
  let json_object = JSON.parse(session_object)

  if (json_object && json_object.length > 0) {
    return json_object
  }

  return null
}

function validateResponse(response) {
  if (response.hasOwnProperty('error')) {
    return response.error
  }

  if (!response.hasOwnProperty('rows')) {
    if (response.length < 1) {
      return NO_ITEMS_ERROR
    }

    return null
  }

  let rows = response.rows
  if (rows.length < 1) {
    return NO_ITEMS_ERROR
  }

  return null
}

export function getArticles(node, responseHandler) {
  let params =
    '?node_id=' +
    node
  let url = HOST + DATA_LIST + params

  fetch(url, {
    method: 'GET',
    headers: {
      token: sessionStorage.getItem('token'),
    },
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then((response) => {
      let validation = validateResponse(response)
      if (validation != null) {
        return responseHandler('error', validation)
      }

      let data = []
      let rows = response.rows
      for (let i = 0; i < rows.length; i++) {
        let obj = rows[i]

        data.push({
          id: obj.id,
          node: obj.node,
          co: obj.co,
          pm2: obj.pm2,
          no2: obj.no2,
          zone: obj.zone,
          latitude: obj.latitude,
          length: obj.length,
          date: obj.createdAt,
        })
      }

      return responseHandler('success', data)
    })
    .catch((error) => responseHandler('error', error))
}

export function getAllData(node, responseHandler) {
  let params =
    '?node_id=' +
    node
  let url = HOST + DATA_ALL_LIST + params

  fetch(url, {
    method: 'GET',
    headers: {
      token: sessionStorage.getItem('token'),
    },
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then((response) => {
      let validation = validateResponse(response)
      if (validation != null) {
        return responseHandler('error', validation)
      }

      let data = []
      let rows = response.rows
      for (let i = 0; i < rows.length; i++) {
        let obj = rows[i]

        data.push({
          id: obj.id,
          node: obj.node,
          co: obj.co,
          pm2: obj.pm2,
          no2: obj.no2,
          zone: obj.zone,
          latitude: obj.latitude,
          length: obj.length,
          date: obj.createdAt,
        })
      }

      return responseHandler('success', data)
    })
    .catch((error) => responseHandler('error', error))
}

export function getFilteredNotifications(node, zone, type, responseHandler) {
  let params =
    '?node_id=' +
    node + '&zone=' +
    zone +
    '&type=' +
    type

  // Make the request if there is nothing stored
  let url = HOST + ALERT_LIST + params
  fetch(url, {
    method: 'GET',
    headers: {
      token: sessionStorage.getItem('token'),
    },
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then((response) => {
      let validation = validateResponse(response)
      if (validation != null) {
        return responseHandler('error', validation)
      }

      let notifications = []
      let rows = response.rows
      for (let i = 0; i < rows.length; i++) {
        let obj = rows[i]

        notifications.push({
          id: obj.id,
          node: obj.node,
          type: obj.type,
          ica: obj.ica,
          description: obj.description,
          zone: obj.zone,
          origin: obj.origin_fk,
          date: obj.createdAt,
        })
      }

      return responseHandler('success', notifications)
    })
    .catch((error) => responseHandler('error', error))
}

export function getPublic(zone, responseHandler) {
  let params =
    '?zone=' +
    zone

  // Make the request if there is nothing stored
  let url = HOST + ALERT_PUBLIC_LIST + params
  fetch(url, {
    method: 'GET',
    headers: {
      token: sessionStorage.getItem('token'),
    },
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then((response) => {
      let validation = validateResponse(response)
      if (validation != null) {
        return responseHandler('error', validation)
      }

      return responseHandler('success', response)
    })
    .catch((error) => responseHandler('error', error))
}

// SIMPLE GET REQUESTS
export function getElementById(path, responseHandler) {
  // Path should have id as param
  let url = HOST + path

  fetch(url, {
    method: 'GET',
    headers: {
      token: sessionStorage.getItem('token'),
    },
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then((response) => {
      if (response.hasOwnProperty('error')) {
        return responseHandler('error', response.error)
      }

      if (response.hasOwnProperty('rows')) {
        return responseHandler('success', response.rows[0])
      }

      return responseHandler('success', response[0])
    })
    .catch((error) => responseHandler('error', error))
}

export function getElements(key, path, responseHandler) {
  let data_stored = getFromStorage(key, responseHandler)
  if (data_stored != null) {
    return responseHandler('success', data_stored)
  }

  // Make the request if there is nothing stored
  let url = HOST + path
  fetch(url, {
    method: 'GET',
    headers: {
      token: sessionStorage.getItem('token'),
    },
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then((response) => {
      let validation = validateResponse(response)
      if (validation != null) {
        return responseHandler('error', validation)
      }

      let rows = response.rows ? response.rows : response
      let json = JSON.stringify(rows)
      sessionStorage.setItem(key, json)

      return responseHandler('success', rows)
    })
    .catch((error) => responseHandler('error', error))
}
