/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { categoryConstants } from '../actions/constants'

const initState = {
  loading: false,
  error: null,
  categories: [],
  get_categories: true,
  get_singlecategory: true,
  is_category_added: false,
  pageIndex: 0,
  total_pages: 0,
  total_users_count: 0,
  prevPage: false,
  nextPage: false,
  category_data: {},
}

export default (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.SAVE_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
        get_categories: false,
        is_category_added: false,
      }
      break
    case categoryConstants.SAVE_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_categories: true,
        is_category_added: true,
        message: action.payload.message,
        category_data: {},
      }
      break
    case categoryConstants.SAVE_CATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        get_categories: false,
        is_category_added: false,
        message: action.payload.message,
      }
      break
    case categoryConstants.UPDATE_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
        get_categories: false,
        is_category_added: false,
      }
      break
    case categoryConstants.UPDATE_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_categories: true,
        is_category_added: true,
        message: action.payload.message,
        category_data: {},
      }
      break
    case categoryConstants.UPDATE_CATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        get_categories: false,
        is_category_added: false,
        message: action.payload.message,
      }
      break
    case categoryConstants.DELETE_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
        get_categories: false,
        is_category_added: false,
      }
      break
    case categoryConstants.DELETE_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_categories: true,
        message: action.payload.message,
      }
      break
    case categoryConstants.DELETE_CATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        get_categories: false,
        message: action.payload.message,
      }
      break
    case categoryConstants.GET_CATEGORIES_REQUEST:
      state = {
        ...state,
        loading: true,
        get_categories: true,
        is_category_added: false,
      }
      break
    case categoryConstants.GET_CATEGORIES_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_categories: false,
        is_category_added: false,
        categories: action.payload,
        pageIndex: action.payload.pageIndex,
        total_pages: action.payload.total_pages,
        total_users_count: action.payload.total_users_count,
        prevPage: action.payload.prevPage,
        nextPage: action.payload.nextPage,
        category_data: {},
      }
      break
    case categoryConstants.GET_CATEGORIES_FAILURE:
      state = {
        ...state,
        loading: false,
        get_categories: false,
        message: action.payload.message,
      }
      break
    case categoryConstants.GET_SINGLECATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
        get_singlecategory: true,
      }
      break
    case categoryConstants.GET_SINGLECATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_singlecategory: false,
        category_data: action.payload,
      }
      break
    case categoryConstants.GET_SINGLECATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        get_singlecategory: false,
        message: action.payload.message,
      }
      break
    case categoryConstants.CATEGORIES_RESET:
      state = initState
      break
  }

  return state
}
