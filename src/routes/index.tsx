import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { PrivateRoute } from '../layouts'

const Home = lazy(() => import('../views/Home'))

const AppRoutes = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        {/* Public Routes */}
        {/* <Route path="/" element={<Home />} />
         */}
        {/* private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
