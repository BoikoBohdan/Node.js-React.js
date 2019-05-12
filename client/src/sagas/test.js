import { call, put } from 'redux-saga/effects'
import { TESTSUCCESS, TESTERROR } from '../actionTypes'
import getData from '../api/get'

export function * fetchTest (action) {
  try {
    const user = yield call(getData, 'posts', 'GET')
    yield put({ type: TESTSUCCESS, data: user })
  } catch (e) {
    yield put({ type: TESTERROR, error: e.message })
  }
}
