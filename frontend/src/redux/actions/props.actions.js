import axiosIntance from '../../components/axios'
import { propConstants } from './constants'

export const createProp = (udata) => {
  return async (dispatch) => {
    dispatch({ type: propConstants.SAVE_PROP_REQUEST })
    const res = await axiosIntance.post(`/admin/create_prop`, udata)

    if (res.status === 200) {
      dispatch({
        type: propConstants.SAVE_PROP_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: propConstants.SAVE_PROP_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const updateProp = (udata) => {
  return async (dispatch) => {
    dispatch({ type: propConstants.UPDATE_PROP_REQUEST })
    const res = await axiosIntance.put(`/admin/update_prop`, udata)

    if (res.status === 200) {
      dispatch({
        type: propConstants.UPDATE_PROP_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: propConstants.UPDATE_PROP_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const deleteProp = (id) => {
  return async (dispatch) => {
    dispatch({ type: propConstants.DELETE_PROP_REQUEST })
    const res = await axiosIntance.delete(`/admin/delete_prop/${id}`,)

    if (res.status === 200) {
      dispatch({
        type: propConstants.DELETE_PROP_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: propConstants.DELETE_PROP_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const getProps = (udata) => {
  return async (dispatch) => {
    dispatch({ type: propConstants.GET_PROPS_REQUEST })
    const res = await axiosIntance.get(`/admin/get_props`, udata)
    
    if (res.status === 200) {
      dispatch({
        type: propConstants.GET_PROPS_SUCCESS,
        payload: res.data.props,
      })
    } else {
      dispatch({
        type: propConstants.GET_PROPS_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}




export const get_singleprop = (udata) => {
  return async (dispatch) => {
    dispatch({ type: propConstants.GET_SINGLEPROP_REQUEST })
    const res = await axiosIntance.post(`/admin/get_singleprop`, udata)

    if (res.status === 200) {
      dispatch({
        type: propConstants.GET_SINGLEPROP_SUCCESS,
        payload: res.data.prop_data,
      })
    } else {
      if (res.status === 202) {
        dispatch({
          type: propConstants.GET_SINGLEPROP_FAILURE,
          payload: { message: res.data.message },
        })
      }
    }
  }
}

