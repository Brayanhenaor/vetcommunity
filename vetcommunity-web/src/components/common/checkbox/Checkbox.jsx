import { Checkbox as MCB } from '@mui/material'
import { Box, styled } from '@mui/system'
import { color } from '../../../utils/color';

const StyledCheckBox = styled(MCB)({
    color: color.secondary,
    
    transform:'scale(1.2)',
    '&.Mui-checked': {
        color: color.secondary,
    }
});

const Span = styled('span')({
    fontFamily: 'Roboto',
    fontSize: 16
});


export const Checkbox = ({ label, ...props }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center',mt:2 }}>
            <StyledCheckBox {...props} />
            {
                label && (
                    <Span>{label}</Span>
                )
            }
        </Box>
    )
}
