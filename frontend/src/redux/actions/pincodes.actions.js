import axiosIntance from '../../components/axios'
import { pincodeConstants } from './constants'

export const createPincode = (udata) => {
  return async (dispatch) => {
    dispatch({ type: pincodeConstants.SAVE_PINCODE_REQUEST })
    const res = await axiosIntance.post(`/admin/create_pincode`, udata)

    if (res.status === 200) {
      dispatch({
        type: pincodeConstants.SAVE_PINCODE_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: pincodeConstants.SAVE_PINCODE_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const updatePincode = (udata) => {
  return async (dispatch) => {
    dispatch({ type: pincodeConstants.UPDATE_PINCODE_REQUEST })
    const res = await axiosIntance.put(`/admin/update_pincode`, udata)

    if (res.status === 200) {
      dispatch({
        type: pincodeConstants.UPDATE_PINCODE_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: pincodeConstants.UPDATE_PINCODE_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const deletePincode = (id) => {
  return async (dispatch) => {
    dispatch({ type: pincodeConstants.DELETE_PINCODE_REQUEST })
    const res = await axiosIntance.delete(`/admin/delete_pincode/${id}`,)

    if (res.status === 200) {
      dispatch({
        type: pincodeConstants.DELETE_PINCODE_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: pincodeConstants.DELETE_PINCODE_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const getPincodes = (udata) => {
  return async (dispatch) => {
    dispatch({ type: pincodeConstants.GET_PINCODES_REQUEST })
    const res = await axiosIntance.get(`/admin/get_pincodes`, udata)
    
    if (res.status === 200) {
      dispatch({
        type: pincodeConstants.GET_PINCODES_SUCCESS,
        payload: res.data.pincodes,
      })
    } else {
      dispatch({
        type: pincodeConstants.GET_PINCODES_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}



export const get_singlepincode = (udata) => {
  return async (dispatch) => {
    dispatch({ type: pincodeConstants.GET_SINGLEPINCODE_REQUEST })
    const res = await axiosIntance.post(`/admin/get_singlepincode`, udata)

    if (res.status === 200) {
      dispatch({
        type: pincodeConstants.GET_SINGLEPINCODE_SUCCESS,
        payload: res.data.pincode_data,
      })
    } else {
      if (res.status === 202) {
        dispatch({
          type: pincodeConstants.GET_SINGLEPINCODE_FAILURE,
          payload: { message: res.data.message },
        })
      }
    }
  }
}