const getData = (url, apiMethod, params) =>
  fetch('https://jsonplaceholder.typicode.com/' + url, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json'
    },
    method: apiMethod,
    body: params
  })
    .then(response => response.json())
    .then(responseJson => responseJson)

export default getData
