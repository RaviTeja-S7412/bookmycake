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
import { createPincode, get_singlepincode, updatePincode } from '../../../redux/actions/pincodes.actions';
import { useLocation, useNavigate } from 'react-router-dom';
import { pincodeConstants } from '../../../redux/actions/constants';

const PincodesCrud = () => {

    const pincodes = useSelector(state => state.pincodes)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [zip_code, setZipCode] = useState('')

    useEffect(() => {
        dispatch({type: pincodeConstants.PINCODES_RESET})
    }, [])

    const getSinglepincode = () => {
        const post_data = {
            id: queryParams.get("id"),
        }
        dispatch(get_singlepincode(post_data))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {'zip_code': zip_code}
        
        if(queryParams.get("id")){
            formData['id'] = queryParams.get("id");
            dispatch(updatePincode(formData));
        }else{
            dispatch(createPincode(formData));
        }
    }

    const resetValues = () => {
        setZipCode('')
      
    }

    useEffect(() => {
        if(pincodes.is_pincode_added){
            resetValues();
            dispatch({type: pincodeConstants.PINCODES_RESET})
            navigate('/admin/settings/pincodes')
        }
    }, [pincodes.is_pincode_added])

    useEffect(() => {
        if(queryParams.get("id") && pincodes.get_singlepincode){
            getSinglepincode();
        }else{
            if(Object.keys(pincodes.pincode_data).length > 0){
                setZipCode(pincodes.pincode_data ? pincodes.pincode_data.zip_code : '')
              
            }
        }
    }, [queryParams.get("id"), pincodes.get_singlepincode])
    

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Create Pinocde</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm className="row g-3" onSubmit={(e) => handleSubmit(e)}>
                            <CCol md={4}>
                                <CFormInput
                                    type="text"
                                    id="validationDefault01"
                                    label="Zip Code"
                                    onChange={(e) => setZipCode(e.target.value)}
                                    value={zip_code}
                                    required
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

export default PincodesCrud
