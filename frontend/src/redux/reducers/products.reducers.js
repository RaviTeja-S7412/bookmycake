/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { productConstants } from '../actions/constants'

const initState = {
  loading: false,
  error: null,
  products: [],
  get_products: true,
  get_singleproduct: true,
  is_product_added: false,
  pageIndex: 0,
  total_pages: 0,
  total_users_count: 0,
  prevPage: false,
  nextPage: false,
  product_data: {},
}

export default (state = initState, action) => {
  switch (action.type) {
    case productConstants.SAVE_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
        get_products: false,
        is_product_added: false,
      }
      break
    case productConstants.SAVE_PRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_products: true,
        is_product_added: true,
        message: action.payload.message,
        product_data: {},
      }
      break
    case productConstants.SAVE_PRODUCT_FAILURE:
      state = {
        ...state,
        loading: false,
        get_products: false,
        is_product_added: false,
        message: action.payload.message,
      }
      break
    case productConstants.UPDATE_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
        get_products: false,
        is_product_added: false,
      }
      break
    case productConstants.UPDATE_PRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_products: true,
        is_product_added: true,
        message: action.payload.message,
        product_data: {},
      }
      break
    case productConstants.UPDATE_PRODUCT_FAILURE:
      state = {
        ...state,
        loading: false,
        get_products: false,
        is_product_added: false,
        message: action.payload.message,
      }
      break
    case productConstants.DELETE_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
        get_products: false,
        is_product_added: false,
      }
      break
    case productConstants.DELETE_PRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_products: true,
        message: action.payload.message,
      }
      break
    case productConstants.DELETE_PRODUCT_FAILURE:
      state = {
        ...state,
        loading: false,
        get_products: false,
        message: action.payload.message,
      }
      break
    case productConstants.GET_PRODUCTS_REQUEST:
      state = {
        ...state,
        loading: true,
        get_products: true,
        is_product_added: false,
      }
      break
    case productConstants.GET_PRODUCTS_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_products: false,
        is_product_added: false,
        products: action.payload,
        product_data: {},
      }
      break
    case productConstants.GET_PRODUCTS_FAILURE:
      state = {
        ...state,
        loading: false,
        get_products: false,
        message: action.payload.message,
      }
      break
    case productConstants.GET_SINGLEPRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
        get_singleproduct: true,
      }
      break
    case productConstants.GET_SINGLEPRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_singleproduct: false,
        product_data: action.payload,
      }
      break
    case productConstants.GET_SINGLEPRODUCT_FAILURE:
      state = {
        ...state,
        loading: false,
        get_singleproduct: false,
        message: action.payload.message,
      }
      break  

    case productConstants.PRODUCTS_RESET:
      state = initState
      break
  }

  return state
}
