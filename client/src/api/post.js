const postData = (url, params) =>
  fetch('https://jsonplaceholder.typicode.com/' + url, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json'
    },
    method: 'POST',
    body: params
  }).then(response => response)

const postAuthData = (url, params) =>
  fetch('http://localhost:3000/' + url, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(params)
  }).then(response => response)

export { postData, postAuthData }
