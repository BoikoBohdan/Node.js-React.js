import { TESTERROR, TESTREQUEST, TESTSUCCESS } from '../actionTypes'

const initialState = {
  loading: false,
  error: null,
  date: null
}
export function test (state = initialState, action) {
  switch (action.type) {
    case TESTREQUEST:
      return { ...state, loading: true, error: null, date: null }
    case TESTERROR:
      return { ...state, loading: false, error: action.error }
    case TESTSUCCESS:
      console.log('error', action)
      return { ...state, loading: false, error: null, data: action.data }
    default:
      return state
  }
}
