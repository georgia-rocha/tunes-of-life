import { GET_SEARCH } from '../actionTypes/search';

const initialState = {
  data: {
    term: '',
    result: []
  }
};

const searchReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_SEARCH:
      return {
        ...initialState,
        data: action.payload,
      }
    default:
      return state
  }
}

export default searchReducer


