import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import { Navbar } from '../components/common/navbar/NavBar';
import { route } from './routes';
import { Box } from '@mui/material';


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

        <Box component='main' sx={{ mb: {xs:8, md: 0 } }}>
          <Component />
        </Box>

      </div>
  )
};

PublicRoute.propTypes = {
  isLogued: PropTypes.bool,
  component: PropTypes.func.isRequired
}
