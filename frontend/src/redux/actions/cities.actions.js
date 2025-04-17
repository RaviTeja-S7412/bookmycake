import axiosIntance from '../../components/axios'
import { cityConstants } from './constants'

export const createCity = (udata) => {
  return async (dispatch) => {
    dispatch({ type: cityConstants.SAVE_CITY_REQUEST })
    const res = await axiosIntance.post(`/admin/create_city`, udata)

    if (res.status === 200) {
      dispatch({
        type: cityConstants.SAVE_CITY_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: cityConstants.SAVE_CITY_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const updateCity = (udata) => {
  return async (dispatch) => {
    dispatch({ type: cityConstants.UPDATE_CITY_REQUEST })
    const res = await axiosIntance.put(`/admin/update_city`, udata)

    if (res.status === 200) {
      dispatch({
        type: cityConstants.UPDATE_CITY_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: cityConstants.UPDATE_CITY_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const deleteCity = (id) => {
  return async (dispatch) => {
    dispatch({ type: cityConstants.DELETE_CITY_REQUEST })
    const res = await axiosIntance.delete(`/admin/delete_city/${id}`,)

    if (res.status === 200) {
      dispatch({
        type: cityConstants.DELETE_CITY_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: cityConstants.DELETE_CITY_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const getCities = (udata) => {
  return async (dispatch) => {
    dispatch({ type: cityConstants.GET_CITIES_REQUEST })
    const res = await axiosIntance.get(`/admin/get_cities`, udata)
    
    if (res.status === 200) {
      dispatch({
        type: cityConstants.GET_CITIES_SUCCESS,
        payload: res.data.cities,
      })
    } else {
      dispatch({
        type: cityConstants.GET_CITIES_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}



export const get_singlecity = (udata) => {
  return async (dispatch) => {
    dispatch({ type: cityConstants.GET_SINGLECITY_REQUEST })
    const res = await axiosIntance.post(`/admin/get_singlecity`, udata)

    if (res.status === 200) {
      dispatch({
        type: cityConstants.GET_SINGLECITY_SUCCESS,
        payload: res.data.city_data,
      })
    } else {
      if (res.status === 202) {
        dispatch({
          type: cityConstants.GET_SINGLECITY_FAILURE,
          payload: { message: res.data.message },
        })
      }
    }
  }
}