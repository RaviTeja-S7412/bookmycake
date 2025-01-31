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
import { createSubCategory, get_singlesubcategory, getCategories, updateSubCategory } from '../../../redux/actions/categories.actions';
import { useLocation, useNavigate } from 'react-router-dom';
import { categoryConstants } from '../../../redux/actions/constants';
import { CFormSelect } from '@coreui/react'

const ChildCategoryCrud = () => {

    const categories = useSelector(state => state.categories)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [category_name, setCategoryName] = useState('')
    const [subcategory_name, setSubCategoryName] = useState('')
    const [category_image, setCategoryImage] = useState('')
    const [show_category, setShowCategory] = useState('')
    const [categoriesList, setCategories] = useState([])
    const [category_old_image, setCategoryOldImage] = useState('')

    useEffect(() => {
        dispatch({type: categoryConstants.CATEGORIES_RESET})
    }, [])

    useEffect(() => {
        if(categories.get_categories){
            dispatch(getCategories());
        }else{
            setCategories(categories.categories);
        }
    }, [categories.get_categories])

    const getSinglesubcategory = () => {
        const post_data = {
            id: queryParams.get("id"),
        }
        dispatch(get_singlesubcategory(post_data))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('category_id', category_name)
        formData.append('sub_category_name', subcategory_name)
        formData.append('file', category_image)
        formData.append('isCategoryshow', show_category)
        if(queryParams.get("id")){
            formData.append('id', queryParams.get("id"))
            formData.append('old_image', category_old_image)
            dispatch(updateSubCategory(formData));
        }else{
            dispatch(createSubCategory(formData));
        }
    }

    const resetValues = () => {
        setCategoryName('')
        setSubCategoryName('')
        setCategoryImage('')
        setShowCategory('')
        setCategoryOldImage('')
    }

    useEffect(() => {
        if(categories.is_subcategory_added){
            resetValues();
            dispatch({type: categoryConstants.CATEGORIES_RESET})
            navigate('/admin/inventory/categories')
        }
    }, [categories.is_subcategory_added])

    useEffect(() => {
        if(queryParams.get("id") && categories.get_singlesubcategory){
            getSinglesubcategory();
        }else{
            if(Object.keys(categories.subcategory_data).length > 0){
                setCategoryName(categories.subcategory_data ? categories.subcategory_data.category_id : '')
                setSubCategoryName(categories.subcategory_data ? categories.subcategory_data.sub_category_name : '')
                setShowCategory(categories.subcategory_data ? categories.subcategory_data.isCategoryshow : '')
                setCategoryOldImage(categories.subcategory_data ? categories.subcategory_data.sub_category_image : '')
            }
        }
    }, [queryParams.get("id"), categories.get_singlesubcategory])
    

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Create Sub Category</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm className="row g-3" onSubmit={(e) => handleSubmit(e)}>
                            <CCol md={4}>
                                <CFormSelect label="Category Name" className="mb-3" aria-label="Small select example" onChange={(e) => setCategoryName(e.target.value)} required>
                                    <option>Select Category</option>
                                    {categoriesList.map((category, index) => (
                                        <option key={index} value={category.id} selected={category.id == category_name ? true : false}>{category.category_name}</option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                            <CCol md={4}>
                                <CFormInput
                                    type="text"
                                    id="validationDefault01"
                                    label="Sub Category Name"
                                    onChange={(e) => setSubCategoryName(e.target.value)}
                                    value={subcategory_name}
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
                            <CCol md={4}>
                                <CFormSelect label="Show Category" className="mb-3" aria-label="Small select example" onChange={(e) => setShowCategory(e.target.value)} required>
                                    <option key={1} value={0} selected={0 == show_category ? true : false}>{'No'}</option>
                                    <option key={1} value={1} selected={1 == show_category ? true : false}>{'Yes'}</option>
                                </CFormSelect>
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

export default ChildCategoryCrud
