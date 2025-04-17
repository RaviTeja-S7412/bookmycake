/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { cityConstants } from '../actions/constants'

const initState = {
  loading: false,
  error: null,
  cities: [],
  get_cities: true,
  get_singlecity: true,
  is_city_added: false,
  pageIndex: 0,
  total_pages: 0,
  total_users_count: 0,
  prevPage: false,
  nextPage: false,
  city_data: {},

}

export default (state = initState, action) => {
  switch (action.type) {
    case cityConstants.SAVE_CITY_REQUEST:
      state = {
        ...state,
        loading: true,
        get_cities: false,
        is_city_added: false,
      }
      break
    case cityConstants.SAVE_CITY_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_cities: true,
        is_city_added: true,
        message: action.payload.message,
        city_data: {},
      }
      break
    case cityConstants.SAVE_CITY_FAILURE:
      state = {
        ...state,
        loading: false,
        get_cities: false,
        is_city_added: false,
        message: action.payload.message,
      }
      break
    case cityConstants.UPDATE_CITY_REQUEST:
      state = {
        ...state,
        loading: true,
        get_cities: false,
        is_city_added: false,
      }
      break
    case cityConstants.UPDATE_CITY_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_cities: true,
        is_city_added: true,
        message: action.payload.message,
        city_data: {},
      }
      break
    case cityConstants.UPDATE_CITY_FAILURE:
      state = {
        ...state,
        loading: false,
        get_cities: false,
        is_city_added: false,
        message: action.payload.message,
      }
      break
    case cityConstants.DELETE_CITY_REQUEST:
      state = {
        ...state,
        loading: true,
        get_cities: false,
        is_city_added: false,
      }
      break
    case cityConstants.DELETE_CITY_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_cities: true,
        message: action.payload.message,
      }
      break
    case cityConstants.DELETE_CITY_FAILURE:
      state = {
        ...state,
        loading: false,
        get_cities: false,
        message: action.payload.message,
      }
      break
    case cityConstants.GET_CITIES_REQUEST:
      state = {
        ...state,
        loading: true,
        get_cities: true,
        is_city_added: false,
      }
      break
    case cityConstants.GET_CITIES_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_cities: false,
        is_city_added: false,
        cities: action.payload,
        city_data: {},
      }
      break
    case cityConstants.GET_CITIES_FAILURE:
      state = {
        ...state,
        loading: false,
        get_cities: false,
        message: action.payload.message,
      }
      break
    case cityConstants.GET_SINGLECITY_REQUEST:
      state = {
        ...state,
        loading: true,
        get_singlecity: true,
      }
      break
    case cityConstants.GET_SINGLECITY_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_singlecity: false,
        city_data: action.payload,
      }
      break
    case cityConstants.GET_SINGLECITY_FAILURE:
      state = {
        ...state,
        loading: false,
        get_singlecity: false,
        message: action.payload.message,
      }
      break  


    case cityConstants.CITIES_RESET:
      state = initState
      break
  }

  return state
}
