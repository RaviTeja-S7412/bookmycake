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
import { deleteCategory, deleteChildCategory, deleteSubCategory, getCategories, getChildCategories, getSubCategories } from '../../../redux/actions/categories.actions'
import { useDispatch, useSelector } from 'react-redux'
import { categoryConstants } from '../../../redux/actions/constants'
import Swal from 'sweetalert2'

const Categories = () => {

    const categories = useSelector(state => state.categories)
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                    text: "Your category has been deleted.",
                    icon: "success"
                });
            }
        });

        
    }

    const handleSubcategorydelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this sub category!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteSubCategory(id));
                dispatch({type: categoryConstants.CATEGORIES_RESET})
                Swal.fire({
                    title: "Deleted!",
                    text: "Your sub category has been deleted.",
                    icon: "success"
                });
            }
        });

        
    }

    const handleChildcategorydelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this child category!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteChildCategory(id));
                dispatch({type: categoryConstants.CATEGORIES_RESET})
                Swal.fire({
                    title: "Deleted!",
                    text: "Your child category has been deleted.",
                    icon: "success"
                });
            }
        });

        
    }

    useEffect(() => {
        if(categories.get_categories){
            dispatch(getCategories());
        }
        if(categories.get_subcategories){
            dispatch(getSubCategories());
        }
        if(categories.get_childcategories){
            dispatch(getChildCategories());
        }
    }, [categories.get_categories, categories.get_subcategories, categories.get_childcategories])

    const update_category = (id) => {
        dispatch({ type: categoryConstants.GET_SINGLECATEGORY_REQUEST })
        navigate('/admin/inventory/update-category?id='+id)
    }

    const update_sub_category = (id) => {
        dispatch({ type: categoryConstants.GET_SINGLESUBCATEGORY_REQUEST })
        navigate('/admin/inventory/update-sub-category?id='+id)
    }
    
    const update_child_category = (id) => {
        dispatch({ type: categoryConstants.GET_SINGLECHILDCATEGORY_REQUEST })
        navigate('/admin/inventory/update-child-category?id='+id)
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

    const subcategory_columns = useMemo(
        () => [
            {
                name: '#',
                selector: (row, key) => `${++key}`,
                sortable: true,
            },
            {
                name: 'Image',
                cell: (row) => (<img src={`${import.meta.env.VITE_APIBASE_URL+row.sub_category_image}`} height={'80px'} width={'120px'}className='p-2 rounded-4' />),
                sortable: true,
            },
            {
                name: 'Category Name',
                selector: (row) => `${row.category_name}`,
                sortable: true,
            },
            {
                name: 'Sub Category Name',
                selector: (row) => `${row.sub_category_name}`,
                sortable: true,
            },
            {
                name: "Action",
                cell: (row) => (
                    <>
                        <CIcon icon={cilPenAlt} height={18} customClassName="nav-icon favicon m-2" style={{cursor: 'pointer'}} onClick={() => update_sub_category(row.id)} />
                        <CIcon icon={cilTrash} height={18} customClassName="nav-icon favicon" style={{cursor: 'pointer'}} onClick={() => handleSubcategorydelete(row.id)} />
                    </>
                ),
            },
        ],
        [],
    )

    const childcategory_columns = useMemo(
        () => [
            {
                name: '#',
                selector: (row, key) => `${++key}`,
                sortable: true,
            },
            {
                name: 'Image',
                cell: (row) => (<img src={`${import.meta.env.VITE_APIBASE_URL+row.child_category_image}`} height={'80px'} width={'120px'}className='p-2 rounded-4' />),
                sortable: true,
            },
            {
                name: 'Category Name',
                selector: (row) => `${row.category_name}`,
                sortable: true,
            },
            {
                name: 'Sub Category Name',
                selector: (row) => `${row.sub_category_name}`,
                sortable: true,
            },
            {
                name: 'Child Category Name',
                selector: (row) => `${row.child_category_name}`,
                sortable: true,
            },
            {
                name: "Action",
                cell: (row) => (
                    <>
                        <CIcon icon={cilPenAlt} height={18} customClassName="nav-icon favicon m-2" style={{cursor: 'pointer'}} onClick={() => update_child_category(row.id)} />
                        <CIcon icon={cilTrash} height={18} customClassName="nav-icon favicon" style={{cursor: 'pointer'}} onClick={() => handleChildcategorydelete(row.id)} />
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
                                    {categories?.categories.length > 0 && <ReactDatatable columns={columns} data={categories?.categories} actions={true} actionTarget={'/admin/inventory/create-category'} />}
                                </CCardBody>
                            </CCard>
                        </CTabPanel>
                        <CTabPanel className="p-3" aria-labelledby="home-tab-pane" itemKey={2}>
                            <CCard className="mb-4">
                                <CCardHeader>
                                    <strong>List Of Sub Categories</strong>
                                </CCardHeader>
                                <CCardBody>
                                    {categories?.sub_categories.length > 0 && <ReactDatatable columns={subcategory_columns} data={categories?.sub_categories} actions={true} actionTarget={'/admin/inventory/create-sub-category'} />}
                                </CCardBody>
                            </CCard>
                        </CTabPanel>
                        <CTabPanel className="p-3" aria-labelledby="home-tab-pane" itemKey={3}>
                            <CCard className="mb-4">
                                <CCardHeader>
                                    <strong>List Of Child Categories</strong>
                                </CCardHeader>
                                <CCardBody>
                                    {categories?.child_categories.length > 0 && <ReactDatatable columns={childcategory_columns} data={categories?.child_categories} actions={true} actionTarget={'/admin/inventory/create-child-category'} />}
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
