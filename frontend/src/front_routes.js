import React from 'react'

//frontend
const Home = React.lazy(() => import('./views/front/Home'));
const Services = React.lazy(() => import('./views/front/Services'));
const AllProducts = React.lazy(() => import('./views/front/Products'));
const ProductSingle = React.lazy(() => import('./views/front/ProductSingle'));
const Props = React.lazy(() => import('./views/front/Props'));
const Cart = React.lazy(() => import('./views/front/Cart'));
const Login = React.lazy(() => import('./views/front/Login'));
const ForgotPassword = React.lazy(() => import('./views/front/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./views/front/ResetPassword'));
const Register = React.lazy(() => import('./views/front/Register'));
const Profile = React.lazy(() => import('./views/front/Profile'));
const Checkout = React.lazy(() => import('./views/front/Checkout'));
const OrderStatus = React.lazy(() => import('./views/front/OrderStatus'));
const Policy = React.lazy(() => import('./views/front/Policy'));
const Contact = React.lazy(() => import('./views/front/Contact'));
const Terms = React.lazy(() => import('./views/front/Terms'));
const PrivacyPolicy = React.lazy(() => import('./views/front/PrivacyPolicy'));
const Careers = React.lazy(() => import('./views/front/Careers'));
const OurStory = React.lazy(() => import('./views/front/OurStory'));
const Location = React.lazy(() => import('./views/front/Location'));
const CustomerGriviance = React.lazy(() => import('./views/front/CustomerGriviance'));
const Faq = React.lazy(() => import('./views/front/Faq'));
const Blog = React.lazy(() => import('./views/front/Blog'));
const Media = React.lazy(() => import('./views/front/Media'));

const front_routes = [
  { path: '/', exact: true, name: 'Home', element: Home },
  { path: '/collections', exact: true, name: 'Products', element: AllProducts },
  { path: '/collections/shop-all', exact: true, name: 'Products', element: AllProducts },
  { path: '/collections/:category_id', exact: true, name: 'Products', element: AllProducts },
  { path: '/collections/:category_id/:sub_category_id', exact: true, name: 'Products', element: AllProducts },
  { path: '/products/:product_id', exact: true, name: 'Products', element: ProductSingle },
  { path: '/props', exact: true, name: 'Props', element: Props },
  {path: '/cart', exact: true, name: 'Cart', element: Cart},
  {path: '/checkout', exact: true, name: 'Checkout', element: Checkout},
  {path: '/login', exact: true, name: 'Login', element: Login},
  {path: '/sign-up', exact: true, name: 'Register', element: Register},
  {path: '/my-profile', exact: true, name: 'Profile', element: Profile},
  {path: '/order-status/:order_id', exact: true, name: 'Profile', element: OrderStatus},
  {path: '/forgot-password', exact: true, name: 'Forgot Password', element: ForgotPassword},
  {path: '/reset-password', exact: true, name: 'Forgot Password', element: ResetPassword},
  {path: '/cancellation-and-refund-policy', exact: true, name: 'Policy', element: Policy},
  {path: '/contact', exact: true, name: 'Policy', element: Contact},
  {path: '/terms-and-conditions', exact: true, name: 'terms', element: Terms},
  {path: '/privacy-policy', exact: true, name: 'privacy policy', element: PrivacyPolicy},
  {path: '/careers', exact: true, name: 'Careers', element: Careers},
  {path: '/our-story', exact: true, name: 'Our Story', element: OurStory},
  {path: '/location', exact: true, name: 'Location', element: Location},
  {path: '/blog', exact: true, name: 'Blog', element: Blog},
  {path: '/media', exact: true, name: 'Media', element: Media},
  {path: '/customer-griviance', exact: true, name: 'Customer Griviance', element: CustomerGriviance},
  {path: '/faq', exact: true, name: 'FAQ', element: Faq},
]

export default front_routes
