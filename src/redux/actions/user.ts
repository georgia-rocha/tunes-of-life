import { GET_USER, actionUserType } from '../actionTypes/user'

export const getUser = (action: actionUserType): actionUserType => {
  return {
    type: GET_USER,
    payload: action.payload
  }
}
