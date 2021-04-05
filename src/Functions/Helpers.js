export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export function setSelectOptions(options) {
  if (options.length < 1) {
    return
  }

  let select_options = []

  for (op in options) {
    select_options.push(
      <option className='global-form-input-select-option' value={op.value}>
        {op.name}
      </option>
    )
  }

  return select_options
}
