import authReducer from './auth.reducers'
import { combineReducers } from 'redux'
import categoriesReducers from './categories.reducers'
import citiesReducers from './cities.reducers'
import areasReducers from './areas.reducers'
import productsReducers from './products.reducers'
import propsReducers from './props.reducers'
import propcategoriesReducers from './propcategory.reducers'

const appReducer = combineReducers({
  auth: authReducer,
  categories: categoriesReducers,
  products: productsReducers,
  cities: citiesReducers,
  areas : areasReducers,
  props : propsReducers,
  propcategories : propcategoriesReducers
})
const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

export default rootReducer
