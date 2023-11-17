import { GET_SEARCH, actionSearchType  } from '../actionTypes/search'

export const getSearch = (action: actionSearchType): actionSearchType => {
  return {
    type: GET_SEARCH,
    payload: action.payload
  }
}
