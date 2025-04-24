import React, { use, useEffect, useState } from 'react'
import {
    CCol,
    CButton,
    CForm,
    CFormInput,
    CRow,
    CCard,
    CCardHeader,
    CCardBody,
    CFormTextarea,
    CFormLabel,
    CFormCheck,
    CFormSelect
  } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { propCategoriesConstants, propConstants } from '../../../redux/actions/constants';
// import ReactQuill from 'react-quill'; // Import the ReactQuill component
// import 'react-quill/dist/quill.snow.css'; // Import Quill's snow theme styles
import { cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { createProp, get_singleprop, updateProp } from '../../../redux/actions/props.actions';
import { getpropCategories } from '../../../redux/actions/propcategories.actions';

const quillToolbar = [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'align': [] }],
    ['link', 'image'],
    ['blockquote', 'code-block'],
    ['clean'],
]

const PropCrud = () => {

    const props = useSelector(state => state.props)
    const propcategories = useSelector(state => state.propcategories)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [category_name, setCategoryName] = useState('')
    const [prop_name, setpropName] = useState('')
    const [price, setprice] = useState('')
    const [stock, setStock] = useState('')
    const [prop_image, setpropImage] = useState('')
    const [prop_old_image, setpropOldImage] = useState('')
    const [propcategoriesList, setCategories] = useState([])
    const [isPopular, setIspopular] = useState(false)
    
    
    useEffect(() => {
        dispatch({type: propConstants.PROPS_RESET})
    }, [])

    const getSingleprop = () => {
        const post_data = {
            id: queryParams.get("id"),
        }
        dispatch(get_singleprop(post_data))
    }

    const resetValues = () => {
        setCategoryName("");
        setpropName("");
        setprice("");
        setpropImage("");
        setpropOldImage("");
        setStock("");
        setIspopular(false);
    }
  

     const handleSubmit = (e) => {
            e.preventDefault();
            const formData = new FormData()
            formData.append('prop_cat_id', category_name)
            formData.append('prop_name', prop_name)
            formData.append('price', price)
            formData.append('stock',stock)
            formData.append('is_popular', isPopular)
            formData.append('file', prop_image)
            if(queryParams.get("id")){
                formData.append('id', queryParams.get("id"))
                formData.append('old_image', prop_old_image)
                dispatch(updateProp(formData));
            }else{
                dispatch(createProp(formData));
            }
        }

    useEffect(() => {
        if(props.is_prop_added){
            if(queryParams.get("id")){
                navigate("/admin/settings/props");
            }
            resetValues();
        }
    }, [props.is_prop_added])

    useEffect(() => {
        if(queryParams.get("id") && props.get_singleprop){
            getSingleprop();
        }else{
            if(Object.keys(props.prop_data).length > 0){
                setCategoryName(props.prop_data ? props.prop_data.prop_cat_id : '')
                setpropName(props.prop_data ? props.prop_data.prop_name : '')
                setprice(props.prop_data ? props.prop_data.price : '')
                setpropOldImage(props.prop_data ? props.prop_data.prop_image : '')
                setIspopular(props.prop_data ? props.prop_data.is_popular : '')
                setStock(props.prop_data ? props.prop_data.stock : '')
            }
        }
    }, [queryParams.get("id"), props.get_singleprop])
    

    useEffect(() => {
        if(propcategories.get_propcategories){
            dispatch(getpropCategories());
        }else{
            setCategories(propcategories.propcategories);
        }
    }, [propcategories.get_propcategories])
    
    
   
    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Create Props</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm className="row g-3" onSubmit={(e) => handleSubmit(e)}>
                            <CCol md={4}>
                                <CFormSelect label="Category Name" className="mb-3" aria-label="Small select example" onChange={(e) => {
                                    setCategoryName(e.target.value);
                                }} required>
                                    <option>Select Category</option>
                                    {propcategoriesList.map((propcategory, index) => (
                                        <option key={index} value={propcategory.id} selected={propcategory.id == category_name ? true : false}>{propcategory.category_name}</option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                           
                            <CCol md={4}>
                                <CFormInput
                                    type="text"
                                    id="validationDefault01"
                                    label="Prop Name"
                                    onChange={(e) => setpropName(e.target.value)}
                                    value={prop_name}
                                    required
                                />
                            </CCol>
                            <CCol md={4}></CCol>
                            <CCol md={4}>
                                <CFormInput
                                    type="file"
                                    id="validationDefault02"
                                    label="Prop Image"
                                    onChange={(e) => setpropImage(e.target.files[0])}
                                    required={queryParams.get("id") ? false : true}
                                />
                            </CCol>
                       
                            <CCol md={4}>
                                <CFormInput
                                    type="number"
                                    name='price'
                                    id="validationDefault01"
                                    label="Price: "
                                    onChange={(e) => setprice(e.target.value)}
                                    value={price}
                                />
                            </CCol>

                            <CCol md={4}>
                                <CFormInput
                                    type="number"
                                    id="validationDefault03"
                                    label="Stock"
                                    onChange={(e) => setStock(e.target.value)}
                                    value={stock}
                                    min={0}
                                    required
                                />
                            </CCol>
                            
                            <CCol md={6}>
                                <CFormCheck
                                    type="checkbox"
                                    id="validationDefault09"
                                    label="Is popular"
                                    onChange={(e) => setIspopular(!isPopular)}
                                    checked={isPopular}
                                    
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

export default PropCrud
