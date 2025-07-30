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
    CFormSelect,
  } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import { categoryConstants, productConstants } from '../../../redux/actions/constants';
// import ReactQuill from 'react-quill'; // Import the ReactQuill component
// import 'react-quill/dist/quill.snow.css'; // Import Quill's snow theme styles
import { cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { createProduct, get_singleproduct, updateProduct } from '../../../redux/actions/products.actions';
import { getCategories, getSubCategoriesbycategoryID } from '../../../redux/actions/categories.actions';
import axiosIntance from '../../../components/axios';

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

    const [loading, setLoading] = useState(false)
    const [category_name, setCategoryName] = useState('')
    const [subcategory_name, setSubCategoryName] = useState('')
    const [product_name, setproductName] = useState('')
    const [product_image, setproductImage] = useState('')
    const [product_desc, setProductdesc] = useState('')
    const [stock, setStock] = useState('')
    const [product_old_image, setproductOldImage] = useState('')
    const [ingredeints, setIngredeints] = useState('')
    const [nutritional_info, setnutritional_info] = useState('')
    const [meta_title, setMetatitle] = useState('')
    const [meta_keywords, setMetakeywords] = useState('')
    const [meta_description, setMetadescription] = useState('')
    const [shipping_info, setshipping_info] = useState('')
    const [isSize, setIssize] = useState(true)
    const [isFlavor, setIsflavor] = useState(true)
    const [isEggtype, setIseggtype] = useState(false)
    const [isDesignercollections, setDesignercollections] = useState("false")
    const [isCorporatecollections, setCorporatecollections] = useState("false")
    const [isFeaturedproducts, setFeaturedproducts] = useState("false")
    const [isBirtdaysAnniversaries, setBirtdaysAnniversaries] = useState("false")
    const [isPastriesSmallCakes, setPastriesSmallCakes] = useState("false")
    const [isIndianFusionCakes, setIndianFusionCakes] = useState("false")
    const [sku, setSku] = useState('')
    const [sizes, setSizes] = useState([{ kg: '', unit: 'kg', price: '' }]);
    const [flavors, setFlavors] = useState([{flavor: ''}]);
    const [eggtypes, setEggtypes] = useState([{eggoption: ''}]);
    const [categoriesList, setCategories] = useState([])
    const [subcategoriesList, setSubCategories] = useState([])
    const [customer_type, setCustomertype] = useState("retail");
    const [optionsLength, setOptionsLength] = useState(1);
    const [attributesLength, setAttributesLength] = useState(1);
    const [customer_types, setCustomertypes] = useState([
        { label: 'Retail', value: 'retail' },
        { label: 'Corporate', value: 'corporate' }
    ])
    const [attributes, setAttributes] = useState([]);
    const [sub_attributes, setSubAttributes] = useState([]);
    const [productAttributes, setProductAttributes] = useState([""]);
    const [productSubAttributes, setProductSubAttributes] = useState([""]);
      
    useEffect(() => {
        dispatch({type: productConstants.PRODUCTS_RESET});
        getAttributes();
    }, [])

    const getAttributes = async () => {
        const res = await axiosIntance.get(`/admin/get_attributes`);
        if (res.status === 200) {
            setAttributes(res.data.attributes);
            setSubAttributes(res.data.sub_attributes);
        }
    }

    const getSingleproduct = () => {
        const post_data = {
            id: queryParams.get("id"),
        }
        dispatch(get_singleproduct(post_data))
    }

    const resetValues = () => {
        setCategoryName("");
        setCustomertype("retail");
        setSubCategoryName("");
        setproductName("");
        setproductImage("");
        setProductdesc("");
        setStock("");
        setproductOldImage("");
        setIngredeints("");
        setnutritional_info("");
        setMetatitle("");
        setMetakeywords("");
        setMetadescription("");
        setSku("");
        setIssize(false);
        setIsflavor(false);
        setIseggtype(false);
        setOptionsLength(1);
        setAttributesLength(1);
        setSizes([{ kg: '', unit: 'kg' , price: '' }]);
        setFlavors([{flavor: ''}]);
        setEggtypes([{eggoption: ''}]);
        setAttributes([""]);
        setSubAttributes([""]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const selectedOptions = [];
        if (isSize) selectedOptions.push('weight');
        if (isFlavor) selectedOptions.push('flavor');
        if (isEggtype) selectedOptions.push('egg');

        const formData = new FormData()
        formData.append('customer_type', customer_type)
        formData.append('category_id', category_name)
        formData.append('sub_category_id', subcategory_name)
        formData.append('product_name', product_name)
        formData.append('file', product_image)
        formData.append('product_description', product_desc)
        formData.append('ingredients', ingredeints)
        formData.append('nutritional_info', nutritional_info)
        formData.append('meta_title', meta_title)
        formData.append('meta_keywords', meta_keywords)
        formData.append('meta_description', meta_description)
        formData.append('shipping', shipping_info)
        formData.append('isFeaturedproducts', isFeaturedproducts)
        formData.append('isCorporatecollections', isCorporatecollections)
        formData.append('isDesignercollections', isDesignercollections)
        formData.append('isBirthdaycollection', isBirtdaysAnniversaries)
        formData.append('isPastries', isPastriesSmallCakes)
        formData.append('isIndianfusioncakes', isIndianFusionCakes)

        formData.append('product_size', JSON.stringify(sizes))
        formData.append('product_flavor', JSON.stringify(flavors))
        formData.append('product_eggtype', JSON.stringify(eggtypes))
        formData.append('attributes', JSON.stringify(productAttributes))
        formData.append('sub_attributes', JSON.stringify(productSubAttributes))
        // Append the formatted options
        formData.append('options', selectedOptions?.length > 0 ? JSON.stringify(selectedOptions) : "");

        if(queryParams.get("id")){
            formData.append('id', queryParams.get("id"))
            formData.append('old_image', product_old_image)
            dispatch(updateProduct(formData));
            navigate('/admin/inventory/products');
        }else{
            dispatch(createProduct(formData));
        }
        setLoading(false);
    }

    useEffect(() => {
        if(products.is_product_added){
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
                setCustomertype(products.product_data ? products.product_data.customer_type : '')
                setSubCategoryName(products.product_data ? products.product_data.sub_category_id : '')
                setproductName(products.product_data ? products.product_data.product_name : '')
                setProductdesc(products.product_data ? products.product_data.product_description : '')
                setproductOldImage(products.product_data ? products.product_data.product_image : '')
                setIngredeints(products.product_data ? products.product_data.ingredients : '')
                setnutritional_info(products.product_data ? products.product_data.nutritional_info : '')
                setMetatitle(products.product_data ? products.product_data.meta_title : '')
                setMetakeywords(products.product_data ? products.product_data.meta_keywords : '')
                setMetadescription(products.product_data ? products.product_data.meta_description : '')
                setshipping_info(products.product_data ? products.product_data.shipping : '')
                setSizes(products.product_data ? products.product_data.product_size && JSON.parse(products.product_data.product_size) : '')
                setFlavors(products.product_data ? products.product_data.product_flavor && JSON.parse(products.product_data.product_flavor) : '')
                setEggtypes(products.product_data ? products.product_data.product_eggtype && JSON.parse(products.product_data.product_eggtype) : '')
                setCorporatecollections(products.product_data?.isCorporatecollections);
                setDesignercollections(products.product_data?.isDesignercollections);
                setFeaturedproducts(products.product_data?.isFeaturedproducts);
                setBirtdaysAnniversaries(products.product_data?.isBirthdaycollection);
                setPastriesSmallCakes(products.product_data?.isPastries);
                setIndianFusionCakes(products.product_data?.isIndianfusioncakes);
                setProductAttributes(products.product_data ? products.product_data.attributes && JSON.parse(products.product_data.attributes) : [""]);
                setProductSubAttributes(products.product_data ? products.product_data.sub_attributes && JSON.parse(products.product_data.sub_attributes) : [""]);

                const options = products.product_data ? products.product_data.options : '';
                if (options) {
                    const parsedOptions = JSON.parse(options);
                    setIssize(parsedOptions.includes('weight'));
                    setIsflavor(parsedOptions.includes('flavor'));
                    setIseggtype(parsedOptions.includes('egg'));

                    const product_options = products?.product_data?.product_options;
                    if (parsedOptions.includes('weight')) {
                        const formattedSizes = product_options.map(item => ({
                            id: item.id || '',
                            kg: item.weight || '',
                            unit: item.unit || 'kg',
                            price: item.price || ''
                        }));
                        setSizes(formattedSizes);
                    }
                    if (parsedOptions.includes('flavor')) {
                        const formattedflavors = product_options.map(item => ({ id: item.id, flavor: item.flavor || ''}));
                        setFlavors(formattedflavors);
                    }
                    if (parsedOptions.includes('egg')) {
                        const formattedEggtypes = product_options.map(item => ({ id: item.id, eggoption: item.eggoption || ''}));
                        setEggtypes(formattedEggtypes);
                    }
                }
            }
        }
    }, [queryParams.get("id"), products.get_singleproduct])

    const handleSizeDelete = (index) => {
        const updatedList = sizes.filter((_, i) => i !== index);
        setSizes(updatedList);
    };

    const handleFlavorDelete = (index) => {
        const updatedList = flavors.filter((_, i) => i !== index);
        setFlavors(updatedList);
    };

    const handleEggtypeDelete = (index) => {
        const updatedList = eggtypes.filter((_, i) => i !== index);
        setEggtypes(updatedList);
    }

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

    const handleSizeChange = (index, event) => {
        const { name, value } = event.target;
        const updatedInputs = [...sizes];
        updatedInputs[index][name] = value;
        setSizes(updatedInputs);
    };

    useEffect(() => {
        if (isSize) {
            setOptionsLength(sizes?.length);
        } else if (isFlavor) {
            setOptionsLength(flavors?.length);
        } else if (isEggtype) {
            setOptionsLength(eggtypes?.length);
        }
    }, [sizes, flavors, eggtypes])
    
    useEffect(() => {
        console.log(productAttributes)
        setAttributesLength(productAttributes?.length ? productAttributes.length : 1);
    }, [productAttributes])

    const handleAttributeChange = (index, event) => {
        const { name, value } = event.target;
        const updatedAttributes = [...productAttributes];
        updatedAttributes[index] = value;
        setProductAttributes(updatedAttributes);
    };

    console.log(isBirtdaysAnniversaries, isPastriesSmallCakes, isIndianFusionCakes, isDesignercollections, isCorporatecollections, isFeaturedproducts);
    

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
                                <CFormSelect label="Customer Type" className="mb-3" aria-label="Small select example" onChange={(e) => setCustomertype(e.target.value)} defaultValue={customer_type}>
                                    <option>Select Customer Type</option>
                                    {customer_types.map((ctype, index2) => (
                                        <option key={index2} value={ctype.value} selected={ctype.value == customer_type ? true : false}>{ctype.label}</option>
                                    ))}
                                </CFormSelect>
                            </CCol>
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
                                <small className='text-red-500'>Note: Please select 700px*700px image</small>
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
                                <CFormTextarea
                                    label="Ingredients:"
                                    rows={2}
                                    onChange={(e) => setIngredeints(e.target.value)}
                                    value={ingredeints}
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormTextarea
                                    label="Nutritional Information:"
                                    rows={2}
                                    onChange={(e) => setnutritional_info(e.target.value)}
                                    value={nutritional_info}
                                />
                            </CCol>
                             <CCol md={12}><CFormLabel className='fw-bold'>Meta Info</CFormLabel></CCol>
                             <CCol md={6}>
                                <CFormTextarea
                                    label="Meta Title:"
                                    rows={2}
                                    onChange={(e) => setMetatitle(e.target.value)}
                                    value={meta_title}
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormTextarea
                                    label="Meta Keywords:"
                                    rows={2}
                                    onChange={(e) => setMetakeywords(e.target.value)}
                                    value={meta_keywords}
                                />
                            </CCol>
                             <CCol md={6}>
                                <CFormTextarea
                                    label="Meta Description:"
                                    rows={2}
                                    onChange={(e) => setMetadescription(e.target.value)}
                                    value={meta_description}
                                />
                            </CCol>
                           
                            <CCol md={12}><CFormLabel className='font-bold'>Visible To:</CFormLabel></CCol>
                            <CCol md={2}>
                                <CFormCheck
                                    type="checkbox"
                                    id="validationDefault09"
                                    label="Designer Collections"
                                    onChange={() => setDesignercollections(isDesignercollections == "true" ? "false" : "true")}
                                    checked={isDesignercollections == "true" ? "checked" : '' }
                                />
                            </CCol>
                            <CCol md={2}>
                                <CFormCheck
                                    type="checkbox"
                                    id="validationDefault10"
                                    label="Corporate Collections"
                                    onChange={() => setCorporatecollections(isCorporatecollections == "true" ? "false" : "true")}
                                    checked={isCorporatecollections == "true" ? "checked" : ''}
                                />
                            </CCol>
                            <CCol md={2}>
                                <CFormCheck
                                    type="checkbox"
                                    id="validationDefault11"
                                    label="Featured Products"
                                    onChange={() => setFeaturedproducts(isFeaturedproducts == "true" ? "false" : "true")}
                                    checked={isFeaturedproducts == "true" ? "checked" : ''}
                                />
                            </CCol>
                            <CCol md={2}>
                                <CFormCheck
                                    type="checkbox"
                                    id="validationDefault12"
                                    label="Birtdays & Anniversaries"
                                    onChange={() => setBirtdaysAnniversaries(isBirtdaysAnniversaries == "true" ? "false" : "true")}
                                    checked={isBirtdaysAnniversaries == "true" ? "checked" : ''}
                                />
                            </CCol>
                            <CCol md={2}>
                                <CFormCheck
                                    type="checkbox"
                                    id="validationDefault13"
                                    label="Indian Fusion Cakes"
                                    onChange={() => setIndianFusionCakes(isIndianFusionCakes == "true" ? "false" : "true")}
                                    checked={isIndianFusionCakes == "true" ? "checked" : ''}
                                />
                            </CCol>
                            <CCol md={2}>
                                <CFormCheck
                                    type="checkbox"
                                    id="validationDefault14"
                                    label="Pastries & Small Cakes"
                                    onChange={() => setPastriesSmallCakes(isPastriesSmallCakes == "true" ? "false" : "true")}
                                    checked={isPastriesSmallCakes == "true" ? "checked" : ''}
                                />
                            </CCol>

                            <CCol md={12}><CFormLabel className='font-bold'>Product Options:</CFormLabel></CCol>
                            
                            {(isSize || isFlavor) && (
                            <>
                                {Array.from({ length: optionsLength }).map((_, index) => (
                                <CRow key={index} className="mb-3">
                                    {isSize && sizes[index] && (
                                    <>
                                    {/*<CCol xs={12} md={1}>
                                        <CFormInput
                                            type="text"
                                            name="sku"
                                            label="Sku:"
                                            onChange={(e) => setSku(e.target.value)}
                                            value={sizes[index].sku}
                                        />
                                    </CCol>*/}
                                    <CCol xs={12} md={2}>
                                        <CFormInput
                                            type="number"
                                            name="kg"
                                            label="Size kg's/ml:"
                                            onChange={(e) => handleSizeChange(index, e)}
                                            value={sizes[index].kg}
                                            required
                                        />
                                    </CCol>
                                    <CCol xs={12} md={2}>
                                        <CFormSelect
                                            name="unit"
                                            label="Unit"
                                            onChange={(e) => handleSizeChange(index, e)}
                                            value={sizes[index].unit}
                                        >
                                            <option value="kg">Kg</option>
                                            <option value="ml">ml</option>
                                        </CFormSelect>
                                        </CCol>
                                        <CCol xs={12} md={2}>
                                        <CFormInput
                                            type="number"
                                            name="price"
                                            label="Price:"
                                            onChange={(e) => handleSizeChange(index, e)}
                                            value={sizes[index].price}
                                        />
                                        </CCol>
                                    </>
                                    )}

                                    {isFlavor && flavors[index] !== undefined && (
                                    <CCol xs={12} md={3}>
                                        <label className='mb-2'>Flavor:</label>
                                        <CreatableSelect
                                        isClearable
                                        options={[
                                            { value: 'Chocolate Truffle', label: 'Chocolate Truffle' },
                                            { value: 'Pineapple', label: 'Pineapple' },
                                            { value: 'Butterscotch', label: 'Butterscotch' },
                                            { value: 'Black Forest', label: 'Black Forest' },
                                            { value: 'Blue Berry', label: 'Blue Berry' },
                                            { value: 'Chocolate', label: 'Chocolate' },
                                            { value: 'Chocolate inside', label: 'Chocolate inside' },
                                            { value: 'Chocolate Soft', label: 'Chocolate Soft' },
                                            { value: 'Dark Chocolate', label: 'Dark Chocolate' },
                                            { value: 'Fresh Fruit Inside', label: 'Fresh Fruit Inside' },
                                            { value: 'Fresh Fruits', label: 'Fresh Fruits' },
                                            { value: 'Fruit', label: 'Fruit' },
                                            { value: 'Fruit Inside', label: 'Fruit Inside' },
                                            { value: 'Rainbow', label: 'Rainbow' },
                                            { value: 'Red Velvet', label: 'Red Velvet' },
                                            { value: 'Soft Chocolate', label: 'Soft Chocolate' },
                                            { value: 'Strawberry', label: 'Strawberry' },
                                        ]}
                                        value={flavors[index] ? { label: flavors[index]["flavor"], value: flavors[index]["flavor"] } : null}
                                        onChange={(newValue) => {
                                            const updated = [...flavors];
                                            updated[index]["flavor"] = newValue ? newValue.value : '';
                                            setFlavors(updated);
                                        }}
                                        />
                                    </CCol>
                                    )}

                                    {/* {isEggtype && eggtypes[index] !== undefined && (
                                    <CCol xs={12} md={2}>
                                        <label className='mb-2'>Egg/Eggless:</label>
                                        <CreatableSelect
                                        isClearable
                                        options={[
                                            { value: 'Egg', label: 'Egg' },
                                            { value: 'Eggless', label: 'Eggless' }
                                        ]}
                                        value={eggtypes[index] ? { label: eggtypes[index]["eggoption"], value: eggtypes[index]["eggoption"] } : null}
                                        onChange={(newValue) => {
                                            const updated = [...eggtypes];
                                            updated[index]["eggoption"] = newValue ? newValue.value : '';
                                            setEggtypes(updated);
                                        }}
                                        />
                                    </CCol>
                                    )} */}

                                    <CCol xs={12} md={1}>
                                    {index > 0 && (
                                        <CIcon
                                        icon={cilTrash}
                                        height={18}
                                        style={{ cursor: 'pointer', color: 'red', marginTop: '40px' }}
                                        onClick={() => {
                                            if (isSize) handleSizeDelete(index);
                                            if (isFlavor) handleFlavorDelete(index);
                                            if (isEggtype) handleEggtypeDelete(index);
                                        }}
                                        />
                                    )}
                                    </CCol>
                                </CRow>
                                ))}

                                <CRow className="mb-3">
                                    <CCol xs={12} md={2}>
                                        <CButton
                                            color="primary"
                                            type="button"
                                            onClick={() => {
                                                if (isSize) setSizes([...sizes, { kg: '', unit: 'kg', price: '' }]);
                                                if (isFlavor) setFlavors([...flavors, {flavor: ''}]);
                                                if (isEggtype) setEggtypes([...eggtypes, {eggoption: ''}]);
                                            }}
                                        >
                                        <i className='fa fa-plus'></i> Add
                                        </CButton>
                                    </CCol>
                                </CRow>
                            </>
                            )}

                            <CCol md={12}><CFormLabel className='font-bold'>Product Attributes:</CFormLabel></CCol>

                            {Array.from({ length: attributesLength })?.map((_, pindex) => (
                                <CRow key={pindex} className="mb-3">

                                    <CCol xs={12} md={3}>
                                        <CFormSelect
                                            name="attributes"
                                            label="Attributes"
                                            onChange={(e) => handleAttributeChange(pindex, e)}
                                            value={productAttributes?.[pindex]}
                                        >
                                        <option value="">Select Attribute</option>
                                        {attributes.map((attribute, index) => (
                                            <option key={index} value={attribute?.id} selected={productAttributes?.[pindex] === attribute?.id ? true : false}>
                                                {attribute?.attribute_name}
                                            </option>
                                        ))}
                                        </CFormSelect>
                                    </CCol>
                                    <CCol xs={12} md={3}>
                                        <CFormSelect
                                            name="sub_attributes"
                                            label="Sub Attributes"
                                            onChange={(e) => {
                                                const updatedSubAttributes = [...productSubAttributes];
                                                updatedSubAttributes[pindex] = e.target.value;
                                                setProductSubAttributes(updatedSubAttributes);
                                            }}
                                            value={productSubAttributes?.[pindex]}
                                        >
                                        <option value="">Select Sub Attribute</option>
                                        {productAttributes?.[pindex] && sub_attributes?.filter((sa) => sa?.attribute_menu_id == productAttributes?.[pindex])?.map((sub_attribute, index) => (
                                            <option key={index} value={sub_attribute?.id} selected={productSubAttributes?.[pindex] === sub_attribute?.id ? true : false}>
                                                {sub_attribute?.sub_attribute_name}
                                            </option>
                                        ))}
                                        </CFormSelect>
                                    </CCol>
                                    <CCol xs={12} md={1}>
                                    {pindex > 0 && (
                                        <CIcon
                                        icon={cilTrash}
                                        height={18}
                                        style={{ cursor: 'pointer', color: 'red', marginTop: '40px' }}
                                        onClick={() => {
                                            const updatedAttributes = [...productAttributes];
                                            const updatedSubAttributes = [...productSubAttributes];
                                            updatedAttributes.splice(pindex, 1);
                                            updatedSubAttributes.splice(pindex, 1);
                                            setProductAttributes(updatedAttributes);
                                            setProductSubAttributes(updatedSubAttributes);
                                        }}
                                        />
                                    )}
                                    </CCol>
                                </CRow>
                            ))}
                            <CRow className="mb-3">
                                <CCol xs={12} md={2}>
                                    <CButton
                                        color="primary"
                                        type="button"
                                        onClick={() => {
                                            setProductAttributes([...productAttributes, ""]);
                                            setProductSubAttributes([...productSubAttributes, ""]);
                                        }}
                                    >
                                    <i className='fa fa-plus'></i> Add
                                    </CButton>
                                </CCol>
                            </CRow>

                            <CCol xs={12}>
                                <CButton color="primary" type="submit" disabled={loading}>
                                    {loading ? 'Submitting' : 'Submit'}
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
