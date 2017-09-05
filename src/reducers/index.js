import { combineReducers } from 'redux'
import {
  REQUEST_LOGIN,
  SUCCESS_LOGIN,
  FAIL_LOGIN
} from '../actions/login'

function login(state = {isFetching: false}, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {
        isFetching: true
      }
    case SUCCESS_LOGIN:
      return {
        isFetching: false,
        mobile: action.mobile
      }
    case FAIL_LOGIN:
      return {
        isFetching: false,
        message: action.message
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  login
})

export default rootReducer
