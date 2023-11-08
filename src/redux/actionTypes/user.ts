export type actionUserType = {
  type: string,
  payload: {
    name: string,
    password: string,
    image: string,
  }
}

export const GET_USER = 'GET_USER'
