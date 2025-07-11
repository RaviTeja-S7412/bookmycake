import React, { useEffect, useMemo, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CFormSwitch,
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
import { deletePincode, getPincodes } from '../../../redux/actions/pincodes.actions'
import { useDispatch, useSelector } from 'react-redux'
import { pincodeConstants } from '../../../redux/actions/constants'
import Swal from 'sweetalert2'
import axiosIntance from '../../../components/axios'

const Pincodes = () => {

    const pincodes = useSelector(state => state.pincodes)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this pincode!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deletePincode(id));
                dispatch({type: pincodeConstants.PINCODES_RESET})
                Swal.fire({
                    title: "Deleted!",
                    text: "Your pincode has been deleted.",
                    icon: "success"
                });
            }
        });
    }

     const handleStatus = async (id, status) => {
        setLoading(true);
        const params = {
            id: id,
            status: status
        }
        try {
            const res = await axiosIntance.post(`/admin/update_pincodestatus`, params);
            if (res.status === 200) {
                dispatch({ type: pincodeConstants.GET_PINCODES_REQUEST });
            } else {
            }
        } catch (error) {
        // console.error('Error fetching product:', error);
        // Handle API error
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(pincodes.get_pincodes){
            dispatch(getPincodes());
        }
  
    }, [pincodes.get_pincodes])

    const update_pincode = (id) => {
        dispatch({ type: pincodeConstants.GET_SINGLEPINCODE_REQUEST })
        navigate('/admin/settings/update-pincode?id='+id)
    }
 

    const columns = useMemo(
        () => [
            {
                name: '#',
                selector: (row, key) => `${++key}`,
                sortable: true,
            },
         
            {
                name: 'Zip Code',
                selector: (row) => `${row.zip_code}`,
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
                        <CIcon icon={cilPenAlt} height={18} customClassName="nav-icon favicon m-2" style={{cursor: 'pointer'}} onClick={() => update_pincode(row.id)} />
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
                        <strong>List Of Pincodes</strong>
                    </CCardHeader>
                    <CCardBody>
                        {pincodes?.pincodes.length > 0 && <ReactDatatable columns={columns} data={pincodes?.pincodes} actions={true} actionTarget={'/admin/settings/create-pincodes'} />}
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
    
}

export default Pincodes
