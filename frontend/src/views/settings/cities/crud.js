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
import { createCity, get_singlecity, updateCity } from '../../../redux/actions/cities.actions';
import { useLocation, useNavigate } from 'react-router-dom';
import { cityConstants } from '../../../redux/actions/constants';

const CitiesCrud = () => {

    const cities = useSelector(state => state.cities)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [city_name, setCityName] = useState('')

    useEffect(() => {
        dispatch({type: cityConstants.CITIES_RESET})
    }, [])

    const getSinglecity = () => {
        const post_data = {
            id: queryParams.get("id"),
        }
        dispatch(get_singlecity(post_data))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {'city_name': city_name}
        
        if(queryParams.get("id")){
            formData['id'] = queryParams.get("id");
            dispatch(updateCity(formData));
        }else{
            dispatch(createCity(formData));
        }
    }

    const resetValues = () => {
        setCityName('')
      
    }

    useEffect(() => {
        if(cities.is_city_added){
            resetValues();
            dispatch({type: cityConstants.CITIES_RESET})
            navigate('/admin/settings/cities')
        }
    }, [cities.is_city_added])

    useEffect(() => {
        if(queryParams.get("id") && cities.get_singlecity){
            getSinglecity();
        }else{
            if(Object.keys(cities.city_data).length > 0){
                setCityName(cities.city_data ? cities.city_data.city_name : '')
              
            }
        }
    }, [queryParams.get("id"), cities.get_singlecity])
    

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Create Cities</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm className="row g-3" onSubmit={(e) => handleSubmit(e)}>
                            <CCol md={4}>
                                <CFormInput
                                    type="text"
                                    id="validationDefault01"
                                    label="City Name"
                                    onChange={(e) => setCityName(e.target.value)}
                                    value={city_name}
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

export default CitiesCrud
