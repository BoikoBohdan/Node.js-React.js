import { TESTREQUEST } from '../actionTypes'

export function addTest (payload) {
  return { type: TESTREQUEST, payload }
}
