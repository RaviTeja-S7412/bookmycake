import axiosIntance from '../../components/axios'
import { propCategoriesConstants } from './constants'

export const createpropCategory = (udata) => {
  return async (dispatch) => {
    dispatch({ type: propCategoriesConstants.SAVE_PROPCATEGORY_REQUEST })
    const res = await axiosIntance.post(`/admin/create_propcategory`, udata)

    if (res.status === 200) {
      dispatch({
        type: propCategoriesConstants.SAVE_PROPCATEGORY_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: propCategoriesConstants.SAVE_PROPCATEGORY_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const updatepropCategory = (udata) => {
  return async (dispatch) => {
    dispatch({ type: propCategoriesConstants.UPDATE_PROPCATEGORY_REQUEST })
    const res = await axiosIntance.put(`/admin/update_propcategory`, udata)

    if (res.status === 200) {
      dispatch({
        type: propCategoriesConstants.UPDATE_PROPCATEGORY_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: propCategoriesConstants.UPDATE_PROPCATEGORY_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const deletepropCategory = (id) => {
  return async (dispatch) => {
    dispatch({ type: propCategoriesConstants.DELETE_PROPCATEGORY_REQUEST })
    const res = await axiosIntance.delete(`/admin/delete_category/${id}`,)

    if (res.status === 200) {
      dispatch({
        type: propCategoriesConstants.DELETE_PROPCATEGORY_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: propCategoriesConstants.DELETE_PROPCATEGORY_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const getpropCategories = (udata) => {
  return async (dispatch) => {
    dispatch({ type: propCategoriesConstants.GET_PROPCATEGORIS_REQUEST })
    const res = await axiosIntance.get(`/admin/get_propcategories`, udata)
    
    if (res.status === 200) {
      dispatch({
        type: propCategoriesConstants.GET_PROPCATEGORIS_SUCCESS,
        payload: res.data.propcategories,
      })
    } else {
      dispatch({
        type: propCategoriesConstants.GET_PROPCATEGORIS_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const get_singlepropcategory = (udata) => {
  return async (dispatch) => {
    dispatch({ type: propCategoriesConstants.GET_SINGLEPROPCATEGORY_REQUEST })
    const res = await axiosIntance.post(`/admin/get_singlepropcategory`, udata)

    if (res.status === 200) {
      dispatch({
        type: propCategoriesConstants.GET_SINGLEPROPCATEGORY_SUCCESS,
        payload: res.data.propcategory_data,
      })
    } else {
      if (res.status === 202) {
        dispatch({
          type: propCategoriesConstants.GET_SINGLEPROPCATEGORY_FAILURE,
          payload: { message: res.data.message },
        })
      }
    }
  }
}

