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
import { createChildCategory, getCategories, updateChildCategory, get_singlechildcategory, getSubCategoriesbycategoryID } from '../../../redux/actions/categories.actions';
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
    const [childcategory_name, setChildCategoryName] = useState('')
    const [category_image, setCategoryImage] = useState('')
    const [categoriesList, setCategories] = useState([])
    const [subcategoriesList, setSubCategories] = useState([])
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
    
    useEffect(() => {
        if(categories.get_sub_categories_categoryid){
        }else{
            setSubCategories(categories.subcategoriesbyid_data);
        }
    }, [categories.get_sub_categories_categoryid])

    const getSinglechildcategory = () => {
        const post_data = {
            id: queryParams.get("id"),
        }
        dispatch(get_singlechildcategory(post_data))
    }

    const getSubcategories = (categoryid) => {
        const post_data = {
            categoryid: categoryid,
        }
        dispatch(getSubCategoriesbycategoryID(post_data))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('category_id', category_name)
        formData.append('sub_category_id', subcategory_name)
        formData.append('child_category_name', childcategory_name)
        formData.append('file', category_image)
        if(queryParams.get("id")){
            formData.append('id', queryParams.get("id"))
            formData.append('old_image', category_old_image)
            dispatch(updateChildCategory(formData));
        }else{
            dispatch(createChildCategory(formData));
        }
    }

    const resetValues = () => {
        setCategoryName('')
        setSubCategoryName('')
        setChildCategoryName('')
        setCategoryImage('')
        setCategoryOldImage('')
    }

    useEffect(() => {
        if(categories.is_childcategory_added){
            resetValues();
            dispatch({type: categoryConstants.CATEGORIES_RESET})
            navigate('/admin/inventory/categories')
        }
    }, [categories.is_childcategory_added])

    useEffect(() => {
        if(queryParams.get("id") && categories.get_singlechildcategory){
            getSinglechildcategory();
        }else{
            if(Object.keys(categories.childcategory_data).length > 0){
                getSubcategories(categories.childcategory_data ? categories.childcategory_data.category_id : '')
                setCategoryName(categories.childcategory_data ? categories.childcategory_data.category_id : '')
                setSubCategoryName(categories.childcategory_data ? categories.childcategory_data.sub_category_id : '')
                setChildCategoryName(categories.childcategory_data ? categories.childcategory_data.child_category_name : '')
                setCategoryOldImage(categories.childcategory_data ? categories.childcategory_data.child_category_image : '')
            }
        }
    }, [queryParams.get("id"), categories.get_singlechildcategory])
    

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
                                <CFormSelect label="Category Name" className="mb-3" aria-label="Small select example" onChange={(e) => {
                                    setCategoryName(e.target.value);
                                    getSubcategories(e.target.value);
                                }} required>
                                    <option>Select Category</option>
                                    {categoriesList.map((category, index) => (
                                        <option key={index} value={category.id} selected={category.id == category_name ? true : false}>{category.category_name}</option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                            <CCol md={4}>
                                <CFormSelect label="Sub Category Name" className="mb-3" aria-label="Small select example" onChange={(e) => setSubCategoryName(e.target.value)} defaultValue={subcategory_name} required>
                                    <option>Select Sub Category</option>
                                    {subcategoriesList.map((scategory, index1) => (
                                        <option key={index1} value={scategory.id} selected={scategory.id == subcategory_name ? true : false}>{scategory.sub_category_name}</option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                            <CCol md={4}>
                                <CFormInput
                                    type="text"
                                    id="validationDefault01"
                                    label="Child Category Name"
                                    onChange={(e) => setChildCategoryName(e.target.value)}
                                    value={childcategory_name}
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

export default ChildCategoryCrud
