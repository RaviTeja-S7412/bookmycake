import axiosIntance from '../../components/axios'
import { areaConstants } from './constants'

export const createArea = (udata) => {
  return async (dispatch) => {
    dispatch({ type: areaConstants.SAVE_AREA_REQUEST })
    const res = await axiosIntance.post(`/admin/create_area`, udata)

    if (res.status === 200) {
      dispatch({
        type: areaConstants.SAVE_AREA_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: areaConstants.SAVE_AREA_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const updateArea = (udata) => {
  return async (dispatch) => {
    dispatch({ type: areaConstants.UPDATE_AREA_REQUEST })
    const res = await axiosIntance.put(`/admin/update_area`, udata)

    if (res.status === 200) {
      dispatch({
        type: areaConstants.UPDATE_AREA_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: areaConstants.UPDATE_AREA_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const deleteArea = (id) => {
  return async (dispatch) => {
    dispatch({ type: areaConstants.DELETE_AREA_REQUEST })
    const res = await axiosIntance.delete(`/admin/delete_area/${id}`,)

    if (res.status === 200) {
      dispatch({
        type: areaConstants.DELETE_AREA_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: areaConstants.DELETE_AREA_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const getAreas = (udata) => {
  return async (dispatch) => {
    dispatch({ type: areaConstants.GET_AREAS_REQUEST })
    const res = await axiosIntance.get(`/admin/get_areas`, udata)
    
    if (res.status === 200) {
      dispatch({
        type: areaConstants.GET_AREAS_SUCCESS,
        payload: res.data.areas,
      })
    } else {
      dispatch({
        type: areaConstants.GET_AREAS_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}



export const get_singlearea = (udata) => {
  return async (dispatch) => {
    dispatch({ type: areaConstants.GET_SINGLEAREA_REQUEST })
    const res = await axiosIntance.post(`/admin/get_singlearea`, udata)

    if (res.status === 200) {
      dispatch({
        type: areaConstants.GET_SINGLEAREA_SUCCESS,
        payload: res.data.area_data,
      })
    } else {
      if (res.status === 202) {
        dispatch({
          type: areaConstants.GET_SINGLEAREA_FAILURE,
          payload: { message: res.data.message },
        })
      }
    }
  }
}


