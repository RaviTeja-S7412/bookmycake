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
import { areaConstants, bannerConstants } from '../../../redux/actions/constants'
import Swal from 'sweetalert2'
import { createBanner, deleteBanner, getBanners, updateBanner } from '../../../redux/actions/banners.actions'
import Modal from '../../../components/Modal'
import axiosIntance from '../../../components/axios'

const Banners = () => {

    const banners = useSelector(state => state.banners);
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState('');
    const [old_image, setOldImage] = useState('');
    const [banner_title, setbanner_title] = useState('');
    const [banner_id, setBannerid] = useState('');

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this banner!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteBanner(id));
                dispatch({type: bannerConstants.BANNERS_RESET})
                Swal.fire({
                    title: "Deleted!",
                    text: "Your banner has been deleted.",
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
            const res = await axiosIntance.post(`/admin/update_bannerstatus`, params);
            if (res.status === 200) {
                dispatch({ type: bannerConstants.GET_BANNERS_REQUEST });
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
        if(banners.get_banners) {
            dispatch(getBanners());
        }
    }, [banners.get_banners, banners?.is_banner_added])

    const update_banner = (id, title, image) => {
        setBannerid(id);
        setbanner_title(title);
        setOldImage(image);
        setShowModal(true);
    }
    
    const columns = useMemo(
        () => [
            {
                name: '#',
                selector: (row, key) => `${++key}`,
                sortable: true,
            },
            {
                name: 'Banner Title',
                selector: (row) => `${row.banner_title}`,
                sortable: true,
            },
            {
                name: 'Image',
                cell: (row) => (<img src={`${import.meta.env.VITE_APIBASE_URL+row.image}`} height={'260px'} width={'200px'}className='p-2 rounded-4' />),
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
                        <CIcon icon={cilPenAlt} height={18} customClassName="nav-icon favicon m-2" style={{cursor: 'pointer'}} onClick={() => update_banner(row.id, row?.banner_title, row?.image)} />
                        <CIcon icon={cilTrash} height={18} customClassName="nav-icon favicon" style={{cursor: 'pointer'}} onClick={() => handleDelete(row.id)} />
                    </>
                ),
            },
        ],
        [],
    )

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', image);
        formData.append('banner_title', banner_title);
        if(banner_id) {
            formData.append('id', banner_id);
            formData.append('old_image', old_image);
            dispatch(updateBanner(formData));
        }else{
            dispatch(createBanner(formData));
        }
        // location.reload();
        setShowModal(false);
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>List Of Banners</strong>
                        <div className="card-header-actions float-right">
                            <button className='btn-sm btn btn-primary' onClick={() => setShowModal(!showModal)}>Create Banner</button>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        {banners?.banners.length > 0 && <ReactDatatable columns={columns} data={banners?.banners} />}
                    </CCardBody>
                </CCard>
            </CCol>
             <Modal isOpen={showModal} onClose={() => {
                setBannerid('');
                setbanner_title('');
                setImage('');
                setShowModal(!showModal);
            }} className="modal-dialog modal-lg">
                <h6 className="text-sm font-bold mb-4">{banner_id === '' ? 'Create' : 'Update'} Banner</h6>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="flex flex-col">
                        <label className="mb-2">Banner Title</label>
                        <input type="text" className="border p-2 rounded" value={banner_title} onChange={(e) => setbanner_title(e.target.value)} placeholder="Enter banner title" />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label className="mb-2">Banner Image</label>
                        <input type="file" className="border p-2 rounded" required={banner_id == '' ? true : false } onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
                        <p className="text-xs text-red-500 mt-2 ">Note: Please select the image size of 1920*540.</p>
                    </div>
                    <button className="mt-2 bg-blue-500 btn btn-sm btn-info text-white rounded">
                        Submit
                    </button>
                </form>
            </Modal>
        </CRow>
    )
    
}

export default Banners
