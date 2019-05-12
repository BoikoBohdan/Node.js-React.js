import React from 'react'
import Routing from './Routing'
import { Provider } from 'react-redux'
import store from './store'

function App () {
  return (
    <div className='App'>
      <Provider store={store}>
        <Routing />
      </Provider>
    </div>
  )
}

export default App
