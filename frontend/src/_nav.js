import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDollar,
  cilPuzzle,
  cilSpeedometer,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    /* badge: {
      color: 'info',
      text: 'NEW',
    }, */
  },
  /* {
    component: CNavTitle,
    name: 'Theme',
  }, */
  {
    component: CNavItem,
    name: 'Users',
    to: '/admin/users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Inventory',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Products',
        to: '/admin/inventory/products',
      },
      {
        component: CNavItem,
        name: 'Categories',
        to: '/admin/inventory/categories',
      },
      {
        component: CNavItem,
        name: 'Props',
        to: '/admin/settings/props',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Communications',
    to: '/base',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Contact Queries',
        to: '/admin/enquires',
      },
      {
        component: CNavItem,
        name: 'Customer Grievances',
        to: '/admin/customer-grievances',
      },
      {
        component: CNavItem,
        name: 'Subscribers',
        to: '/admin/subscribers',
      },
      {
        component: CNavItem,
        name: 'Job Applications',
        to: '/admin/job-applications',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Orders',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Today Orders',
        to: '/admin/orders/today-orders',
      },
      {
        component: CNavItem,
        name: 'All Orders',
        to: '/admin/orders/all-orders',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Settings',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Banners',
        to: '/admin/settings/banners',
      },
      {
        component: CNavItem,
        name: 'Cities',
        to: '/admin/settings/cities',
      },
      {
        component: CNavItem,
        name: 'Areas',
        to: '/admin/settings/areas',
      }
      // {
      //   component: CNavItem,
      //   name: 'PinCodes',
      //   to: '/admin/settings/pincodes',
      // }
    ],
  },
]

export default _nav
