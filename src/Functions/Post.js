let HOST = 'http://localhost:3000/api/'

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

// SIMPLE POST REQUES
export function postRequest(path, data, responseHandler) {
  let url = HOST + path

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then(handleErrors)
    .then((response) => responseHandler('success', response))
    .catch((error) => responseHandler('error', error))
}
