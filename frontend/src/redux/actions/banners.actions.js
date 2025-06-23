import axiosIntance from '../../components/axios'
import { bannerConstants } from './constants'

export const createBanner = (udata) => {
  return async (dispatch) => {
    dispatch({ type: bannerConstants.SAVE_BANNER_REQUEST })
    const res = await axiosIntance.post(`/admin/create_banner`, udata)

    if (res.status === 200) {
      dispatch({
        type: bannerConstants.SAVE_BANNER_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: bannerConstants.SAVE_BANNER_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const updateBanner = (udata) => {
  return async (dispatch) => {
    dispatch({ type: bannerConstants.UPDATE_BANNER_REQUEST })
    const res = await axiosIntance.put(`/admin/update_banner`, udata)

    if (res.status === 200) {
      dispatch({
        type: bannerConstants.UPDATE_BANNER_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: bannerConstants.UPDATE_BANNER_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const deleteBanner = (id) => {
  return async (dispatch) => {
    dispatch({ type: bannerConstants.DELETE_BANNER_REQUEST })
    const res = await axiosIntance.delete(`/admin/delete_banner/${id}`,)

    if (res.status === 200) {
      dispatch({
        type: bannerConstants.DELETE_BANNER_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: bannerConstants.DELETE_BANNER_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const getBanners = () => {
  return async (dispatch) => {
    dispatch({ type: bannerConstants.GET_BANNERS_REQUEST })
    const res = await axiosIntance.get(`/admin/get_banners`)
    
    if (res.status === 200) {
      dispatch({
        type: bannerConstants.GET_BANNERS_SUCCESS,
        payload: res.data.banners,
      })
    } else {
      dispatch({
        type: bannerConstants.GET_BANNERS_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}



export const get_singlebanner = (udata) => {
  return async (dispatch) => {
    dispatch({ type: bannerConstants.GET_SINGLEBANNER_REQUEST })
    const res = await axiosIntance.post(`/admin/get_singlebanner`, udata)

    if (res.status === 200) {
      dispatch({
        type: bannerConstants.GET_SINGLEBANNER_SUCCESS,
        payload: res.data.banner_data,
      })
    } else {
      if (res.status === 202) {
        dispatch({
          type: bannerConstants.GET_SINGLEBANNER_FAILURE,
          payload: { message: res.data.message },
        })
      }
    }
  }
}


