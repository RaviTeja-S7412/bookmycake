import React, { useEffect, useMemo, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormSwitch,
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
import axiosIntance from '../../../components/axios'

const Categories = () => {

    const categories = useSelector(state => state.categories)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

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

    const handleStatus = async (id, status) => {
        setLoading(true);
        const params = {
            id: id,
            status: status
        }
        try {
            const res = await axiosIntance.post(`/admin/update_categorystatus`, params);
            if (res.status === 200) {
                dispatch({ type: categoryConstants.GET_CATEGORIES_REQUEST });
            } else {
            }
        } catch (error) {
        // console.error('Error fetching product:', error);
        // Handle API error
        } finally {
            setLoading(false);
        }
    }

    const handleSubStatus = async (id, status) => {
        setLoading(true);
        const params = {
            id: id,
            status: status
        }
        try {
            const res = await axiosIntance.post(`/admin/update_subcategorystatus`, params);
            if (res.status === 200) {
                dispatch({ type: categoryConstants.GET_SUBCATEGORIES_REQUEST });
            } else {
            }
        } catch (error) {
        // console.error('Error fetching product:', error);
        // Handle API error
        } finally {
            setLoading(false);
        }
    }

    const handleChildStatus = async (id, status) => {
        setLoading(true);
        const params = {
            id: id,
            status: status
        }
        try {
            const res = await axiosIntance.post(`/admin/update_childcategorystatus`, params);
            if (res.status === 200) {
                dispatch({ type: categoryConstants.GET_CHILDCATEGORIES_REQUEST });
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
                name: 'Category Description',
                selector: (row) => `${row.category_desc}`,
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
                name: 'Status',
                selector: (row) => <CFormSwitch
                    size="xl"
                    defaultChecked={row?.status === 1 ? true : false}
                    id={"formSwitchCheckDefaultXL" + row.id}
                    onChange={(e) => {
                        const status = e.target.checked ? 1 : 0;
                        handleSubStatus(row.id, status);
                    }}
                />,
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
                name: 'Status',
                selector: (row) => <CFormSwitch
                    size="xl"
                    defaultChecked={row?.status === 1 ? true : false}
                    id={"formSwitchCheckDefaultXL" + row.id}
                    onChange={(e) => {
                        const status = e.target.checked ? 1 : 0;
                        handleChildStatus(row.id, status);
                    }}
                />,
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
                        {/* <CTab aria-controls="contact-tab-pane" itemKey={3}>Child Categories</CTab> */}
                    </CTabList>
                    <CTabContent>
                        <CTabPanel className="p-3" aria-labelledby="home-tab-pane" itemKey={1}>
                            <CCard className="mb-4">
                                <CCardHeader>
                                    <strong>List Of Categories</strong>
                                    <div className="card-header-actions float-right">
                                        <button className='btn-sm btn btn-primary' onClick={() => navigate('/admin/inventory/create-category')}>Create Category</button>
                                    </div>
                                </CCardHeader>
                                <CCardBody>
                                    {categories?.categories.length > 0 && <ReactDatatable columns={columns} data={categories?.categories} actions={false} />}
                                </CCardBody>
                            </CCard>
                        </CTabPanel>
                        <CTabPanel className="p-3" aria-labelledby="home-tab-pane" itemKey={2}>
                            <CCard className="mb-4">
                                <CCardHeader>
                                    <strong>List Of Sub Categories</strong>
                                    <div className="card-header-actions float-right">
                                        <button className='btn-sm btn btn-primary' onClick={() => navigate('/admin/inventory/create-sub-category')}>Create Sub Category</button>
                                    </div>
                                </CCardHeader>
                                <CCardBody>
                                    {categories?.sub_categories.length > 0 && <ReactDatatable columns={subcategory_columns} data={categories?.sub_categories} actions={false} />}
                                </CCardBody>
                            </CCard>
                        </CTabPanel>
                        <CTabPanel className="p-3" aria-labelledby="home-tab-pane" itemKey={3}>
                            <CCard className="mb-4">
                                <CCardHeader>
                                    <strong>List Of Child Categories</strong>
                                    <div className="card-header-actions float-right">
                                        <button className='btn-sm btn btn-primary' onClick={() => navigate('/admin/inventory/create-child-category')}>Create Child Category</button>
                                    </div>
                                </CCardHeader>
                                <CCardBody>
                                    {categories?.child_categories.length > 0 && <ReactDatatable columns={childcategory_columns} data={categories?.child_categories} actions={false} />}
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
