import authReducer from './auth.reducers'
import { combineReducers } from 'redux'
import categoriesReducers from './categories.reducers'
import productsReducers from './products.reducers'

const appReducer = combineReducers({
  auth: authReducer,
  categories: categoriesReducers,
  products: productsReducers
})
const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

export default rootReducer
