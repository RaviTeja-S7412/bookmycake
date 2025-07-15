import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { CIcon } from '@coreui/icons-react';
import { cilEnvelopeLetter, cilPhone, cilUser, cilPencil } from '@coreui/icons';

import {
  CRow,
  CCol,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { useNavigate } from "react-router-dom";

const WidgetsDropdown = (props) => {

  const navigate = useNavigate();
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])

  // Helper function to format numbers with commas
  const formatNumber = (num) => {
    if (typeof num === 'number') {
      return num.toLocaleString()
    }
    if (!isNaN(num)) {
      return Number(num).toLocaleString()
    }
    return num
  }

  return (
    <div class="grid grid-cols-4 gap-3 font-[poppins]">
      <div className='shadow-sm p-4 cursor-pointer rounded-md bg-[#00ab92] text-white' onClick={() => navigate('/admin/users')} >
        <span className="bg-blue-100 text-blue-600 rounded-full p-2 inline-flex items-center justify-center shadow-sm">
          <CIcon icon={cilUser} size="xl" />
        </span>
        <span className='mt-3 ml-2 text-2xl font-semibold'>{formatNumber(props.data.total_users)}</span>
        <p className='text-xl mt-3 font-medium'>Users</p>
      </div>
      <div className='shadow-sm p-4 cursor-pointer rounded-md bg-[#d3b200] text-white' onClick={() => navigate('/admin/inventory/products')} >
        <span className="bg-blue-100 text-blue-600 rounded-full p-2 inline-flex items-center justify-center shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 10-8 0 4 4 0 008 0zm6 4v6M3 16v6" />
          </svg>
        </span>
        <span className='mt-3 ml-2 text-2xl font-semibold'>{formatNumber(props.data.total_products)}</span>
        <p className='text-xl mt-3 font-medium'>Products</p>
      </div>
      <div className='shadow-sm p-4 cursor-pointer rounded-md bg-[#d300a2] text-white' onClick={() => navigate('/admin/orders/all-orders')} >
        <span className="bg-blue-100 text-blue-600 rounded-full p-2 inline-flex items-center justify-center shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 10-8 0 4 4 0 008 0zm6 4v6M3 16v6" />
          </svg>
        </span>
        <span className='mt-3 ml-2 text-2xl font-semibold'>{formatNumber(props.data.total_orders)}</span>
        <p className='text-xl mt-3 font-medium'>Orders</p>
      </div>
      <div className='shadow-sm p-4 cursor-pointer rounded-md bg-[#3027db] text-white' onClick={() => navigate('/admin/orders/all-orders')} >
        <span className="bg-blue-100 text-blue-600 rounded-full p-2 inline-flex items-center justify-center shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 10-8 0 4 4 0 008 0zm6 4v6M3 16v6" />
          </svg>
        </span>
        <span className='mt-3 ml-2 text-2xl font-semibold'>{formatNumber(props.data.total_payments)}</span>
        <p className='text-xl mt-3 font-medium'>Payments</p>
      </div>
      <div className='shadow-sm p-4 cursor-pointer rounded-md bg-[#00bf63] text-white' onClick={() => navigate('/admin/inventory/categories')} >
        <span className="bg-blue-100 text-blue-600 rounded-full p-2 inline-flex items-center justify-center shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 10-8 0 4 4 0 008 0zm6 4v6M3 16v6" />
          </svg>
        </span>
        <span className='mt-3 ml-2 text-2xl font-semibold'>{formatNumber(props.data.total_categories)}</span>
        <p className='text-xl mt-3 font-medium'>Categories</p>
      </div>
      <div className='shadow-sm p-4 cursor-pointer rounded-md bg-[#bc4d5e] text-white' onClick={() => navigate('/admin/all-orders')} >
        <span className="bg-blue-100 text-blue-600 rounded-full p-2 inline-flex items-center justify-center shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 10-8 0 4 4 0 008 0zm6 4v6M3 16v6" />
          </svg>
        </span>
        <span className='mt-3 ml-2 text-2xl font-semibold'>{formatNumber(props.data.total_active_orders)}</span>
        <p className='text-xl mt-3 font-medium'>Active Orders</p>
      </div>
      <div className='shadow-sm p-4 cursor-pointer rounded-md bg-[#910f3f] text-white' onClick={() => navigate('/admin/all-orders')} >
        <span className="bg-blue-100 text-blue-600 rounded-full p-2 inline-flex items-center justify-center shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 10-8 0 4 4 0 008 0zm6 4v6M3 16v6" />
          </svg>
        </span>
        <span className='mt-3 ml-2 text-2xl font-semibold'>{formatNumber(props.data.total_orders)}</span>
        <p className='text-xl mt-3 font-medium'>Cancelled Orders</p>
      </div>
    </div>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
