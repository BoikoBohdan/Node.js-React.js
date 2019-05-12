import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import Reducers from '../reducers'
import rootSaga from '../sagas'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

const store = createStore(Reducers, applyMiddleware(...middlewares))

sagaMiddleware.run(rootSaga)

export default store
