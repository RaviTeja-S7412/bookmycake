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
import { getCategories } from '../../../redux/actions/categories.actions'
import { useDispatch, useSelector } from 'react-redux'

const Categories = () => {

    const categories = useSelector(state => state.categories)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    const handleDelete = (id) => {

    }

    useEffect(() => {
        if(categories.get_categories){
            dispatch(getCategories());
        }else{
            setData(categories.categories);
        }
        console.log("data", categories.categories);
    }, [categories.get_categories])

    const columns = useMemo(
        () => [
            {
                name: '#',
                selector: (row, key) => `${++key}`,
                sortable: true,
            },
            {
                name: 'Image',
                cell: (row) => (<img src={`${import.meta.env.VITE_API_URL+row.category_image}`} />),
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

    console.log(data);
    
    
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
                                    {data.length > 0 && <ReactDatatable columns={columns} data={data} actions={true} actionTarget={'/admin/inventory/create-category?ref=category'} />}
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
