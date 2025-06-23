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
import ReactDatatable from '../../../components/datatables/ReactDatatable'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getProducts } from '../../../redux/actions/products.actions'
import { useNavigate } from 'react-router-dom'
import { productConstants } from '../../../redux/actions/constants'
import Swal from 'sweetalert2'

const Products = () => {

    const products = useSelector(state => state.products)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleEdit = (id) => {
        dispatch({ type: productConstants.GET_SINGLEPRODUCT_REQUEST })
        navigate('/admin/inventory/update-product?id='+id)
    }

    const handleDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
        if (result.isConfirmed) {
                dispatch(deleteProduct(id))
                Swal.fire({
                title: "Deleted!",
                text: "Your product has been deleted.",
                icon: "success"
                });
            }
        });
        
    }

    useEffect(() => {
        if(products.get_products){
            dispatch(getProducts());
        }
    }, [products.get_products])

    const columns = useMemo(
        () => [
            {
                name: '#',
                selector: (row, key) => `${++key}`,
                sortable: true,
            },
            {
                name: 'Product Name',
                selector: (row) => `${row.product_name}`,
                sortable: true,
            },
            {
                name: 'Image',
                cell: (row) => (<img src={`${import.meta.env.VITE_APIBASE_URL+row.product_image}`} height={'80px'} width={'120px'}className='p-2 rounded-4' />),
                sortable: true,
            },
            {
                name: 'Category',
                selector: (row) => `${row.category_name}`,
                sortable: true,
            },
            {
                name: 'Sub Category',
                selector: (row) => `${row.sub_category_name === null ? '-' : row.sub_category_name}`,
                sortable: true,
            },
            /* {
                name: 'Stock Available',
                selector: (row) => `${row.stock}`,
                sortable: true,
            }, */
            {
                name: "Action",
                cell: (row) => (
                    <>
                        <CIcon icon={cilPenAlt} height={18} customClassName="nav-icon favicon m-2" style={{cursor: 'pointer'}} onClick={() => handleEdit(row.id)} />
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
                        <strong>List Of Products</strong>
                        <div className="card-header-actions float-right">
                            <button className='btn-sm btn btn-primary' onClick={() => navigate('/admin/inventory/create-product')}>Create Product</button>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                    {products?.products.length > 0 && <ReactDatatable columns={columns} data={products?.products} actions={false} />}
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
    
}

export default Products
