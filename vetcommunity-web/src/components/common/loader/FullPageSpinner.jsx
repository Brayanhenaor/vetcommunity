import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export const FullPageSpinner = () => {
    return (
        <div
            style={{
                position: "fixed",
                display: "flex",
                flexFlow: "column nowrap",
                alignItems: "center",
                justifyContent: "space-around",
                backgroundColor: 'rgba(201, 201, 201, 0.4)',
                backdropFilter: 'blur(8px)',
                top: "0px",
                left: "0px",
                width: "100%",
                height: "100%",
                zIndex: "2147483647",
                opacity: "1",
            }}
            sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </div>
    )
}
