import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CSpinner } from '@coreui/react'

// routes config
import front_routes from '../../front_routes'
import Spinner from '../../components/front/Spinner';

const FrontContent = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {front_routes.map((route, idx) => {
          return (
            route.element && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                element={<route.element />}
              />
            )
          )
        })}
      </Routes>
    </Suspense>
  )
}

export default React.memo(FrontContent)
