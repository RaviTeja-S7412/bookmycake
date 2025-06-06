import React, { useEffect, useState } from 'react'
import {
    CCol,
    CRow,
    CCard,
    CCardHeader,
    CCardBody
  } from '@coreui/react'
import { useLocation, useNavigate } from 'react-router-dom';

const Orderdetails = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
      
    const getSingleproduct = () => {
        const post_data = {
            id: queryParams.get("id"),
        }
        dispatch(get_singleproduct(post_data))
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>View Order Details</strong>
                    </CCardHeader>
                    <CCardBody>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
export default Orderdetails
