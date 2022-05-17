import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { color } from '../../../utils/color'

export const Spinner = ({ loading }) => {
    return (
        <>
            {loading && (
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress sx={{ color: color.secondary }} />
                    <span>Cargando...</span>
                </Box>
            )}
        </>
    )
}
