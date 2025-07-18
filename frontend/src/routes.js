import { element } from 'prop-types';
import React from 'react'

// admin
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Profile = React.lazy(() => import('./views/profile/updateProfile'));
const Login = React.lazy(() => import('./views/Login'));
const Users = React.lazy(() => import('./views/users'));
const Enquires = React.lazy(() => import('./views/enquires'));
const Products = React.lazy(() => import('./views/inventory/products'));
const Categories = React.lazy(() => import('./views/inventory/categories'));
const CategoryCrud = React.lazy(() => import('./views/inventory/categories/crud'));
const ProductCrud = React.lazy(() => import('./views/inventory/products/crud'));
const SubCategoryCrud = React.lazy(() => import('./views/inventory/categories/subcategorycrud'));
const ChildCategoryCrud = React.lazy(() => import('./views/inventory/categories/childcategorycrud'));
const Cities = React.lazy(() => import('./views/settings/cities'));
const CitiesCrud = React.lazy(() => import('./views/settings/cities/crud'));
const Pincodes = React.lazy(() =>import('./views/settings/pincodes'));
const PincodesCrud = React.lazy(() => import('./views/settings/pincodes/crud')); 
const Areas = React.lazy(() => import('./views/settings/areas'));
const AreasCrud = React.lazy(() => import('./views/settings/areas/crud'));
const Props = React.lazy(() => import('./views/settings/props'));
const PropsCrud = React.lazy(() => import('./views/settings/props/crud'));
const Orders = React.lazy(() => import('./views/orders'));
const OrderDetails = React.lazy(() => import('./views/orders/orderDetails'));
const Banners = React.lazy(() => import('./views/settings/banners'));

const routes = [
  { path: '/admin/login', exact: true, name: 'Home', element: Login },
  { path: '/admin/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/admin/updateProfile', name: 'Profile', element: Profile },
  { path: '/admin/users', name: 'Users', element: Users },
  { path: '/admin/enquires', name: 'Enquires', element: Enquires},
  { path: '/admin/inventory/products', name: 'Products', element: Products },
  { path: '/admin/inventory/create-product', name: 'Products/Create Product', element: ProductCrud },
  { path: '/admin/inventory/update-product', name: 'Products/Update Product', element: ProductCrud },
  { path: '/admin/inventory/categories', name: 'Categories', element: Categories },
  { path: '/admin/inventory/create-category', name: 'Categories/Create Category', element: CategoryCrud },
  { path: '/admin/inventory/update-category', name: 'Categories/Update Category', element: CategoryCrud },
  { path: '/admin/inventory/create-sub-category', name: 'Categories/Create Sub Category', element: SubCategoryCrud },
  { path: '/admin/inventory/update-sub-category', name: 'Categories/Update Sub Category', element: SubCategoryCrud },
  { path: '/admin/inventory/create-child-category', name: 'Categories/Create Child Category', element: ChildCategoryCrud },
  { path: '/admin/inventory/update-child-category', name: 'Categories/Update Child Category', element: ChildCategoryCrud },
  { path: '/admin/settings/Banners', name: 'Banners', element: Banners },
  { path: '/admin/settings/cities', name: 'Cities', element: Cities },
  { path: '/admin/settings/create-cities', name: 'Cities/Create Cities', element: CitiesCrud },
  { path: '/admin/settings/update-city', name: 'Cities/Update Cities', element: CitiesCrud },

  { path: '/admin/settings/pincodes', name: 'Pincodes', element: Pincodes },
  { path: '/admin/settings/create-pincodes', name: 'Pincodes/Create Pincodes', element: PincodesCrud },
  { path: '/admin/settings/update-pincode', name: 'Pincodes/Update Pincodes', element: PincodesCrud },

  { path: '/admin/settings/areas', name: 'Areas', element: Areas },
  { path: '/admin/settings/create-areas', name: 'Areas/Create Areas', element: AreasCrud},
  { path: '/admin/settings/update-area', name: 'Areas/Update Area', element: AreasCrud},

  { path: '/admin/settings/props', name: 'Props', element: Props },
  { path: '/admin/settings/create-props', name: 'Props/Create Props', element: PropsCrud},
  { path: '/admin/settings/update-prop', name: 'Props/Update Prop', element: PropsCrud},

  { path: '/admin/orders/today-orders', name: 'Orders/Todays Orders', element: Orders},
  { path: '/admin/orders/all-orders', name: 'Orders/All Orders', element: Orders},
  { path: '/admin/orders/view-order', name: 'Orders/View Order Details', element: OrderDetails}


  
]

export default routes
