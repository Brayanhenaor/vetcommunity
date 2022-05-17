import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'

export const Raking = ({ raking, handleAddSubtractRanking }) => {


    return (
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }} component='div'>
            <IconButton onClick={() => handleAddSubtractRanking(true)}>
                <FontAwesomeIcon icon={faCaretUp} />
            </IconButton>
            <Typography variant='h6'>{raking}</Typography>
            <IconButton onClick={() => handleAddSubtractRanking(false)}>
                <FontAwesomeIcon icon={faCaretDown} />
            </IconButton>
        </Box >
    )
}
