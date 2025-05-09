/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { areaConstants } from '../actions/constants'

const initState = {
  loading: false,
  error: null,
  areas: [],
  get_areas: true,
  get_singlearea: true,
  is_area_added: false,
  pageIndex: 0,
  total_pages: 0,
  total_users_count: 0,
  prevPage: false,
  nextPage: false,
  area_data: {},

}

export default (state = initState, action) => {
  switch (action.type) {
    case areaConstants.SAVE_AREA_REQUEST:
      state = {
        ...state,
        loading: true,
        get_areas: false,
        is_area_added: false,
      }
      break
    case areaConstants.SAVE_AREA_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_areas: true,
        is_area_added: true,
        message: action.payload.message,
        area_data: {},
      }
      break
    case areaConstants.SAVE_AREA_FAILURE:
      state = {
        ...state,
        loading: false,
        get_areas: false,
        is_area_added: false,
        message: action.payload.message,
      }
      break
    case areaConstants.UPDATE_AREA_REQUEST:
      state = {
        ...state,
        loading: true,
        get_areas: false,
        is_area_added: false,
      }
      break
    case areaConstants.UPDATE_AREA_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_areas: true,
        is_area_added: true,
        message: action.payload.message,
        area_data: {},
      }
      break
    case areaConstants.UPDATE_AREA_FAILURE:
      state = {
        ...state,
        loading: false,
        get_areas: false,
        is_area_added: false,
        message: action.payload.message,
      }
      break
    case areaConstants.DELETE_AREA_REQUEST:
      state = {
        ...state,
        loading: true,
        get_areas: false,
        is_area_added: false,
      }
      break
    case areaConstants.DELETE_AREA_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_areas: true,
        message: action.payload.message,
      }
      break
    case areaConstants.DELETE_AREA_FAILURE:
      state = {
        ...state,
        loading: false,
        get_areas: false,
        message: action.payload.message,
      }
      break
    case areaConstants.GET_AREAS_REQUEST:
      state = {
        ...state,
        loading: true,
        get_areas: true,
        is_area_added: false,
      }
      break
    case areaConstants.GET_AREAS_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_areas: false,
        is_area_added: false,
        areas: action.payload,
        area_data: {},
      }
      break
    case areaConstants.GET_AREAS_FAILURE:
      state = {
        ...state,
        loading: false,
        get_areas: false,
        message: action.payload.message,
      }
      break
    case areaConstants.GET_SINGLEAREA_REQUEST:
      state = {
        ...state,
        loading: true,
        get_singlearea: true,
      }
      break
    case areaConstants.GET_SINGLEAREA_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_singlearea: false,
        area_data: action.payload,
      }
      break
    case areaConstants.GET_SINGLEAREA_FAILURE:
      state = {
        ...state,
        loading: false,
        get_singlearea: false,
        message: action.payload.message,
      }
      break  


    case areaConstants.AREAS_RESET:
      state = initState
      break
  }

  return state
}
