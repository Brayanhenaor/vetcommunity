import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import { Navbar } from '../components/common/navbar/NavBar';
import { route } from './routes';

export const PublicRoute = ({ isLogued, restricted, navBar = true, footer = true, component: Component }) => {
  return (
    (isLogued && restricted) ?
      <Navigate to={route.home} />
      :
      <div>
        {
          navBar && (
            <Navbar />
          )
        }

        <main>

          <Component />
        </main>
        
      </div>
  )
};

PublicRoute.propTypes = {
  isLogued: PropTypes.bool,
  component: PropTypes.func.isRequired
}
