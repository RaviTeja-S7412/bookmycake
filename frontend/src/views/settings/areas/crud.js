import React, { use, useEffect, useState } from 'react'
import {
    CCol,
    CButton,
    CForm,
    CFormSelect, 
    CFormInput,
    CRow,
    CCard,
    CCardHeader,
    CCardBody
  } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import { getCities } from '../../../redux/actions/cities.actions';
import { createArea, get_singlearea, updateArea } from '../../../redux/actions/areas.actions';
import { useLocation, useNavigate } from 'react-router-dom';
import { areaConstants } from '../../../redux/actions/constants';

const AreasCrud = () => {
    
    const cities = useSelector(state => state.cities)
    const areas = useSelector(state => state.areas)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [city_name, setCityName] = useState('')
    const [area_name, setAreaName] = useState('')
    const [pincode, setPinCode] = useState('')
    const [citiesList, setCities] = useState([])

    useEffect(() => {
        dispatch({type: areaConstants.AREAS_RESET})
    }, [])

    const getSinglearea = () => {
        const post_data = {
            id: queryParams.get("id"),
        }
        dispatch(get_singlearea(post_data))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {'city_id': city_name, 'area_name': area_name, 'pincode': pincode};

        if(queryParams.get("id")){
            formData['id'] = queryParams.get("id");
            dispatch(updateArea(formData));
        }else{
            dispatch(createArea(formData));
        }
    }

    const resetValues = () => {
        setCityName("");
        setAreaName('')
      
    }

    useEffect(() => {
        if(areas.is_area_added){
            resetValues();
            dispatch({type: areaConstants.AREAS_RESET})
            navigate('/admin/settings/areas')
        }
    }, [areas.is_area_added])

    useEffect(() => {
        if(queryParams.get("id") && areas.get_singlearea){
            getSinglearea();
        }else{
            if(Object.keys(areas.area_data).length > 0){
                setCityName(areas.area_data ? areas.area_data.city_id : '')
                setAreaName(areas.area_data ? areas.area_data.area_name : '')
                setPinCode(areas.area_data ? areas.area_data.pincode : '')
            }
        }
    }, [queryParams.get("id"), areas.get_singlearea])

        useEffect(() => {
               if(cities.get_cities){
                   dispatch(getCities());
               }else{
                   setCities(cities.cities);
               }
           }, [cities.get_cities])

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Create Areas</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm className="row g-3" onSubmit={(e) => handleSubmit(e)}>
                             <CCol md={4}>
                                <CFormSelect label="City Name" className="mb-3" aria-label="Small select example" onChange={(e) => {
                                    setCityName(e.target.value);
                                }} required>
                                    <option>Select City</option>
                                    {citiesList.map((city, index) => (
                                        <option key={index} value={city.id} selected={city.id == city_name ? true : false}>{city.city_name}</option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                            <CCol md={4}>
                                <CFormInput
                                    type="text"
                                    id="validationDefault01"
                                    label="Area Name"
                                    onChange={(e) => setAreaName(e.target.value)}
                                    value={area_name}
                                    required
                                />
                            </CCol>

                            <CCol md={4}>
                                <CFormInput
                                    type="text"
                                    id="validationDefault01"
                                    label="Pin Code"
                                    onChange={(e) => setPinCode(e.target.value)}
                                    value={pincode}
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

export default AreasCrud
