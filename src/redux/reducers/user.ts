import { GET_USER } from '../actionTypes/user';

const initialState = {
  name: '',
  password: '',
  image: '',
}

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...initialState,
        name: action.payload.name,
        password: action.payload.password,
        image: action.payload.image,
      }
    default:
      return state
  }
}

export default userReducer


