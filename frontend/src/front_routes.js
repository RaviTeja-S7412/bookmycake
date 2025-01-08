import React from 'react'

//frontend
const Home = React.lazy(() => import('./views/front/Home'));
const Services = React.lazy(() => import('./views/front/Services'));

const front_routes = [
  { path: '/', exact: true, name: 'Home', element: Home },
  { path: '/services', exact: true, name: 'Services', element: Services },
]

export default front_routes
