import React, { useEffect, useState } from 'react'
import {
    CCol,
    CButton,
    CForm,
    CFormCheck,
    CFormInput,
    CFormLabel,
    CInputGroup,
    CInputGroupText,
    CFormSelect,
    CRow,
    CCard,
    CCardHeader,
    CCardBody
  } from '@coreui/react'

const CategoryCrud = () => {

    const fetchUsers = () => {
        const post_data = {
            page: page1,
            perPage: size,
            search: search,
            role: login_user && login_user.role,
            team_leads: team_leads_data,
            team_lead_id: login_user && login_user._id,
        }
        dispatch(getEmployees(post_data))
        setLoading(false)
    }

    const handleSubmit = () => {

    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Create Category</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm className="row g-3" onSubmit={() => handleSubmit()}>
                            <CCol md={4}>
                                <CFormInput
                                    type="text"
                                    id="validationDefault01"
                                    label="Category Name"
                                    required
                                />
                            </CCol>
                            <CCol md={4}>
                                <CFormInput
                                    type="file"
                                    id="validationDefault02"
                                    label="Category Image"
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

export default CategoryCrud
