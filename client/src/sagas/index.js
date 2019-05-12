import { takeLatest } from 'redux-saga/effects'

import { TESTREQUEST } from '../actionTypes'

import { fetchTest } from './test'

function * rootSaga () {
  yield takeLatest(TESTREQUEST, fetchTest)
}

export default rootSaga
