/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { bannerConstants } from '../actions/constants'

const initState = {
  loading: false,
  error: null,
  banners: [],
  get_banners: true,
  get_singlebanner: true,
  is_banner_added: false,
  pageIndex: 0,
  total_pages: 0,
  prevPage: false,
  nextPage: false,
  banner_data: {},
}

export default (state = initState, action) => {
  switch (action.type) {
    case bannerConstants.SAVE_BANNER_REQUEST:
      state = {
        ...state,
        loading: true,
        get_banners: false,
        is_banner_added: false,
      }
      break
    case bannerConstants.SAVE_BANNER_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_banners: true,
        is_banner_added: true,
        message: action.payload.message,
        banner_data: {},
      }
      break
    case bannerConstants.SAVE_BANNER_FAILURE:
      state = {
        ...state,
        loading: false,
        get_banners: false,
        is_banner_added: false,
        message: action.payload.message,
      }
      break
    case bannerConstants.UPDATE_BANNER_REQUEST:
      state = {
        ...state,
        loading: true,
        get_banners: false,
        is_banner_added: false,
      }
      break
    case bannerConstants.UPDATE_BANNER_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_banners: true,
        is_banner_added: true,
        message: action.payload.message,
        banner_data: {},
      }
      break
    case bannerConstants.UPDATE_BANNER_FAILURE:
      state = {
        ...state,
        loading: false,
        get_banners: false,
        is_banner_added: false,
        message: action.payload.message,
      }
      break
    case bannerConstants.DELETE_BANNER_REQUEST:
      state = {
        ...state,
        loading: true,
        get_banners: false,
        is_banner_added: false,
      }
      break
    case bannerConstants.DELETE_BANNER_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_banners: true,
        message: action.payload.message,
      }
      break
    case bannerConstants.DELETE_BANNER_FAILURE:
      state = {
        ...state,
        loading: false,
        get_banners: false,
        message: action.payload.message,
      }
      break
    case bannerConstants.GET_BANNERS_REQUEST:
      state = {
        ...state,
        loading: true,
        get_banners: true,
        is_banner_added: false,
      }
      break
    case bannerConstants.GET_BANNERS_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_banners: false,
        is_banner_added: false,
        banners: action.payload,
        banner_data: {},
      }
      break
    case bannerConstants.GET_BANNERS_FAILURE:
      state = {
        ...state,
        loading: false,
        get_banners: false,
        message: action.payload.message,
      }
      break
    case bannerConstants.GET_SINGLEBANNER_REQUEST:
      state = {
        ...state,
        loading: true,
        get_singlebanner: true,
      }
      break
    case bannerConstants.GET_SINGLEBANNER_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_singlebanner: false,
        banner_data: action.payload,
      }
      break
    case bannerConstants.GET_SINGLEBANNER_FAILURE:
      state = {
        ...state,
        loading: false,
        get_singlebanner: false,
        message: action.payload.message,
      }
      break  


    case bannerConstants.BANNERS_RESET:
      state = initState
      break
  }

  return state
}
