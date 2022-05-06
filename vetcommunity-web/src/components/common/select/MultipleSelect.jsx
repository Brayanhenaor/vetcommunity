import { Box, Chip, MenuItem, Select, styled } from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form';
import { color } from '../../../utils/color';

const StyledSelect = styled(Select)({
    minWidth: '100%',
    borderRadius: 15,
    '& .MuiSelect-select': {
        borderRadius: 15,
        border: 'none',
        backgroundColor: color.lightGray2,
        '& fieldset': {
            borderColor: 'red'
        },
        '&:hover fieldset': {
            borderColor: color.lightSecondary,
        },
        '&.Mui-focused fieldset': {
            borderColor: color.lightSecondary,
        },
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 0
    },
    '& .MuiChip-root': {
        backgroundColor: color.lightSecondary,
        color: color.primary
    }
});

export const MultipleSelect = ({ options = [], validations = {}, required, name }) => {
    const { register } = useFormContext();

    return (
        <StyledSelect
            multiple
            {...register(name, { required, ...validations })}
            defaultValue={[]}
            renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                        <Chip key={value} label={value} />
                    ))}
                </Box>
            )}
        >
            {options.map((option) => (
                <MenuItem
                    key={option.id}
                    value={option.name}
                >
                    {option.name}
                </MenuItem>
            ))}
        </StyledSelect>

    )
}
