import { Input as MInput, TextField } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'
import { useFormContext } from 'react-hook-form';
import { color } from '../../../utils/color';

const StyledInput = styled(TextField)(({ style }) => ({
    width: '100%',
    marginTop: '14px',
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
    ...style
}));

export const Input = ({ ref, variant = "outlined", name, validations, ...props }) => {
    const { register } = useFormContext();

    return (
        <StyledInput
            {...register(name, validations)}
            variant={variant}
            {...props} />
    )
}
