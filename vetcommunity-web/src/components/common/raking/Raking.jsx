import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'

export const Raking = ({raking}) => {
    return (
        <Box sx={{ display: 'flex', alignItems:'center', flexDirection: 'column' }} component='div'>
            <IconButton>
                <FontAwesomeIcon icon={faCaretUp} />
            </IconButton>
            <Typography variant='h6'>{raking}</Typography>
            <IconButton>
                <FontAwesomeIcon icon={faCaretDown} />
            </IconButton>
        </Box>
    )
}
