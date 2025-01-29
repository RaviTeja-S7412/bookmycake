import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSpinner } from '@coreui/react'
import './scss/style.scss'
import './scss/examples.scss'
import { ToastContainer } from 'react-toastify'
import { isUserLoggedIn } from './redux/actions/auth.actions'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const DefaultFrontLayout = React.lazy(() => import('./layout/DefaultFrontLayout'))

// Pages
const Login = React.lazy(() => import('./views/Login'))

const App = () => {

  const pathname = window.location.pathname;
  const uri = pathname.split('/')[1]; // Index 1 is the first segment

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
      // dispatch(get_departments());
      // dispatch(get_brands());
      // dispatch(get_hsncodes());
      // dispatch(get_cities());
      // dispatch(get_products());
      // dispatch(get_categories())
    }
  },[auth.authenticate]);
  
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
        <Route path="/" exact index name="Home" element={<DefaultFrontLayout />} />
        <Route exact path="/admin/login" name="Login Page" element={<Login />} />
        <Route path="*" name="Admin" element={auth.authenticate && uri == 'admin' ? <DefaultLayout /> : <DefaultFrontLayout />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
