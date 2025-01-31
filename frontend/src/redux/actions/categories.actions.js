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
    const res = await axiosIntance.put(`/admin/update_category`, udata)

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

export const deleteCategory = (id) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.DELETE_CATEGORY_REQUEST })
    const res = await axiosIntance.delete(`/admin/delete_category/${id}`,)

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

export const getSubCategoriesbycategoryID = (udata) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_SUBCATEGORIESBYCATEGORYID_REQUEST })
    const res = await axiosIntance.post(`/admin/get_subcateriesbycategoryid`, udata)
    
    if (res.status === 200) {
      dispatch({
        type: categoryConstants.GET_SUBCATEGORIESBYCATEGORYID_SUCCESS,
        payload: res.data.sub_categories,
      })
    } else {
      dispatch({
        type: categoryConstants.GET_SUBCATEGORIESBYCATEGORYID_FAILURE,
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

// sub categories

export const createSubCategory = (udata) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.SAVE_SUBCATEGORY_REQUEST })
    const res = await axiosIntance.post(`/admin/create_sub_category`, udata)

    if (res.status === 200) {
      dispatch({
        type: categoryConstants.SAVE_SUBCATEGORY_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: categoryConstants.SAVE_SUBCATEGORY_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const updateSubCategory = (udata) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.UPDATE_SUBCATEGORY_REQUEST })
    const res = await axiosIntance.put(`/admin/update_sub_category`, udata)

    if (res.status === 200) {
      dispatch({
        type: categoryConstants.UPDATE_SUBCATEGORY_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: categoryConstants.UPDATE_SUBCATEGORY_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}


export const deleteSubCategory = (id) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.DELETE_SUBCATEGORY_REQUEST })
    const res = await axiosIntance.delete(`/admin/delete_sub_category/${id}`,)

    if (res.status === 200) {
      dispatch({
        type: categoryConstants.DELETE_SUBCATEGORY_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: categoryConstants.DELETE_SUBCATEGORY_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const getSubCategories = (udata) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_SUBCATEGORIES_REQUEST })
    const res = await axiosIntance.get(`/admin/get_sub_categories`, udata)
    
    if (res.status === 200) {
      dispatch({
        type: categoryConstants.GET_SUBCATEGORIES_SUCCESS,
        payload: res.data.sub_categories,
      })
    } else {
      dispatch({
        type: categoryConstants.GET_SUBCATEGORIES_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const get_singlesubcategory = (udata) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_SINGLESUBCATEGORY_REQUEST })
    const res = await axiosIntance.post(`/admin/get_singlesubcategory`, udata)

    if (res.status === 200) {
      dispatch({
        type: categoryConstants.GET_SINGLESUBCATEGORY_SUCCESS,
        payload: res.data.subcategory_data,
      })
    } else {
      if (res.status === 202) {
        dispatch({
          type: categoryConstants.GET_SINGLESUBCATEGORY_FAILURE,
          payload: { message: res.data.message },
        })
      }
    }
  }
}

// child categories

export const createChildCategory = (udata) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.SAVE_CHILDCATEGORY_REQUEST })
    const res = await axiosIntance.post(`/admin/create_child_category`, udata)

    if (res.status === 200) {
      dispatch({
        type: categoryConstants.SAVE_CHILDCATEGORY_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: categoryConstants.SAVE_CHILDCATEGORY_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const updateChildCategory = (udata) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.UPDATE_CHILDCATEGORY_REQUEST })
    const res = await axiosIntance.put(`/admin/update_child_category`, udata)

    if (res.status === 200) {
      dispatch({
        type: categoryConstants.UPDATE_CHILDCATEGORY_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: categoryConstants.UPDATE_CHILDCATEGORY_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}


export const deleteChildCategory = (id) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.DELETE_CHILDCATEGORY_REQUEST })
    const res = await axiosIntance.delete(`/admin/delete_child_category/${id}`,)

    if (res.status === 200) {
      dispatch({
        type: categoryConstants.DELETE_CHILDCATEGORY_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: categoryConstants.DELETE_CHILDCATEGORY_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const getChildCategories = (udata) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_CHILDCATEGORIES_REQUEST })
    const res = await axiosIntance.get(`/admin/get_child_categories`, udata)
    
    if (res.status === 200) {
      dispatch({
        type: categoryConstants.GET_CHILDCATEGORIES_SUCCESS,
        payload: res.data.child_categories,
      })
    } else {
      dispatch({
        type: categoryConstants.GET_CHILDCATEGORIES_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const get_singlechildcategory = (udata) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_SINGLECHILDCATEGORY_REQUEST })
    const res = await axiosIntance.post(`/admin/get_singlechildcategory`, udata)

    if (res.status === 200) {
      dispatch({
        type: categoryConstants.GET_SINGLECHILDCATEGORY_SUCCESS,
        payload: res.data.childcategory_data,
      })
    } else {
      if (res.status === 202) {
        dispatch({
          type: categoryConstants.GET_SINGLECHILDCATEGORY_FAILURE,
          payload: { message: res.data.message },
        })
      }
    }
  }
}