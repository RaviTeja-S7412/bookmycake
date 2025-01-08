import axiosIntance from '../../components/axios'
import { categoryConstants } from './constants'

export const createCategory = (udata) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.SAVE_CATEGORY_REQUEST })
    const res = await axiosIntance.post(`/admin/create_category`, udata)

    if (res.status === 200) {
      dispatch({
        type: categoryConstants.SAVE_CATEGORY_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: categoryConstants.SAVE_CATEGORY_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const updateCategory = (udata) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.UPDATE_CATEGORY_REQUEST })
    const res = await axiosIntance.post(`/admin/update_category`, udata)

    if (res.status === 200) {
      dispatch({
        type: categoryConstants.UPDATE_CATEGORY_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: categoryConstants.UPDATE_CATEGORY_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const deleteCategory = (udata) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.DELETE_CATEGORY_REQUEST })
    const res = await axiosIntance.delete(`/admin/delete_category`, { data: udata })

    if (res.status === 200) {
      dispatch({
        type: categoryConstants.DELETE_CATEGORY_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: categoryConstants.DELETE_CATEGORY_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const getCategories = (udata) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_CATEGORIES_REQUEST })
    const res = await axiosIntance.get(`/admin/get_categories`, udata)
    
    if (res.status === 200) {
      dispatch({
        type: categoryConstants.GET_CATEGORIES_SUCCESS,
        payload: res.data.categories,
      })
    } else {
      dispatch({
        type: categoryConstants.GET_CATEGORIES_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const get_singlecategory = (udata) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_SINGLECATEGORY_REQUEST })
    const res = await axiosIntance.post(`/admin/get_singlecategory`, udata)

    if (res.status === 200) {
      dispatch({
        type: categoryConstants.GET_SINGLECATEGORY_SUCCESS,
        payload: res.data.category_data,
      })
    } else {
      if (res.status === 202) {
        dispatch({
          type: categoryConstants.GET_SINGLECATEGORY_FAILURE,
          payload: { message: res.data.message },
        })
      }
    }
  }
}
