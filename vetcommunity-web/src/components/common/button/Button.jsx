import styled from '@emotion/styled'
import { Button as MB } from '@mui/material'
import React from 'react'
import { color } from '../../../utils/color';

const StyledButton = styled(MB)(({ style })=> ({
    marginTop: '10px',
    width: '100%',
    color: color.primary,
    height: '3rem',
    backgroundColor: color.secondary,
    '&:hover': {
        backgroundColor: color.lightSecondary
    },
    ...style
}));

export const Button = ({ ...props }) => {
    return (
        <StyledButton variant='contained' {...props} />
    )
}
