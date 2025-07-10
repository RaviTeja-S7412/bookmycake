/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */

import { cartConstants } from "../../actions/constants"

const initState = {
  loading: false,
  error: null,
  cart_data: [],
  props: [],
  prop_categories: [],
  user_addresses: [],
  get_cart: true,
  get_props: true,
  is_cart_added: false,
  is_prop_added: false
}

export default (state = initState, action) => {
  switch (action.type) {
    case cartConstants.SAVE_CART_REQUEST:
      state = {
        ...state,
        loading: true,
        get_cart: false,
        is_cart_added: false,
      }
      break
    case cartConstants.SAVE_CART_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_cart: true,
        is_cart_added: true,
        message: action.payload.message
      }
      break
    case cartConstants.SAVE_CART_FAILURE:
      state = {
        ...state,
        loading: false,
        get_cart: false,
        is_cart_added: false,
        message: action.payload.message,
      }
      break
    case cartConstants.UPDATE_CART_REQUEST:
      state = {
        ...state,
        loading: true,
        get_cart: false,
        is_cart_added: false,
      }
      break
    case cartConstants.UPDATE_CART_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_cart: true,
        is_cart_added: true,
        message: action.payload.message
      }
      break
    case cartConstants.UPDATE_CART_FAILURE:
      state = {
        ...state,
        loading: false,
        get_cart: false,
        is_cart_added: false,
        message: action.payload.message,
      }
      break
    case cartConstants.DELETE_CART_REQUEST:
      state = {
        ...state,
        loading: true,
        get_cart: false,
        is_cart_added: false,
      }
      break
    case cartConstants.DELETE_CART_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_cart: true,
        message: action.payload.message,
      }
      break
    case cartConstants.DELETE_CART_FAILURE:
      state = {
        ...state,
        loading: false,
        get_cart: false,
        message: action.payload.message,
      }
      break
    case cartConstants.GET_CART_REQUEST:
      state = {
        ...state,
        loading: true,
        get_cart: true,
        is_cart_added: false,
        cart_data: [],
        user_addresses: [],
      }
      break
    case cartConstants.GET_CART_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_cart: false,
        is_cart_added: false,
        cart_data: action.payload.cart_data,
        user_addresses: action.payload.user_addresses,
      }
      break
    case cartConstants.GET_CART_FAILURE:
      state = {
        ...state,
        loading: false,
        get_cart: false,
        message: action.payload.message,
      }
      break

    case cartConstants.GET_PROPS_REQUEST:
      state = {
        ...state,
        loading: true,
        get_props: true,
        is_prop_added: false,
      }
      break
    case cartConstants.GET_PROPS_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_props: false,
        is_prop_added: false,
        props: action.payload.props,
        prop_categories: action.payload.categories,
      }
      break
    case cartConstants.GET_PROPS_FAILURE:
      state = {
        ...state,
        loading: false,
        get_props: false,
        message: action.payload.message,
      }
      break
    case cartConstants.SAVE_PROP_REQUEST:
      state = {
        ...state,
        loading: true,
        get_cart: false,
        is_prop_added: false,
      }
      break
    case cartConstants.SAVE_PROP_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_cart: true,
        is_prop_added: true,
        message: action.payload.message
      }
      break
    case cartConstants.SAVE_PROP_FAILURE:
      state = {
        ...state,
        loading: false,
        get_cart: false,
        is_prop_added: false,
        message: action.payload.message,
      }
      break

    case cartConstants.CART_RESET:
      state = initState
      break
  }

  return state
}
