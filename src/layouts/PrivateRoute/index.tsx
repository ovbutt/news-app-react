import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components'

const PrivateRoute = () => {
  return (
    <React.Fragment>
      <Header>
        <Outlet />
      </Header>
    </React.Fragment>
  )
}

export default PrivateRoute
