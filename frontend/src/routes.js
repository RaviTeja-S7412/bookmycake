import React from 'react'

// admin
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Login = React.lazy(() => import('./views/Login'));
const Users = React.lazy(() => import('./views/users'));
const Products = React.lazy(() => import('./views/inventory/products'));
const Categories = React.lazy(() => import('./views/inventory/categories'));
const CategoryCrud = React.lazy(() => import('./views/inventory/categories/crud'));
const SubCategoryCrud = React.lazy(() => import('./views/inventory/categories/subcategorycrud'));
const ChildCategoryCrud = React.lazy(() => import('./views/inventory/categories/childcategorycrud'));

const routes = [
  { path: '/admin/login', exact: true, name: 'Home', element: Login },
  { path: '/admin/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/admin/users', name: 'Users', element: Users },
  { path: '/admin/inventory/products', name: 'Products', element: Products },
  { path: '/admin/inventory/categories', name: 'Categories', element: Categories },
  { path: '/admin/inventory/create-category', name: 'Categories/Create Category', element: CategoryCrud },
  { path: '/admin/inventory/update-category', name: 'Categories/Update Category', element: CategoryCrud },
  { path: '/admin/inventory/create-sub-category', name: 'Categories/Create Sub Category', element: SubCategoryCrud },
  { path: '/admin/inventory/update-sub-category', name: 'Categories/Update Sub Category', element: SubCategoryCrud },
  { path: '/admin/inventory/create-child-category', name: 'Categories/Create Child Category', element: ChildCategoryCrud },
  { path: '/admin/inventory/update-child-category', name: 'Categories/Update Child Category', element: ChildCategoryCrud },
]

export default routes
