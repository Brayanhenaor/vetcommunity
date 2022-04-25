import { Input as MInput, InputBase, TextField } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'
import { useFormContext } from 'react-hook-form';
import { color } from '../../../utils/color';

const StyledInput = styled(InputBase)(({ style }) => ({
    width: '100%',
    backgroundColor:color.lightGray2,
    padding:10,
    borderRadius:15,
    color:color.gray,
    ...style
}));

export const BasicInput = ({ ref, label, variant = "outlined", name, validations, ...props }) => {
    const { register } = useFormContext();

    return (
        <StyledInput
            placeholder={label}
            {...register(name, validations)}
            variant={variant}
            {...props} />
    )
}
