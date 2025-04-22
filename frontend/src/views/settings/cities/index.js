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
import { deleteCity, getCities } from '../../../redux/actions/cities.actions'
import { useDispatch, useSelector } from 'react-redux'
import { cityConstants } from '../../../redux/actions/constants'
import Swal from 'sweetalert2'

const Cities = () => {

    const cities = useSelector(state => state.cities)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this city!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCity(id));
                dispatch({type: cityConstants.CITIES_RESET})
                Swal.fire({
                    title: "Deleted!",
                    text: "Your city has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    useEffect(() => {
        if(cities.get_cities){
            dispatch(getCities());
        }
  
    }, [cities.get_cities])

    const update_city = (id) => {
        dispatch({ type: cityConstants.GET_SINGLECITY_REQUEST })
        navigate('/admin/settings/update-city?id='+id)
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
                name: "Action",
                cell: (row) => (
                    <>
                        <CIcon icon={cilPenAlt} height={18} customClassName="nav-icon favicon m-2" style={{cursor: 'pointer'}} onClick={() => update_city(row.id)} />
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
                <CTabs activeItemKey={1}>
                    <CTabList variant="underline-border">
                        <CTab aria-controls="home-tab-pane" itemKey={1}>Cities</CTab>
                        <CTab aria-controls="profile-tab-pane" itemKey={2}>Areas</CTab>
                      
                    </CTabList>
                    <CTabContent>
                        <CTabPanel className="p-3" aria-labelledby="home-tab-pane" itemKey={1}>
                            <CCard className="mb-4">
                                <CCardHeader>
                                    <strong>List Of Cities</strong>
                                </CCardHeader>
                                <CCardBody>
                                    {cities?.cities.length > 0 && <ReactDatatable columns={columns} data={cities?.cities} actions={true} actionTarget={'/admin/settings/create-cities'} />}
                                </CCardBody>
                            </CCard>
                        </CTabPanel>
                        <CTabPanel className="p-3" aria-labelledby="home-tab-pane" itemKey={2}>
                            <CCard className="mb-4">
                                <CCardHeader>
                                    <strong>List Of Areas</strong>
                                </CCardHeader>
                                <CCardBody>
                                    {cities?.cities.length > 0 && <ReactDatatable columns={columns} data={cities?.cities} actions={true} actionTarget={'/admin/settings/create-cities'} />}
                                </CCardBody>
                            </CCard>
                        </CTabPanel>
                    </CTabContent>
                </CTabs>
            </CCol>
        </CRow>
    )
    
}

export default Cities
