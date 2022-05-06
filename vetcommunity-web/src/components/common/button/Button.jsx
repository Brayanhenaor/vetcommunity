import styled from '@emotion/styled'
import { Button as MB } from '@mui/material'
import React from 'react'
import { color } from '../../../utils/color';

const outlinedStyle = {
    marginTop: '10px',
    width: '100%',
    color: color.secondary,
    height: '3rem',
    borderColor: color.secondary,
    '&:hover': {
        borderColor: color.secondary
    }
}

const containedStyle = {
    marginTop: '10px',
    width: '100%',
    color: color.primary,
    height: '3rem',
    backgroundColor: color.secondary,
    '&:hover': {
        backgroundColor: color.lightSecondary
    }
}
const StyledButton = styled(MB, {
    shouldForwardProp: (prop) => prop !== "outlined"
})(({ style, outlined }) => ({
    ...(outlined ? outlinedStyle : containedStyle),
    ...style
}));

export const Button = ({ outlined, ...props }) => {
    return (
        <StyledButton outlined={outlined} variant={outlined ? 'outlined' : 'contained'} {...props} />
    )
}
