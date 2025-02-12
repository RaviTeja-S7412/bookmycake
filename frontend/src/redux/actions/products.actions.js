import axiosIntance from '../../components/axios'
import { productConstants } from './constants'

export const createProduct = (udata) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.SAVE_PRODUCT_REQUEST })
    const res = await axiosIntance.post(`/admin/create_product`, udata)

    if (res.status === 200) {
      dispatch({
        type: productConstants.SAVE_PRODUCT_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: productConstants.SAVE_PRODUCT_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const updateProduct = (udata) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.UPDATE_PRODUCT_REQUEST })
    const res = await axiosIntance.put(`/admin/update_product`, udata)

    if (res.status === 200) {
      dispatch({
        type: productConstants.UPDATE_PRODUCT_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: productConstants.UPDATE_PRODUCT_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const deleteProduct = (id) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.DELETE_PRODUCT_REQUEST })
    const res = await axiosIntance.delete(`/admin/delete_product/${id}`,)

    if (res.status === 200) {
      dispatch({
        type: productConstants.DELETE_PRODUCT_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: productConstants.DELETE_PRODUCT_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const getProducts = (udata) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCTS_REQUEST })
    const res = await axiosIntance.get(`/admin/get_products`, udata)
    
    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_PRODUCTS_SUCCESS,
        payload: res.data.products,
      })
    } else {
      dispatch({
        type: productConstants.GET_PRODUCTS_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const get_singleproduct = (udata) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_SINGLEPRODUCT_REQUEST })
    const res = await axiosIntance.post(`/admin/get_singleproduct`, udata)

    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_SINGLEPRODUCT_SUCCESS,
        payload: res.data.product_data,
      })
    } else {
      if (res.status === 202) {
        dispatch({
          type: productConstants.GET_SINGLEPRODUCT_FAILURE,
          payload: { message: res.data.message },
        })
      }
    }
  }
}

