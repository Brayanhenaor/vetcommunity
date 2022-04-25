import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { color } from '../../../utils/color'

export const Spinner = ({ loading }) => {
    return (
        <>
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress sx={{ color: color.secondary }} />
                </Box>
            )}
        </>
    )
}
