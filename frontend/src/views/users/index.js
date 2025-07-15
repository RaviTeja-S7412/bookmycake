import React, { useEffect, useMemo, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormSwitch,
    CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPenAlt, cilTrash } from '@coreui/icons'
import ReactDatatable from '../../components/datatables/ReactDatatable'
import axiosIntance from '../../components/axios'

const Users = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const get_users_data = async () => {
        setLoading(true);

        try {
            const res = await axiosIntance.get(`/admin/get_users`);
            if (res.status === 200) {
                setData(res?.data?.users);
            } else {
            }
        } catch (error) {
        // console.error('Error fetching product:', error);
        // Handle API error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        get_users_data();
    }, [])

    const handleStatus = async (id, status) => {
        setLoading(true);
        const params = {
            id: id,
            status: status
        }
        try {
            const res = await axiosIntance.post(`/admin/update_userstatus`, params);
            if (res.status === 200) {
                get_users_data();
            } else {
            }
        } catch (error) {
        // console.error('Error fetching product:', error);
        // Handle API error
        } finally {
            setLoading(false);
        }
    }

    const columns = useMemo(
        () => [
            {
                name: '#',
                selector: (row, key) => `${++key}`,
                sortable: true,
            },
            {
                name: 'User Name',
                selector: (row) => `${row.first_name} ${row.last_name}`,
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
            {
                name: 'User Type',
                selector: (row) => { return <span className='capitalize'>{row.user_type}</span>},
                sortable: true,
            },
            {
                name: 'Status',
                selector: (row) => <CFormSwitch
                    size="xl"
                    defaultChecked={row?.status === 'Active' ? true : false}
                    id={"formSwitchCheckDefaultXL" + row.id}
                    onChange={(e) => {
                        const status = e.target.checked ? 'Active' : 'Inactive';
                        handleStatus(row.id, status);
                    }}
                />,
                sortable: true,
            },
            {
                name: 'Registered Date',
                selector: (row) => {
                    const date = new Date(row.registered_date);
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear();
                    return `${day}-${month}-${year}`;
                },
                sortable: true,
            }

        ],
        [],
    )
    
    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>List Of Users</strong>
                    </CCardHeader>
                    <CCardBody>
                        {data?.length > 0 && <ReactDatatable columns={columns} data={data} />}
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
    
}

export default Users
