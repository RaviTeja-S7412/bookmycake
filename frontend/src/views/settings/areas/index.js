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
import { deleteArea, getAreas } from '../../../redux/actions/areas.actions'
import { useDispatch, useSelector } from 'react-redux'
import { areaConstants } from '../../../redux/actions/constants'
import Swal from 'sweetalert2'
import axiosIntance from '../../../components/axios'

const Areas = () => {

    const areas = useSelector(state => state.areas)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this area!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteArea(id));
                dispatch({type: areaConstants.AREAS_RESET})
                Swal.fire({
                    title: "Deleted!",
                    text: "Your area has been deleted.",
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
                const res = await axiosIntance.post(`/admin/update_areastatus`, params);
                if (res.status === 200) {
                    dispatch({ type: areaConstants.GET_AREAS_REQUEST });
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
        if(areas.get_areas){
            dispatch(getAreas());
        }
  
    }, [areas.get_areas])

    const update_area = (id) => {
        dispatch({ type: areaConstants.GET_SINGLEAREA_REQUEST })
        navigate('/admin/settings/update-area?id='+id)
    }

 

    const columns = useMemo(
        () => [
            {
                name: '#',
                selector: (row, key) => `${++key}`,
                sortable: true,
            },
            {
                name: 'City Name',
                selector: (row) => `${row.city_name}`,
                sortable: true,
            },
         
            {
                name: 'Area Name',
                selector: (row) => `${row.area_name}`,
                sortable: true,
            },

            {
                name: 'Pin Code',
                selector: (row) => `${row.pincode}`,
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
                        <CIcon icon={cilPenAlt} height={18} customClassName="nav-icon favicon m-2" style={{cursor: 'pointer'}} onClick={() => update_area(row.id)} />
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
                        <strong>List Of Areas</strong>
                    </CCardHeader>
                    <CCardBody>
                        {areas?.areas.length > 0 && <ReactDatatable columns={columns} data={areas?.areas} actions={true} actionTarget={'/admin/settings/create-areas'} />}
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
    
}

export default Areas
