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
  get_sub_categories_categoryid: false,
  category_data: {},

// sub categories

  sub_categories: [],
  get_subcategories: true,
  get_singlesubcategory: true,
  is_subcategory_added: false,
  subcategory_data: {},
  subcategoriesbyid_data: [],

// child categories

  child_categories: [],
  get_childcategories: true,
  get_singlechildcategory: true,
  is_childcategory_added: false,
  childcategory_data: {},  
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

// sub categories

    case categoryConstants.SAVE_SUBCATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
        get_subcategories: false,
        is_subcategory_added: false,
      }
      break
    case categoryConstants.SAVE_SUBCATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_subcategories: true,
        is_subcategory_added: true,
        message: action.payload.message,
        subcategory_data: {},
      }
      break
    case categoryConstants.SAVE_SUBCATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        get_subcategories: false,
        is_subcategory_added: false,
        message: action.payload.message,
      }
      break
    case categoryConstants.UPDATE_SUBCATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
        get_subcategories: false,
        is_subcategory_added: false,
      }
      break
    case categoryConstants.UPDATE_SUBCATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_subcategories: true,
        is_subcategory_added: true,
        message: action.payload.message,
        subcategory_data: {},
      }
      break
    case categoryConstants.UPDATE_SUBCATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        get_subcategories: false,
        is_subcategory_added: false,
        message: action.payload.message,
      }
      break
    case categoryConstants.DELETE_SUBCATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
        get_subcategories: false,
        is_subcategory_added: false,
      }
      break
    case categoryConstants.DELETE_SUBCATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_subcategories: true,
        message: action.payload.message,
      }
      break
    case categoryConstants.DELETE_SUBCATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        get_subcategories: false,
        message: action.payload.message,
      }
      break
    case categoryConstants.GET_SUBCATEGORIES_REQUEST:
      state = {
        ...state,
        loading: true,
        get_subcategories: true,
        is_subcategory_added: false,
      }
      break
    case categoryConstants.GET_SUBCATEGORIES_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_subcategories: false,
        is_subcategory_added: false,
        sub_categories: action.payload,
        subcategory_data: {},
      }
      break
    case categoryConstants.GET_SUBCATEGORIES_FAILURE:
      state = {
        ...state,
        loading: false,
        get_subcategories: false,
        message: action.payload.message,
      }
      break
    case categoryConstants.GET_SINGLESUBCATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
        get_singlesubcategory: true,
      }
      break
    case categoryConstants.GET_SINGLESUBCATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_singlesubcategory: false,
        subcategory_data: action.payload,
      }
      break
    case categoryConstants.GET_SINGLESUBCATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        get_singlesubcategory: false,
        message: action.payload.message,
      }
      break  
    
// sub categories

    case categoryConstants.SAVE_CHILDCATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
        get_childcategories: false,
        is_childcategory_added: false,
      }
      break
    case categoryConstants.SAVE_CHILDCATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_childcategories: true,
        is_childcategory_added: true,
        message: action.payload.message,
        childcategory_data: {},
      }
      break
    case categoryConstants.SAVE_CHILDCATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        get_childcategories: false,
        is_childcategory_added: false,
        message: action.payload.message,
      }
      break
    case categoryConstants.UPDATE_CHILDCATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
        get_childcategories: false,
        is_childcategory_added: false,
      }
      break
    case categoryConstants.UPDATE_CHILDCATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_childcategories: true,
        is_childcategory_added: true,
        message: action.payload.message,
        childcategory_data: {},
      }
      break
    case categoryConstants.UPDATE_CHILDCATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        get_childcategories: false,
        is_childcategory_added: false,
        message: action.payload.message,
      }
      break
    case categoryConstants.DELETE_CHILDCATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
        get_childcategories: false,
        is_childcategory_added: false,
      }
      break
    case categoryConstants.DELETE_CHILDCATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_childcategories: true,
        message: action.payload.message,
      }
      break
    case categoryConstants.DELETE_CHILDCATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        get_childcategories: false,
        message: action.payload.message,
      }
      break
    case categoryConstants.GET_CHILDCATEGORIES_REQUEST:
      state = {
        ...state,
        loading: true,
        get_childcategories: true,
        is_childcategory_added: false,
      }
      break
    case categoryConstants.GET_CHILDCATEGORIES_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_childcategories: false,
        is_childcategory_added: false,
        child_categories: action.payload,
        childcategory_data: {},
      }
      break
    case categoryConstants.GET_CHILDCATEGORIES_FAILURE:
      state = {
        ...state,
        loading: false,
        get_childcategories: false,
        message: action.payload.message,
      }
      break
    case categoryConstants.GET_SINGLECHILDCATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
        get_singlechildcategory: true,
      }
      break
    case categoryConstants.GET_SINGLECHILDCATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_singlechildcategory: false,
        childcategory_data: action.payload,
      }
      break
    case categoryConstants.GET_SINGLECHILDCATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        get_singlechildcategory: false,
        message: action.payload.message,
      }
      break  
      

    case categoryConstants.GET_SUBCATEGORIESBYCATEGORYID_REQUEST:
      state = {
        ...state,
        loading: true,
        get_sub_categories_categoryid: true,
        subcategoriesbyid_data: []
      }
      break
    case categoryConstants.GET_SUBCATEGORIESBYCATEGORYID_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_sub_categories_categoryid: false,
        subcategoriesbyid_data: action.payload,
      }
      break
    case categoryConstants.GET_SUBCATEGORIESBYCATEGORYID_FAILURE:
      state = {
        ...state,
        loading: false,
        get_sub_categories_categoryid: false,
        message: action.payload.message,
        subcategoriesbyid_data: []
      }
      break  
    

    case categoryConstants.CATEGORIES_RESET:
      state = initState
      break
  }

  return state
}
