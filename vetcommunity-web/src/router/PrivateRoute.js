import React, { memo } from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Navbar } from '../components/common/navbar/NavBar';
import { route } from './routes';

export const PrivateRouter = memo(({ isLogued, navBar = true, component: Component, menu, ...rest }) => {
  return (
    (isLogued) ?
      <>
        {
          navBar && (
            <Navbar />
          )
        }
        <Component />
      </>
      : <Navigate to={route.home} />
  )
});

PrivateRouter.propTypes = {
  isLogued: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired
}