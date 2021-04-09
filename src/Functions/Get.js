import { HOST, LIST_WAREHOUSES, ARTICLE_TYPE_LIST } from './Constants'

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

// COMMON POST REQUEST
export function getWarehouses(responseHandler) {
  if (sessionStorage.getItem('warehouses')) {
    let storage_warehouses = JSON.parse(sessionStorage.getItem('warehouses'))

    if (storage_warehouses[0].hasOwnProperty('warehouse_name')) {
      let warehouses = []
      for (let i = 0; i < storage_warehouses.length; i++) {
        let obj = storage_warehouses[i]

        warehouses.push({ value: obj.id, name: obj.warehouse_name })
      }

      sessionStorage.setItem('warehouses', JSON.stringify(warehouses))
      responseHandler('success', warehouses)
      return
    }

    responseHandler('success', storage_warehouses)
    return
  }

  let url = HOST + LIST_WAREHOUSES

  fetch(url, {
    method: 'GET',
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then((response) => {
      if (response.length < 1) {
        responseHandler('error', 'No items')
        return
      }

      let warehouses = []
      for (let i = 0; i < response.length; i++) {
        let obj = response[i]

        warehouses.push({ value: obj.id, name: obj.warehouse_name })
      }

      let json = JSON.stringify(warehouses)
      sessionStorage.setItem('warehouses', json)
      responseHandler('success', warehouses)
    })
    .catch((error) => responseHandler('error', error))
}

export function getArticleTypes(classif, responseHandler) {
  if (sessionStorage.getItem('article_types')) {
    let storage_article_types = JSON.parse(
      sessionStorage.getItem('article_types')
    )

    if (storage_article_types[0].hasOwnProperty('article_type_name')) {
      let article_types = []
      for (let i = 0; i < storage_article_types.length; i++) {
        let obj = storage_article_types[i]

        article_types.push({
          value: obj.id,
          name: obj.article_type_name,
          is_parent: obj.is_parent == 1 ? true : false,
        })
      }

      sessionStorage.setItem('article_types', JSON.stringify(article_types))
      responseHandler('success', article_types)
      return
    }

    responseHandler('success', storage_article_types)
    return
  }

  // CAN BE IMPROVED
  let url = HOST + ARTICLE_TYPE_LIST + '?classif=' + classif

  fetch(url, {
    method: 'GET',
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then((response) => {
      if (response.length < 1) {
        responseHandler('error', 'No items')
        return
      }

      let article_types = []
      for (let i = 0; i < response.length; i++) {
        let obj = response[i]

        article_types.push({
          value: obj.id,
          name: obj.article_type_name,
          is_parent: obj.is_parent == 1 ? true : false,
        })
      }

      let json = JSON.stringify(article_types)
      sessionStorage.setItem('article_types', json)
      responseHandler('success', article_types)
    })
    .catch((error) => responseHandler('error', error))
}
