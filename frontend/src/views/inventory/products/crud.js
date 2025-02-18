import React, { use, useEffect, useState } from 'react'
import {
    CCol,
    CButton,
    CForm,
    CFormInput,
    CRow,
    CCard,
    CCardHeader,
    CCardBody,
    CFormTextarea,
    CFormLabel,
    CFormCheck,
    CFormSelect
  } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { categoryConstants, productConstants } from '../../../redux/actions/constants';
// import ReactQuill from 'react-quill'; // Import the ReactQuill component
// import 'react-quill/dist/quill.snow.css'; // Import Quill's snow theme styles
import { cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { createProduct, get_singleproduct, updateProduct } from '../../../redux/actions/products.actions';
import { getCategories, getSubCategoriesbycategoryID } from '../../../redux/actions/categories.actions';

const quillToolbar = [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'align': [] }],
    ['link', 'image'],
    ['blockquote', 'code-block'],
    ['clean'],
]

const ProductCrud = () => {

    const products = useSelector(state => state.products)
    const categories = useSelector(state => state.categories)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [category_name, setCategoryName] = useState('')
    const [subcategory_name, setSubCategoryName] = useState('')
    const [product_name, setproductName] = useState('')
    const [product_image, setproductImage] = useState('')
    const [product_desc, setProductdesc] = useState('')
    const [stock, setStock] = useState('')
    const [product_old_image, setproductOldImage] = useState('')
    const [ingredeints, setIngredeints] = useState('')
    const [nutritional_info, setnutritional_info] = useState('')
    const [shipping_info, setshipping_info] = useState('')
    const [isSize, setIssize] = useState(false)
    const [isFlavor, setIsflavor] = useState(false)
    const [sizes, setSizes] = useState([{ kg: '', price: '' }]);
    const [flavors, setFlavors] = useState([""]);
    const [categoriesList, setCategories] = useState([])
    const [subcategoriesList, setSubCategories] = useState([])
    
    useEffect(() => {
        dispatch({type: productConstants.PRODUCTS_RESET})
    }, [])

    const getSingleproduct = () => {
        const post_data = {
            id: queryParams.get("id"),
        }
        dispatch(get_singleproduct(post_data))
    }

    const resetValues = () => {
        setCategoryName("");
        setSubCategoryName("");
        setproductName("");
        setproductImage("");
        setProductdesc("");
        setStock("");
        setproductOldImage("");
        setIngredeints("");
        setnutritional_info("");
        setIssize(false);
        setIsflavor(false);
        setSizes([{ kg: '', price: '' }]);
        setFlavors([""]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('category_id', category_name)
        formData.append('sub_category_id', subcategory_name)
        formData.append('product_name', product_name)
        formData.append('file', product_image)
        formData.append('product_description', product_desc)
        formData.append('ingredients', ingredeints)
        formData.append('nutritional_info', nutritional_info)
        formData.append('shipping', shipping_info)
        formData.append('product_size', JSON.stringify(sizes))
        formData.append('product_flavor', JSON.stringify(flavors))
        formData.append('is_size', isSize)
        formData.append('is_flavor', isFlavor)
        formData.append('stock', stock)
        if(queryParams.get("id")){
            formData.append('id', queryParams.get("id"))
            formData.append('old_image', product_old_image)
            dispatch(updateProduct(formData));
        }else{
            dispatch(createProduct(formData));
        }
    }

    useEffect(() => {
        if(products.is_product_added){
            if(queryParams.get("id")){
                navigate("/admin/inventory/products");
            }
            resetValues();
        }
    }, [products.is_product_added])

    useEffect(() => {
        if(queryParams.get("id") && products.get_singleproduct){
            getSingleproduct();
        }else{
            if(Object.keys(products.product_data).length > 0){
                getSubcategories(products.product_data ? products.product_data.category_id : '')
                setCategoryName(products.product_data ? products.product_data.category_id : '')
                setSubCategoryName(products.product_data ? products.product_data.sub_category_id : '')
                setproductName(products.product_data ? products.product_data.product_name : '')
                setProductdesc(products.product_data ? products.product_data.product_description : '')
                setproductOldImage(products.product_data ? products.product_data.product_image : '')
                setIngredeints(products.product_data ? products.product_data.ingredients : '')
                setnutritional_info(products.product_data ? products.product_data.nutritional_info : '')
                setshipping_info(products.product_data ? products.product_data.shipping : '')
                setSizes(products.product_data ? JSON.parse(products.product_data.product_size) : '')
                setFlavors(products.product_data ? JSON.parse(products.product_data.product_flavor) : '')
                setIssize(products.product_data ? products.product_data.is_size : '')
                setIsflavor(products.product_data ? products.product_data.is_flavor : '')
                setStock(products.product_data ? products.product_data.stock : '')
            }
        }
    }, [queryParams.get("id"), products.get_singleproduct])
    
    const handleSizeChange = (index, event) => {
        const { name, value } = event.target;
        const updatedInputs = [...sizes];
        updatedInputs[index][name] = value;
        setSizes(updatedInputs);
    };

    const handleSizeDelete = (index) => {
        const updatedList = sizes.filter((_, i) => i !== index);
        setSizes(updatedList);
    };

    const handleFlavorChange = (index, event) => {
        const { value } = event.target;
        const updatedInputs = [...flavors];
        updatedInputs[index] = value;
        setFlavors(updatedInputs);
    };

    const handleFlavorDelete = (index) => {
        const updatedList = flavors.filter((_, i) => i !== index);
        setFlavors(updatedList);
    };

    const getSubcategories = (categoryid) => {
        const post_data = {
            categoryid: categoryid,
        }
        dispatch(getSubCategoriesbycategoryID(post_data))
    }

    useEffect(() => {
        if(categories.get_categories){
            dispatch(getCategories());
        }else{
            setCategories(categories.categories);
        }
    }, [categories.get_categories])
    
    useEffect(() => {
        if(categories.get_sub_categories_categoryid){
        }else{
            setSubCategories(categories.subcategoriesbyid_data);
        }
    }, [categories.get_sub_categories_categoryid])

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Create Product</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm className="row g-3" onSubmit={(e) => handleSubmit(e)}>
                            <CCol md={4}>
                                <CFormSelect label="Category Name" className="mb-3" aria-label="Small select example" onChange={(e) => {
                                    setCategoryName(e.target.value);
                                    getSubcategories(e.target.value);
                                }} required>
                                    <option>Select Category</option>
                                    {categoriesList.map((category, index) => (
                                        <option key={index} value={category.id} selected={category.id == category_name ? true : false}>{category.category_name}</option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                            <CCol md={4}>
                                <CFormSelect label="Sub Category Name" className="mb-3" aria-label="Small select example" onChange={(e) => setSubCategoryName(e.target.value)} defaultValue={subcategory_name}>
                                    <option>Select Sub Category</option>
                                    {subcategoriesList.map((scategory, index1) => (
                                        <option key={index1} value={scategory.id} selected={scategory.id == subcategory_name ? true : false}>{scategory.sub_category_name}</option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                            <CCol md={4}></CCol>
                            <CCol md={4}>
                                <CFormInput
                                    type="text"
                                    id="validationDefault01"
                                    label="Product Name"
                                    onChange={(e) => setproductName(e.target.value)}
                                    value={product_name}
                                    required
                                />
                            </CCol>
                            <CCol md={4}>
                                <CFormInput
                                    type="file"
                                    id="validationDefault02"
                                    label="Product Image"
                                    onChange={(e) => setproductImage(e.target.files[0])}
                                    required={queryParams.get("id") ? false : true}
                                />
                            </CCol>
                            <CCol md={4}>
                                <CFormInput
                                    type="number"
                                    id="validationDefault03"
                                    label="Stock"
                                    onChange={(e) => setStock(e.target.value)}
                                    value={stock}
                                    min={0}
                                    required
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormTextarea
                                    label="Product Description:"
                                    rows={2}
                                    onChange={(e) => setProductdesc(e.target.value)}
                                    value={product_desc}
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormTextarea
                                    label="Shipping Information:"
                                    rows={2}
                                    onChange={(e) => setshipping_info(e.target.value)}
                                    value={shipping_info}
                                />
                            </CCol>
                            <CCol md={6}>
                                {/* <CFormLabel>Ingredients:</CFormLabel> */}
                                {/* <ReactQuill
                                    value={ingredeints}
                                    onChange={(value) => setIngredeints(value)}
                                    theme="snow"
                                    modules={{
                                    toolbar: quillToolbar,
                                    }}
                                /> */}
                                <CFormTextarea
                                    label="Ingredients:"
                                    rows={2}
                                    onChange={(e) => setIngredeints(e.target.value)}
                                    value={ingredeints}
                                />
                            </CCol>
                            <CCol md={6}>
                                {/* <CFormLabel>Nutritional Information:</CFormLabel> */}
                                {/* <ReactQuill
                                    value={nutritional_info}
                                    onChange={(value) => setnutritional_info(value)}
                                    theme="snow"
                                    modules={{
                                    toolbar: quillToolbar,
                                    }}
                                /> */}
                                <CFormTextarea
                                    label="Nutritional Information:"
                                    rows={2}
                                    onChange={(e) => setnutritional_info(e.target.value)}
                                    value={nutritional_info}
                                />
                            </CCol>
                            <CCol md={2}>
                                <CFormCheck
                                    type="checkbox"
                                    id="validationDefault09"
                                    label="Size"
                                    onChange={(e) => setIssize(!isSize)}
                                    checked={isSize}
                                    required
                                />
                            </CCol>
                            <CCol md={2}>
                                <CFormCheck
                                    type="checkbox"
                                    id="validationDefault10"
                                    label="Flavor"
                                    onChange={(e) => setIsflavor(!isFlavor)}
                                    checked={isFlavor}
                                    required
                                />
                            </CCol>
                            <CCol md={8}></CCol>
                            {isSize && 
                                <CCol md={6}>
                                    {sizes.map((size, index) => (
                                        <CRow key={index}>
                                            <CCol md={5}>
                                                <CFormInput
                                                    type="number"
                                                    name='kg'
                                                    id="validationDefault01"
                                                    label="Size in kg's: "
                                                    onChange={(e) => handleSizeChange(index, e)}
                                                    value={size.kg}
                                                />
                                            </CCol>
                                            <CCol md={5}>
                                                <CFormInput
                                                    type="number"
                                                    name='price'
                                                    id="validationDefault01"
                                                    label="Price: "
                                                    onChange={(e) => handleSizeChange(index, e)}
                                                    value={size.price}
                                                />
                                            </CCol>
                                            {index > 0 &&
                                                <CCol md={2}>
                                                    <CIcon icon={cilTrash} height={18} customClassName="nav-icon favicon" style={{cursor: 'pointer', color: 'red', marginTop:'40px'}} onClick={() => handleSizeDelete(index)} /> 
                                                </CCol>
                                            }
                                        </CRow>
                                    ))}
                                    <CRow className='mt-2'>
                                        <CCol md={8}></CCol>
                                        <CCol md={2}>
                                            <CButton color="primary" className='float-end' type="button" onClick={() => setSizes([...sizes, { kg: '', price: '' }])} style={{width: '60px'}}>
                                                Add
                                            </CButton>
                                        </CCol>  
                                    </CRow>    
                                </CCol>
                            }
                            {isFlavor && 
                                <CCol md={6}>
                                    {flavors.map((flavor, index) => (
                                        <CRow key={index}>
                                            <CCol md={10}>
                                                <CFormInput
                                                    type="text"
                                                    name='kg'
                                                    id="validationDefault01"
                                                    label={"Flavor Name: "}
                                                    onChange={(e) => handleFlavorChange(index, e)}
                                                    value={flavor}
                                                />
                                            </CCol>
                                            {index > 0 &&
                                                <CCol md={2}>
                                                    <CIcon icon={cilTrash} height={18} customClassName="nav-icon favicon" style={{cursor: 'pointer', color: 'red', marginTop:'40px'}} onClick={() => handleFlavorDelete(index)} /> 
                                                </CCol>
                                            }
                                        </CRow>
                                    ))}
                                    <CRow className='mt-2'>
                                        <CCol md={8}></CCol>
                                        <CCol md={2}>
                                            <CButton color="primary" className='float-end' type="button" onClick={() => setFlavors([...flavors, ""])} style={{width: '60px'}}>
                                                Add
                                            </CButton>
                                        </CCol>  
                                    </CRow>  
                                </CCol>
                            }
                            <CCol xs={12}>
                                <CButton color="primary" type="submit">
                                    Submit
                                </CButton>
                            </CCol>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )

}

export default ProductCrud
