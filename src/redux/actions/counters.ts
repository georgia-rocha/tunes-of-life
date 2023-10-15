import { GET_COUNTERS, actionCountersType } from '../actionTypes/counters'

export const getCounters = (action: actionCountersType): actionCountersType => {
  return {
    type: GET_COUNTERS,
    payload: action.payload
  }
}
