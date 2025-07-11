import React, { useEffect, useState } from 'react'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import axiosIntance from '../../components/axios';
import Spinner from '../../components/front/Spinner';

const Dashboard = () => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const getDashboarddata = async () => {
      setLoading(true);
      try {
      const res = await axiosIntance.get(`/admin/get_dashboarddata`);
      if (res.status === 200) {
        setData(res.data.dashboard_data);
      } else {
        setData({});
      }
      } catch (error) {
      // console.error('Error fetching product:', error);
      // Handle API error
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
    getDashboarddata();
  }, []);

  return (
    <>
      {loading ? <Spinner /> :
        <WidgetsDropdown className="mb-4" data={data} />
      }
    </>
  )
}

export default Dashboard
