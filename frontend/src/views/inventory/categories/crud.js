import React, { use, useEffect, useState } from 'react'
import {
    CCol,
    CButton,
    CForm,
    CFormInput,
    CRow,
    CCard,
    CCardHeader,
    CCardBody
  } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, get_singlecategory, updateCategory } from '../../../redux/actions/categories.actions';
import { useLocation, useNavigate } from 'react-router-dom';
import { categoryConstants } from '../../../redux/actions/constants';

const CategoryCrud = () => {

    const categories = useSelector(state => state.categories)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [category_name, setCategoryName] = useState('')
    const [category_image, setCategoryImage] = useState('')
    const [category_old_image, setCategoryOldImage] = useState('')

    useEffect(() => {
        dispatch({type: categoryConstants.CATEGORIES_RESET})
    }, [])

    const getSinglecategory = () => {
        const post_data = {
            id: queryParams.get("id"),
        }
        dispatch(get_singlecategory(post_data))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('category_name', category_name)
        formData.append('file', category_image)
        if(queryParams.get("id")){
            formData.append('id', queryParams.get("id"))
            formData.append('old_image', category_old_image)
            dispatch(updateCategory(formData));
        }else{
            dispatch(createCategory(formData));
        }
    }

    const resetValues = () => {
        setCategoryName('')
        setCategoryImage('')
        setCategoryOldImage('')
    }

    useEffect(() => {
        if(categories.is_category_added){
            resetValues();
            dispatch({type: categoryConstants.CATEGORIES_RESET})
            navigate('/admin/inventory/categories')
        }
    }, [categories.is_category_added])

    useEffect(() => {
        if(queryParams.get("id") && categories.get_singlecategory){
            getSinglecategory();
        }else{
            if(Object.keys(categories.category_data).length > 0){
                setCategoryName(categories.category_data ? categories.category_data.category_name : '')
                setCategoryOldImage(categories.category_data ? categories.category_data.category_image : '')
            }
        }
    }, [queryParams.get("id"), categories.get_singlecategory])
    

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Create Category</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm className="row g-3" onSubmit={(e) => handleSubmit(e)}>
                            <CCol md={4}>
                                <CFormInput
                                    type="text"
                                    id="validationDefault01"
                                    label="Category Name"
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    value={category_name}
                                    required
                                />
                            </CCol>
                            <CCol md={4}>
                                <CFormInput
                                    type="file"
                                    id="validationDefault02"
                                    label="Category Image"
                                    onChange={(e) => setCategoryImage(e.target.files[0])}
                                    required={queryParams.get("id") ? false : true}
                                />
                            </CCol>
                            <CCol xs={12}>
                                <CButton color="primary" type="submit">
                                    Submit
                                </CButton>
                            </CCol>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )

}

export default CategoryCrud
