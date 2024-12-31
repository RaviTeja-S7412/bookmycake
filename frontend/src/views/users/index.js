import React, { useEffect, useMemo, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPenAlt, cilTrash } from '@coreui/icons'
import ReactDatatable from '../../components/datatables/ReactDatatable'

const Users = () => {

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
                name: "Action",
                cell: (row) => (
                    <>
                        <CIcon icon={cilPenAlt} height={18} customClassName="nav-icon favicon m-2" onClick={() => handleEdit(row.id)} />
                        <CIcon icon={cilTrash} height={18} customClassName="nav-icon favicon" onClick={() => handleDelete(row.id)} />
                    </>
                ),
            },
            {
                name: 'User Name',
                selector: (row) => `${row.employee_id}`,
                sortable: true,
            },
             {
                name: 'Mobile Number',
                selector: (row) => `${row.mobile_number}`,
                sortable: true,
            },
            {
                name: 'Email ID',
                selector: (row) => `${row.email}`,
                sortable: true,
            },
          /*  {
                name: 'Registered Date',
                selector: (row) => `${row.created_date}`,
                sortable: true,
            } */

        ],
        [],
    )

    const data = [
        {
            serial: 1,
            employee_id: 'User 1',
            mobile_number: '123-456-7890',
            email: 'user1@example.com',
        },
        {
            serial: 2,
            employee_id: 'User 2',
            mobile_number: '234-567-8901',
            email: 'user2@example.com',
        },
        {
            serial: 3,
            employee_id: 'User 3',
            mobile_number: '345-678-9012',
            email: 'user3@example.com',
        },
        {
            serial: 4,
            employee_id: 'User 4',
            mobile_number: '456-789-0123',
            email: 'user4@example.com',
        },
        {
            serial: 5,
            employee_id: 'User 5',
            mobile_number: '567-890-1234',
            email: 'user5@example.com',
        },
        {
            serial: 6,
            employee_id: 'User 6',
            mobile_number: '678-901-2345',
            email: 'user6@example.com',
        },
        {
            serial: 7,
            employee_id: 'User 7',
            mobile_number: '789-012-3456',
            email: 'user7@example.com',
        },
        {
            serial: 8,
            employee_id: 'User 8',
            mobile_number: '890-123-4567',
            email: 'user8@example.com',
        },
        {
            serial: 9,
            employee_id: 'User 9',
            mobile_number: '901-234-5678',
            email: 'user9@example.com',
        },
        {
            serial: 10,
            employee_id: 'User 10',
            mobile_number: '012-345-6789',
            email: 'user10@example.com',
        },
        {
            serial: 11,
            employee_id: 'User 11',
            mobile_number: '123-456-7890',
            email: 'user11@example.com',
        },
        {
            serial: 12,
            employee_id: 'User 12',
            mobile_number: '234-567-8901',
            email: 'user12@example.com',
        },
        {
            serial: 13,
            employee_id: 'User 13',
            mobile_number: '345-678-9012',
            email: 'user13@example.com',
        },
        {
            serial: 14,
            employee_id: 'User 14',
            mobile_number: '456-789-0123',
            email: 'user14@example.com',
        },
        {
            serial: 15,
            employee_id: 'User 15',
            mobile_number: '567-890-1234',
            email: 'user15@example.com',
        },
        {
            serial: 16,
            employee_id: 'User 16',
            mobile_number: '678-901-2345',
            email: 'user16@example.com',
        },
        {
            serial: 17,
            employee_id: 'User 17',
            mobile_number: '789-012-3456',
            email: 'user17@example.com',
        },
        {
            serial: 18,
            employee_id: 'User 18',
            mobile_number: '890-123-4567',
            email: 'user18@example.com',
        },
        {
            serial: 19,
            employee_id: 'User 19',
            mobile_number: '901-234-5678',
            email: 'user19@example.com',
        },
        {
            serial: 20,
            employee_id: 'User 20',
            mobile_number: '012-345-6789',
            email: 'user20@example.com',
        },
        {
            serial: 21,
            employee_id: 'User 21',
            mobile_number: '123-456-7890',
            email: 'user21@example.com',
        },
        {
            serial: 22,
            employee_id: 'User 22',
            mobile_number: '234-567-8901',
            email: 'user22@example.com',
        }
    ]
    
    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>List Of Registered Users</strong>
                    </CCardHeader>
                    <CCardBody>
                        <ReactDatatable columns={columns} data={data} />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
    
}

export default Users
