import { element, exact } from 'prop-types';
import React from 'react'

//frontend
const Home = React.lazy(() => import('./views/front/Home'));
const Services = React.lazy(() => import('./views/front/Services'));
const Collections = React.lazy(()=>import('./views/front/Collection'))

const front_routes = [
  { path: '/', exact: true, name: 'Home', element: Home },
  { path: '/services', exact: true, name: 'Services', element: Services },
  {path:'/collections',exact:true,name:"Collections",element:Collections}
]

export default front_routes
