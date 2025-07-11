import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

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
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={4} xxl={3} className='cursor-pointer' onClick={() => navigate('/admin/users')}>
        <CWidgetStatsA
          color="primary"
          value={
            <>
              {formatNumber(props.data.total_users)}
            </>
          }
          title="Users"
          style={{ height: '150px' }}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3} className='cursor-pointer' onClick={() => navigate('/admin/inventory/products')}>
        <CWidgetStatsA
          color="info"
          value={
            <>
              {formatNumber(props.data.total_products)}
            </>
          }
          title="Products"
          style={{ height: '150px' }}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3} className='cursor-pointer' onClick={() => navigate('/admin/orders/all-orders')}>
        <CWidgetStatsA
          color="warning"
          value={
            <>
              {formatNumber(props.data.total_orders)}
            </>
          }
          title="Orders"
          style={{ height: '150px' }}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3} className='cursor-pointer' onClick={() => navigate('/admin/orders/all-orders')}>
        <CWidgetStatsA
          color="success"
          value={
            <>
              {formatNumber(props.data.total_payments)}
            </>
          }
          style={{ height: '150px' }}
          title="Payments"
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3} className='cursor-pointer' onClick={() => navigate('/admin/inventory/categories')}>
        <CWidgetStatsA
          color="dark"
          value={
            <>
              {formatNumber(props.data.total_categories)}
            </>
          }
          title="Categories"
          style={{ height: '150px' }}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3} className='cursor-pointer' onClick={() => navigate('/admin/orders/all-orders')}>
        <CWidgetStatsA
          color="secondary"
          value={
            <>
              {formatNumber(props.data.total_active_orders)}
            </>
          }
          title="Active Orders"
          style={{ height: '150px' }}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3} className='cursor-pointer' onClick={() => navigate('/admin/orders/all-orders')}>
        <CWidgetStatsA
          color="danger"
          value={
            <>
              {formatNumber(props.data.total_orders)}
            </>
          }
          title="Cancelled Orders"
          style={{ height: '150px' }}
        />
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
