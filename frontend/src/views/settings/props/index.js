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
import ReactDatatable from '../../../components/datatables/ReactDatatable'
import { useDispatch, useSelector } from 'react-redux'
import { getProps, deleteProp } from '../../../redux/actions/props.actions'
import { useNavigate } from 'react-router-dom'
import { propConstants } from '../../../redux/actions/constants'
import Swal from 'sweetalert2'
import axiosIntance from '../../../components/axios'

const Props = () => {

    const [loading, setLoading] = useState(false);
    const props = useSelector(state => state.props)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDelete = (id) => {

        Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this Prop!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        dispatch(deleteProp(id));
                        dispatch({type: propConstants.PROPS_RESET})
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your prop has been deleted.",
                            icon: "success"
                        });
                    }
                });
    }

    useEffect(() => {
        if(props.get_props){
            dispatch(getProps());
        }
    }, [props.get_props])

     const update_prop = (id) => {
        dispatch({ type: propConstants.GET_SINGLEPROP_REQUEST })
        navigate('/admin/settings/update-prop?id='+id)
    }

    const handleStatus = async (id, status) => {
        setLoading(true);
        const params = {
            id: id,
            status: status
        }
        try {
            const res = await axiosIntance.post(`/admin/update_propstatus`, params);
            if (res.status === 200) {
                dispatch({ type: propConstants.GET_PROPS_REQUEST });
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
                name: 'Prop Name',
                selector: (row) => `${row.prop_name}`,
                sortable: true,
            },
            {
                name: 'Prop Image',
                cell: (row) => (<img src={`${import.meta.env.VITE_APIBASE_URL+row.prop_image}`} height={'80px'} width={'120px'}className='p-2 rounded-4' />),
                sortable: true,
            },
            {
                name: 'Price',
                selector: (row) => `₹ ${row.price}`,
                sortable: true,
            },
            {
                name: 'Status',
                selector: (row) => <CFormSwitch
                    size="xl"
                    defaultChecked={row?.status === 1 ? true : false}
                    id={"formSwitchCheckDefaultXL" + row.id}
                    onChange={(e) => {
                        const status = e.target.checked ? 1 : 0;
                        handleStatus(row.id, status);
                    }}
                />,
                sortable: true,
            },
            {
                name: "Action",
                cell: (row) => (
                    <>
                        <CIcon icon={cilPenAlt} height={18} customClassName="nav-icon favicon m-2" style={{cursor: 'pointer'}} onClick={() => update_prop(row.id)} />
                        <CIcon icon={cilTrash} height={18} customClassName="nav-icon favicon" style={{cursor: 'pointer'}} onClick={() => handleDelete(row.id)} />
                    </>
                ),
            },
        ],
        [],
    )
    

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>List Of Props</strong>
                        <div className="card-header-actions float-right">
                            <button className='btn-sm btn btn-primary' onClick={() => navigate('/admin/settings/create-props')}>Create Prop</button>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                    {props?.props.length > 0 && <ReactDatatable columns={columns} data={props?.props} actions={false} />}
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
    
}

export default Props
