import axiosIntance from '../../../components/axios'
import { cartConstants } from '../constants'

export const addTocart = (udata) => {
  return async (dispatch) => {
    dispatch({ type: cartConstants.SAVE_CART_REQUEST })
    const res = await axiosIntance.post(`/admin/addcart`, udata)

    if (res.status === 200) {
      dispatch({
        type: cartConstants.SAVE_CART_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: cartConstants.SAVE_CART_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const addTocartProp = (udata) => {
  return async (dispatch) => {
    dispatch({ type: cartConstants.SAVE_PROP_REQUEST })
    const res = await axiosIntance.post(`/admin/addprop`, udata)

    if (res.status === 200) {
      dispatch({
        type: cartConstants.SAVE_PROP_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: cartConstants.SAVE_PROP_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const updateCart = (udata) => {
  return async (dispatch) => {
    dispatch({ type: cartConstants.UPDATE_CART_REQUEST })
    const res = await axiosIntance.post(`/admin/updatecart`, udata);

    if (res.status === 200) {
      dispatch({
        type: cartConstants.UPDATE_CART_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: cartConstants.UPDATE_CART_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const deleteCart = (id) => {
  return async (dispatch) => {
    dispatch({ type: cartConstants.DELETE_CART_REQUEST })
    const res = await axiosIntance.post(`/admin/deletecartitem`,{ id });

    if (res.status === 200) {
      dispatch({
        type: cartConstants.DELETE_CART_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: cartConstants.DELETE_CART_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const getCart = () => {
  return async (dispatch) => {
    dispatch({ type: cartConstants.GET_CART_REQUEST })
    const user_id = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : localStorage.getItem('guest_user_id');
    const res = await axiosIntance.post(`/admin/getcartitems`, { user_id });
    
    if (res.status === 200) {
      dispatch({
        type: cartConstants.GET_CART_SUCCESS,
        payload: res.data.cart_data,
      })
    } else {
      dispatch({
        type: cartConstants.GET_CART_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const getProps = () => {
  return async (dispatch) => {
    dispatch({ type: cartConstants.GET_PROPS_REQUEST })
    const res = await axiosIntance.get(`/admin/getProps`);
    
    if (res.status === 200) {
      dispatch({
        type: cartConstants.GET_PROPS_SUCCESS,
        payload: res.data,
      })
    } else {
      dispatch({
        type: cartConstants.GET_PROPS_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}