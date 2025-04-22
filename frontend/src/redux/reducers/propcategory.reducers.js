/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { propCategoriesConstants } from '../actions/constants'

const initState = {
  loading: false,
  error: null,
  propcategories: [],
  get_propcategories: true,
  get_singlepropcategory: true,
  is_propcategory_added: false,
  pageIndex: 0,
  total_pages: 0,
  total_users_count: 0,
  prevPage: false,
  nextPage: false,
  propcategory_data: {},
}

export default (state = initState, action) => {
  switch (action.type) {
    case propCategoriesConstants.SAVE_PROPCATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
        get_propcategories: false,
        is_propcategory_added: false,
      }
      break
    case propCategoriesConstants.SAVE_PROPCATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_propcategories: true,
        is_propcategory_added: true,
        message: action.payload.message,
        propcategory_data: {},
      }
      break
    case propCategoriesConstants.SAVE_PROPCATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        get_propcategories: false,
        is_propcategory_added: false,
        message: action.payload.message,
      }
      break
    case propCategoriesConstants.UPDATE_PROPCATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
        get_propcategories: false,
        is_propcategory_added: false,
      }
      break
    case propCategoriesConstants.UPDATE_PROPCATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_propcategories: true,
        is_propcategory_added: true,
        message: action.payload.message,
        propcategory_data: {},
      }
      break
    case propCategoriesConstants.UPDATE_PROPCATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        get_propcategories: false,
        is_propcategory_added: false,
        message: action.payload.message,
      }
      break
    case propCategoriesConstants.DELETE_PROPCATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
        get_propcategories: false,
        is_propcategory_added: false,
      }
      break
    case propCategoriesConstants.DELETE_PROPCATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_propcategories: true,
        message: action.payload.message,
      }
      break
    case propCategoriesConstants.DELETE_PROPCATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        get_propcategories: false,
        message: action.payload.message,
      }
      break
    case propCategoriesConstants.GET_PROPCATEGORIS_REQUEST: 
      state = {
        ...state,
        loading: true,
        get_propcategories: true,
        is_propcategory_added: false,
      }
      break
    case propCategoriesConstants.GET_PROPCATEGORIS_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_propcategories: false,
        is_propcategory_added: false,
        propcategories: action.payload,
        propcategory_data: {},
      }
      break
    case propCategoriesConstants.GET_PROPCATEGORIS_FAILURE:
      state = {
        ...state,
        loading: false,
        get_propcategories: false,
        message: action.payload.message,
      }
      break
    case propCategoriesConstants.GET_SINGLEPROPCATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
        get_propsinglecategory: true,
      }
      break
    case propCategoriesConstants.GET_SINGLEPROPCATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_propsinglecategory: false,
        propcategory_data: action.payload,
      }
      break
    case propCategoriesConstants.GET_SINGLEPROPCATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        get_propsinglecategory: false,
        message: action.payload.message,
      }
      break  



    case propCategoriesConstants.PROPCATEGORIES_RESET:
      state = initState
      break
  }

  return state
}
