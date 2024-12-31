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
    badge: {
      color: 'info',
      text: 'NEW',
    },
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
      }
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
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Pending Orders',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Cancelled Orders',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Success Orders',
        to: '/base/breadcrumbs',
      }
    ],
  },
  {
    component: CNavItem,
    name: 'Payments',
    to: '/theme/colors',
    icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
  }
]

export default _nav
