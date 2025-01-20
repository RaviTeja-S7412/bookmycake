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
import { deleteCategory, getCategories } from '../../../redux/actions/categories.actions'
import { useDispatch, useSelector } from 'react-redux'
import { categoryConstants } from '../../../redux/actions/constants'
import Swal from 'sweetalert2'

const Categories = () => {

    const categories = useSelector(state => state.categories)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    const handleDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this category!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCategory(id));
                dispatch({type: categoryConstants.CATEGORIES_RESET})
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });

        
    }

    useEffect(() => {
        if(categories.get_categories){
            dispatch(getCategories());
        }else{
            setData(categories.categories);
        }
    }, [categories.get_categories])

    const update_category = (id) => {
        dispatch({ type: categoryConstants.GET_SINGLECATEGORY_REQUEST })
        navigate('/admin/inventory/update-category?id='+id)
    }

    const columns = useMemo(
        () => [
            {
                name: '#',
                selector: (row, key) => `${++key}`,
                sortable: true,
            },
            {
                name: 'Image',
                cell: (row) => (<img src={`${import.meta.env.VITE_APIBASE_URL+row.category_image}`} height={'80px'} width={'120px'}className='p-2 rounded-4' />),
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
                        <CIcon icon={cilPenAlt} height={18} customClassName="nav-icon favicon m-2" style={{cursor: 'pointer'}} onClick={() => update_category(row.id)} />
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
                                    {data.length > 0 && <ReactDatatable columns={columns} data={data} actions={true} actionTarget={'/admin/inventory/create-category'} />}
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
