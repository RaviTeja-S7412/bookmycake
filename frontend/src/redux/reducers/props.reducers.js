/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { propConstants } from '../actions/constants'

const initState = {
  loading: false,
  error: null,
  props: [],
  get_props: true,
  get_singleprop: true,
  is_prop_added: false,
  pageIndex: 0,
  total_pages: 0,
  total_users_count: 0,
  prevPage: false,
  nextPage: false,
  prop_data: {},
}

export default (state = initState, action) => {
  switch (action.type) {
    case propConstants.SAVE_PROP_REQUEST:
      state = {
        ...state,
        loading: true,
        get_props: false,
        is_prop_added: false,
      }
      break
    case propConstants.SAVE_PROP_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_props: true,
        is_prop_added: true,
        message: action.payload.message,
        prop_data: {},
      }
      break
    case propConstants.SAVE_PROP_FAILURE:
      state = {
        ...state,
        loading: false,
        get_props: false,
        is_prop_added: false,
        message: action.payload.message,
      }
      break
    case propConstants.UPDATE_PROP_REQUEST:
      state = {
        ...state,
        loading: true,
        get_props: false,
        is_prop_added: false,
      }
      break
    case propConstants.UPDATE_PROP_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_props: true,
        is_prop_added: true,
        message: action.payload.message,
        prop_data: {},
      }
      break
    case propConstants.UPDATE_PROP_FAILURE:
      state = {
        ...state,
        loading: false,
        get_props: false,
        is_prop_added: false,
        message: action.payload.message,
      }
      break
    case propConstants.DELETE_PROP_REQUEST:
      state = {
        ...state,
        loading: true,
        get_props: false,
        is_prop_added: false,
      }
      break
    case propConstants.DELETE_PROP_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_props: true,
        message: action.payload.message,
      }
      break
    case propConstants.DELETE_PROP_FAILURE:
      state = {
        ...state,
        loading: false,
        get_props: false,
        message: action.payload.message,
      }
      break
    case propConstants.GET_PROPS_REQUEST:
      state = {
        ...state,
        loading: true,
        get_props: true,
        is_prop_added: false,
      }
      break
    case propConstants.GET_PROPS_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_props: false,
        is_prop_added: false,
        props: action.payload,
        prop_data: {},
      }
      break
    case propConstants.GET_PROPS_FAILURE:
      state = {
        ...state,
        loading: false,
        get_props: false,
        message: action.payload.message,
      }
      break
    case propConstants.GET_SINGLEPROP_REQUEST:
      state = {
        ...state,
        loading: true,
        get_singleprop: true,
      }
      break
    case propConstants.GET_SINGLEPROP_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_singleprop: false,
        prop_data: action.payload,
      }
      break
    case propConstants.GET_SINGLEPROP_FAILURE:
      state = {
        ...state,
        loading: false,
        get_singleprop: false,
        message: action.payload.message,
      }
      break  

    case propConstants.PROPS_RESET:
      state = initState
      break
  }

  return state
}
