import React, { useEffect, useMemo, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormSelect,
    CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibEllo, cilPenAlt, cilTrash } from '@coreui/icons'
import ReactDatatable from '../../components/datatables/ReactDatatable'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axiosIntance from '../../components/axios'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

const Orders = () => {

    const [visible, setVisible] = useState(false)
    const [pvisible, setPVisible] = useState(false)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [delivery_status, setDeliverystatus] = useState('');
    const [payment_status, setPaymentstatus] = useState('');
    const [order_id, setOrderID] = useState('');

    const parts = window.location.pathname.split('/').filter(Boolean);
    const lastUrlindex = parts[parts.length - 1];

    const get_orders_data = async () => {
        setLoading(true);
        setOrders([]);
        const params = {};
        if(lastUrlindex == "today-orders"){
            params['date'] = new Date().toISOString().split('T')[0];
        }

        try {
            const res = await axiosIntance.post(`/admin/orders`, params);
            if (res.status === 200) {
                setOrders(res?.data?.orders);
            } else {
            }
        } catch (error) {
        // console.error('Error fetching product:', error);
        // Handle API error
        } finally {
            setLoading(false);
        }
    };

    const updatePaymentstatus = async () => {
        setLoading(true);
        
        const params = {
            'payment_status': payment_status,
            "order_id": order_id
        };

        try {
        const res = await axiosIntance.post(`/admin/orders/update_paymentstatus`, params);

        if (res.status === 200) {
            setPVisible(!pvisible)
            setTimeout(() => {
                location.reload();
            },1000)
        } else {
        }
        } catch (error) {
        // console.error('Error fetching product:', error);
        // Handle API error
        } finally {
            setLoading(false);
        }
    };

    const updateDeliverstatus = async () => {
        setLoading(true);
        
        const params = {
            'delivery_status': delivery_status,
            "order_id": order_id
        };

        try {
        const res = await axiosIntance.post(`/admin/orders/update_deliverystatus`, params);

        if (res.status === 200) {
            setVisible(!visible)
            setTimeout(() => {
                location.reload();
            },1000)
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
        get_orders_data()
    }, [lastUrlindex])

    const columns = useMemo(
        () => [
            {
                name: '#',
                selector: (row, key) => `${++key}`,
                sortable: true,
            },
            {
                name: 'Order ID',
                selector: (row) => `${row.order_id}`,
                sortable: true,
            },
            {
                name: 'Customer Name',
                cell: (row) => `${row.first_name} ${row.last_name}`,
                sortable: true,
            },
            {
                name: 'Area',
                selector: (row) => `${row.area_name}`,
                sortable: true,
            },
            {
                name: 'Total Amount',
                selector: (row) => `₹ ${row.total_amount}`,
                sortable: true,
            },
            {
                name: 'Payment Type',
                selector: (row) => {
                    if(row.payment_type == "cod"){
                        return 'COD';
                    }else{
                        return 'Online';
                    }
                },
                sortable: true,
            },
            {
                name: 'Order Status',
                selector: (row) => {
                    if(row.order_status === "Pending"){
                        return <span className='badge bg-yellow-500'>Pending</span>
                    }else if(row.order_status === "cancelled"){
                        return <span className='badge  bg-red-500'>Cancelled</span>
                    }else if(row.order_status === "success"){
                        return <span className='badge bg-green-500'>Success</span>
                    }
                },
                sortable: true,
            },
            {
                name: 'Payment Status',
                selector: (row) => {
                    if(row.payment_status === "Pending"){
                        return <span className='badge bg-yellow-500'>Pending</span>
                    }else if(row.payment_status === "failed"){
                        return <span className='badge  bg-red-500'>Failed</span>
                    }else if(row.payment_status === "success"){
                        return <span className='badge bg-green-500'>Success</span>
                    }
                },
                sortable: true,
            },
            {
                name: 'Delivery Status',
                selector: (row) => {
                    if(row.delivery_status === "Pending"){
                        return <span className='badge bg-yellow-500'>Pending</span>
                    }else if(row.delivery_status === "failed"){
                        return <span className='badge  bg-red-500'>Failed</span>
                    }else if(row.delivery_status === "Delivered"){
                        return <span className='badge bg-green-500'>Delivered</span>
                    }else if(row.delivery_status === "out"){
                        return <span className='badge' style={{ backgroundColor: '#3b82f6', color: '#fff' }}>Out For Delivery</span>
                    }
                },
                sortable: true,
            },
            {
                name: 'Order Date',
                selector: (row) => {
                    const date = new Date(row.date_of_order);
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear();
                    return `${day}-${month}-${year}`;
                },
                sortable: true,
            },
            {
                name: 'Payment Date',
                selector: (row) => {
                    console.log('row: ', row);
                    if(row.date_of_payment !== "0000-00-00 00:00:00"){
                        const date = new Date(row.date_of_payment);
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const year = date.getFullYear();
                        return `${day}-${month}-${year}`;
                    }else{
                        return '-';
                    }
                },
                sortable: true,
            },
            {
                name: "Action",
                cell: (row) => (
                    <>
                        <span title="View Order" style={{cursor: 'pointer'}} onClick={() => navigate('/admin/orders/view-order/'+row?.order_id)} className='mr-2'>
                            <i className='fa fa-eye'></i>
                        </span>
                        <span title="Update Delivery Status" style={{cursor: 'pointer'}} className='mr-2' onClick={() => {
                            setDeliverystatus(row.delivery_status);
                            setVisible(!visible);
                            setOrderID(row.order_id);
                        }}>
                            <i className='fa fa-edit'></i>
                        </span>
                        {row.payment_type == 'cod' &&
                            <span title="Update Payment Status" style={{cursor: 'pointer'}} onClick={() => {
                                setPaymentstatus(row.payment_status);
                                setPVisible(!visible);
                                setOrderID(row.order_id);
                            }}>
                                <i className='fa fa-pen'></i>
                            </span>
                        }
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
                        <strong>List Of Orders</strong>
                    </CCardHeader>
                    <CCardBody>
                        {orders.length > 0 && 
                        <ReactDatatable columns={columns} data={orders} actions={false} loading={loading} />}
                    </CCardBody>
                </CCard>
            </CCol>
            <>
                <CModal
                    backdrop="static"
                    visible={visible}
                    onClose={() => setVisible(false)}
                    aria-labelledby="StaticBackdropExampleLabel"
                >
                    <CModalHeader>
                    <CModalTitle id="StaticBackdropExampleLabel">Update Delivery Status</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CCol md={12}>
                            <CFormSelect label="Delivery Status" className="mb-3" onChange={(e) => setDeliverystatus(e.target.value)} defaultValue={delivery_status}>
                                <option>Select Delivery Status</option>
                                <option value={'Pending'} selected={delivery_status == "Pending" ? 'selected' : ''}>Pending</option>
                                <option value={'out'} selected={delivery_status == "out" ? 'selected' : ''}>Out For Delivery</option>
                                <option value={'Delivered'} selected={delivery_status == "Delivered" ? 'selected' : ''}>Delivered</option>
                                <option value={'failed'} selected={delivery_status == "failed" ? 'selected' : ''}>Failed</option>
                            </CFormSelect>
                        </CCol>
                    </CModalBody>
                    <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={() => updateDeliverstatus()}>Submit</CButton>
                    </CModalFooter>
                </CModal>
                <CModal
                    backdrop="static"
                    visible={pvisible}
                    onClose={() => setPVisible(false)}
                    aria-labelledby="StaticBackdropExampleLabel"
                >
                    <CModalHeader>
                    <CModalTitle id="StaticBackdropExampleLabel">Update Payment Status</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CCol md={12}>
                            <CFormSelect label="Delivery Status" className="mb-3" onChange={(e) => setPaymentstatus(e.target.value)} defaultValue={payment_status}>
                                <option>Select Payment Status</option>
                                <option value={'Pending'} selected={payment_status == "Pending" ? 'selected' : ''}>Pending</option>
                                <option value={'success'} selected={payment_status == "success" ? 'selected' : ''}>Success</option>
                                <option value={'failed'} selected={payment_status == "failed" ? 'selected' : ''}>Failed</option>
                            </CFormSelect>
                        </CCol>
                    </CModalBody>
                    <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={() => updatePaymentstatus()}>Submit</CButton>
                    </CModalFooter>
                </CModal>
            </>
        </CRow>
    )
    
}

export default Orders
