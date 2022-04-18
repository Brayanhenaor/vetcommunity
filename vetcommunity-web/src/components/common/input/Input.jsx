import { Input as MInput, TextField } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'
import { color } from '../../../utils/color';

const StyledInput = styled(TextField)({
    width:'100%',
    marginTop:'10px',
    '& label.Mui-focused': {
        color: color.secondary,
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: color.secondary,
        },
        '&:hover fieldset': {
            borderColor: color.lightSecondary,
        },
        '&.Mui-focused fieldset': {
            borderColor: color.lightSecondary,
        },
    },
});

export const Input = ({ variant = "outlined", ...props }) => {
    return (
        <StyledInput variant={variant} {...props}/>
    )
}
