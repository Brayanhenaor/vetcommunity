import styled from '@emotion/styled'
import { Button as MB } from '@mui/material'
import React from 'react'
import { color } from '../../../utils/color';

const StyledButton = styled(MB)({
    marginTop: '10px',
    width: '100%',
    color: color.secondary,
    height: '3rem',
    borderColor: color.secondary,
    '&:hover': {
        borderColor: color.secondary
    }
});

export const OutlinedButton = ({ ...props }) => {
    return (
        <StyledButton variant='outlined' {...props} />
    )
}
