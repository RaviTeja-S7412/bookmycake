import React from 'react'

// admin
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Login = React.lazy(() => import('./views/Login'));
const Users = React.lazy(() => import('./views/users'));
const Products = React.lazy(() => import('./views/inventory/products'));
const Categories = React.lazy(() => import('./views/inventory/categories'));
const CategoryCrud = React.lazy(() => import('./views/inventory/categories/crud'));

const routes = [
  { path: '/admin/login', exact: true, name: 'Home', element: Login },
  { path: '/admin/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/admin/users', name: 'Users', element: Users },
  { path: '/admin/inventory/products', name: 'Products', element: Products },
  { path: '/admin/inventory/categories', name: 'Categories', element: Categories },
  { path: '/admin/inventory/create-category', name: 'Categories/Create Category', element: CategoryCrud },
  { path: '/admin/inventory/update-category/:id', name: 'Update Category', element: CategoryCrud },
]

export default routes
