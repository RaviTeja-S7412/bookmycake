import React, { useEffect, useMemo, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTab,
    CTabContent,
    CTabList,
    CTabPanel,
    CTabs
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPenAlt, cilTrash } from '@coreui/icons'
import ReactDatatable from '../../../components/datatables/ReactDatatable'
import { useNavigate } from 'react-router-dom'

const Categories = () => {

    const navigate = useNavigate();

    const handleDelete = (id) => {

    }

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

    const columns = useMemo(
        () => [
            {
                name: '#',
                selector: (row) => `${row.serial}`,
                sortable: true,
            },
            {
                name: 'Image',
                selector: (row) => `${row.category_image}`,
                sortable: true,
            },
            {
                name: 'Category Name',
                selector: (row) => `${row.category_name}`,
                sortable: true,
            },
            {
                name: "Action",
                cell: (row) => (
                    <>
                        <CIcon icon={cilPenAlt} height={18} customClassName="nav-icon favicon m-2" onClick={() => navigate('/admin/inventory/create-category?ref=category&id='+row.id)} />
                        <CIcon icon={cilTrash} height={18} customClassName="nav-icon favicon" onClick={() => handleDelete(row.id)} />
                    </>
                ),
            },
        ],
        [],
    )

    const data = [
        {
            serial: 1,
            category_name: 'Category 1',
            category_image: 'Image 1',
        },
        {
            serial: 2,
            category_name: 'Category 2',
            category_image: 'Image 2',
        },
        {
            serial: 3,
            category_name: 'Category 3',
            category_image: 'Image 3',
        },
        {
            serial: 4,
            category_name: 'Category 4',
            category_image: 'Image 4',
        },
        {
            serial: 5,
            category_name: 'Category 5',
            category_image: 'Image 5',
        }
    ]
    
    return (
        <CRow>
            <CCol xs={12}>

                <CTabs activeItemKey={1}>
                    <CTabList variant="underline-border">
                        <CTab aria-controls="home-tab-pane" itemKey={1}>Categories</CTab>
                        <CTab aria-controls="profile-tab-pane" itemKey={2}>Sub Categories</CTab>
                        <CTab aria-controls="contact-tab-pane" itemKey={3}>Child Categories</CTab>
                    </CTabList>
                    <CTabContent>
                        <CTabPanel className="p-3" aria-labelledby="home-tab-pane" itemKey={1}>
                            <CCard className="mb-4">
                                <CCardHeader>
                                    <strong>List Of Categories</strong>
                                </CCardHeader>
                                <CCardBody>
                                    <ReactDatatable columns={columns} data={data} actions={true} actionTarget={'/admin/inventory/create-category?ref=category'} />
                                </CCardBody>
                            </CCard>
                        </CTabPanel>

                    </CTabContent>
                </CTabs>
            </CCol>
        </CRow>
    )
    
}

export default Categories
