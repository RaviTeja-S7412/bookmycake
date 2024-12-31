import authReducer from './auth.reducers'
import { combineReducers } from 'redux'

const appReducer = combineReducers({
  auth: authReducer,
})
const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

export default rootReducer
