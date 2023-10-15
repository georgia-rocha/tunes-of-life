import { GET_COUNTERS } from '../actionTypes/counters'

const initialState = {
  counters: 0
}

const countersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_COUNTERS:
      return {
        ...initialState,
        counters: action.payload
      }
    default:
      return state
  }
}

export default countersReducer
