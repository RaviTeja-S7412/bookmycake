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
    const [isEggtype, setIseggtype] = useState(false)
    const [sku, setSku] = useState('')
    const [sizes, setSizes] = useState([{ kg: '', unit: '', price: '' }]);
    const [flavors, setFlavors] = useState([""]);
    const [eggtypes, setEggtypes] = useState([""]);
    const [categoriesList, setCategories] = useState([])
    const [subcategoriesList, setSubCategories] = useState([])
    const [items, setItems] = useState([
        { kg: '', unit: 'kg', price: '', flavor: '', eggtype: '' }
      ]);
      
    
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
        setSku("");
        setIssize(false);
        setIsflavor(false);
        setIseggtype(false);
        setSizes([{ kg: '', unit: '' , price: '' }]);
        setFlavors([""]);
        setEggtypes([""]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const selectedOptions = [];
        if (isSize) selectedOptions.push('weight');
        if (isFlavor) selectedOptions.push('flavor');
        if (isEggtype) selectedOptions.push('egg');

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
        formData.append('product_eggtype', JSON.stringify(eggtypes))
        formData.append('is_size', isSize)
        formData.append('is_flavor', isFlavor)
        formData.append('is_eggtype', isEggtype);
        formData.append('stock', stock);
        formData.append('sku', sku)

          // Append the formatted options
    formData.append('options', JSON.stringify(selectedOptions));

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
                setSizes(products.product_data ? products.product_data.product_size && JSON.parse(products.product_data.product_size) : '')
                setFlavors(products.product_data ? products.product_data.product_flavor && JSON.parse(products.product_data.product_flavor) : '')
                setEggtypes(products.product_data ? products.product_data.product_eggtype && JSON.parse(products.product_data.product_eggtype) : '')
                setIssize(products.product_data ? products.product_data.is_size : '')
                setIsflavor(products.product_data ? products.product_data.is_flavor : '')
                setIseggtype(products.product_data ? products.product_data.is_eggtype : '')
                setStock(products.product_data ? products.product_data.stock : '')
                setSku(products.product_data ? products.product_data.sku : '')
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
                          
                            <CCol md={12}>Options:</CCol>
                            <CCol md={2}>
                            <CFormCheck
                                type="checkbox"
                                id="validationDefault09"
                                label="Weight"
                                onChange={() => setIssize(!isSize)}
                                checked={isSize}
                            />
                            </CCol>
                            <CCol md={2}>
                            <CFormCheck
                                type="checkbox"
                                id="validationDefault10"
                                label="Flavor"
                                onChange={() => setIsflavor(!isFlavor)}
                                checked={isFlavor}
                            />
                            </CCol>
                            <CCol md={2}>
                            <CFormCheck
                                type="checkbox"
                                id="validationDefault11"
                                label="Egg/Eggless"
                                onChange={() => setIseggtype(!isEggtype)}
                                checked={isEggtype}
                            />
                            </CCol>

                            <CCol md={8}></CCol>

                            {(isSize || isFlavor || isEggtype) && (
                            <>
                                {Array.from({ length: Math.max(sizes.length, flavors.length, eggtypes.length) }).map((_, index) => (
                                <CRow key={index} className="mb-3">
                                    {isSize && sizes[index] && (
                                    <>
                                    <CCol xs={12} md={2}>
                                        <CFormInput
                                            type="text"
                                            name="sku"
                                            label="Sku"
                                            onChange={(e) => setSku(e.target.value)}
                                            value={sku}
                                        />
                                        </CCol>
                                        <CCol xs={12} md={2}>
                                        <CFormInput
                                            type="number"
                                            name="kg"
                                            label="Size kg's/ml:"
                                            onChange={(e) => handleSizeChange(index, e)}
                                            value={sizes[index].kg}
                                        />
                                        </CCol>
                                        <CCol xs={12} md={1}>
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
                                        <CreatableSelect
                                        isClearable
                                        options={[
                                            { value: 'Chocolate Truffle', label: 'Chocolate Truffle' },
                                            { value: 'Exotic Pineapple', label: 'Exotic Pineapple' },
                                            { value: 'Caramel Butterscotch', label: 'Caramel Butterscotch' },
                                            { value: 'Black Forest', label: 'Black Forest' },
                                            { value: 'Blue Berry', label: 'Blue Berry' },
                                            { value: 'Pineapple', label: 'Pineapple' }
                                        ]}
                                        value={flavors[index] ? { label: flavors[index], value: flavors[index] } : null}
                                        onChange={(newValue) => {
                                            const updated = [...flavors];
                                            updated[index] = newValue ? newValue.value : '';
                                            setFlavors(updated);
                                        }}
                                        />
                                    </CCol>
                                    )}

                                    {isEggtype && eggtypes[index] !== undefined && (
                                    <CCol xs={12} md={2}>
                                        <CreatableSelect
                                        isClearable
                                        options={[
                                            { value: 'Egg', label: 'Egg' },
                                            { value: 'Eggless', label: 'Eggless' }
                                        ]}
                                        value={eggtypes[index] ? { label: eggtypes[index], value: eggtypes[index] } : null}
                                        onChange={(newValue) => {
                                            const updated = [...eggtypes];
                                            updated[index] = newValue ? newValue.value : '';
                                            setEggtypes(updated);
                                        }}
                                        />
                                    </CCol>
                                    )}

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
                                    color="info"
                                    type="button"
                                    onClick={() => {
                                        if (isSize) setSizes([...sizes, { kg: '', unit: 'kg', price: '' }]);
                                        if (isFlavor) setFlavors([...flavors, '']);
                                        if (isEggtype) setEggtypes([...eggtypes, '']);
                                    }}
                                    >
                                    Add
                                    </CButton>
                                </CCol>
                                </CRow>
                            </>
                            )}

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
