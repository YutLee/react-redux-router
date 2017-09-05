import 'babel-polyfill'

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN'
export const FAIL_LOGIN = 'FAIL_LOGIN'

const requestLogin = () => {
  return {
    type: REQUEST_LOGIN
  }
}

const loginSuccess = mobile => {
  return {
    type: SUCCESS_LOGIN,
    mobile,
    receivedAt: Date.now()
  }
}

const loginFail = message => {
  return {
    type: FAIL_LOGIN,
    message,
    receivedAt: Date.now()
  }
}

const fetchLogin = () => {
  return async (dispatch) => {
    dispatch(requestLogin())

    const json = await fetch('/mock/login.json', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(err => err)

    if(json.code == 200) {
      dispatch(loginSuccess(json.mobile))
    }else {
      dispatch(loginFail(json.message))
    }
  }
}

const shouldFetchLogin = state => {
  const { login } = state
  return !login.isFetching
}

export function fetchLoginIfNeeded(q) {
  return (dispatch, getState) => {
    if (shouldFetchLogin(getState())) {
      return dispatch(fetchLogin(q))
    }
  }
}
