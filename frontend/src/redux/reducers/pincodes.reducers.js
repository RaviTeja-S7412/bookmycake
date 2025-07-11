/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { pincodeConstants } from '../actions/constants'

const initState = {
  loading: false,
  error: null,
  pincodes: [],
  get_pincodes: true,
  get_singlepincode: true,
  is_pincode_added: false,
  pageIndex: 0,
  total_pages: 0,
  total_users_count: 0,
  prevPage: false,
  nextPage: false,
  pincode_data: {},

}

export default (state = initState, action) => {
  switch (action.type) {
    case pincodeConstants.SAVE_PINCODE_REQUEST:
      state = {
        ...state,
        loading: true,
        get_pincodes: false,
        is_pincode_added: false,
      }
      break
    case pincodeConstants.SAVE_PINCODE_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_pincodes: true,
        is_pincode_added: true,
        message: action.payload.message,
        pincode_data: {},
      }
      break
    case pincodeConstants.SAVE_PINCODE_FAILURE:
      state = {
        ...state,
        loading: false,
        get_pincodes: false,
        is_pincode_added: false,
        message: action.payload.message,
      }
      break
    case pincodeConstants.UPDATE_PINCODE_REQUEST:
      state = {
        ...state,
        loading: true,
        get_pincodes: false,
        is_pincode_added: false,
      }
      break
    case pincodeConstants.UPDATE_PINCODE_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_pincodes: true,
        is_pincode_added: true,
        message: action.payload.message,
        pincode_data: {},
      }
      break
    case pincodeConstants.UPDATE_PINCODE_FAILURE:
      state = {
        ...state,
        loading: false,
        get_pincodes: false,
        is_pincode_added: false,
        message: action.payload.message,
      }
      break
    case pincodeConstants.DELETE_PINCODE_REQUEST:
      state = {
        ...state,
        loading: true,
        get_pincodes: false,
        is_pincode_added: false,
      }
      break
    case pincodeConstants.DELETE_PINCODE_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_pincodes: true,
        message: action.payload.message,
      }
      break
    case pincodeConstants.DELETE_PINCODE_FAILURE:
      state = {
        ...state,
        loading: false,
        get_pincodes: false,
        message: action.payload.message,
      }
      break
    case pincodeConstants.GET_PINCODES_REQUEST:
      state = {
        ...state,
        loading: true,
        get_pincodes: true,
        is_pincode_added: false,
      }
      break
    case pincodeConstants.GET_PINCODES_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_pincodes: false,
        is_pincode_added: false,
        pincodes: action.payload,
        pincode_data: {},
      }
      break
    case pincodeConstants.GET_PINCODES_FAILURE:
      state = {
        ...state,
        loading: false,
        get_pincodes: false,
        message: action.payload.message,
      }
      break
    case pincodeConstants.GET_SINGLEPINCODE_REQUEST:
      state = {
        ...state,
        loading: true,
        get_singlepincode: true,
      }
      break
    case pincodeConstants.GET_SINGLEPINCODE_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_singlepincode: false,
        pincode_data: action.payload,
      }
      break
    case pincodeConstants.GET_SINGLEPINCODE_FAILURE:
      state = {
        ...state,
        loading: false,
        get_singlepincode: false,
        message: action.payload.message,
      }
      break  


    case pincodeConstants.PINCODES_RESET:
      state = initState
      break
  }

  return state
}
