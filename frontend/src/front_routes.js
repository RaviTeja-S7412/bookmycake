import React from 'react'

//frontend
const Home = React.lazy(() => import('./views/front/Home'));
const Services = React.lazy(() => import('./views/front/Services'));
const AllProducts = React.lazy(() => import('./views/front/Products'));
const ProductSingle = React.lazy(() => import('./views/front/ProductSingle'));
const Props = React.lazy(() => import('./views/front/props'));
const Cart = React.lazy(() => import('./views/front/cart'));
const Login = React.lazy(() => import('./views/front/Login'));
const Register = React.lazy(() => import('./views/front/Register'));
const Profile = React.lazy(() => import('./views/front/profile'));

const front_routes = [
  { path: '/', exact: true, name: 'Home', element: Home },
  { path: '/collections/:category_id', exact: true, name: 'Products', element: AllProducts },
  { path: '/collections/:category_id/:sub_category_id', exact: true, name: 'Products', element: AllProducts },
  { path: '/products/:product_id', exact: true, name: 'Products', element: ProductSingle },
  { path: '/props', exact: true, name: 'Props', element: Props },
  {path: '/cart', exact: true, name: 'Cart', element: Cart},
  {path: '/login', exact: true, name: 'Login', element: Login},
  {path: '/register', exact: true, name: 'Register', element: Register},
  {path: '/profile', exact: true, name: 'Profile', element: Profile},
]

export default front_routes
