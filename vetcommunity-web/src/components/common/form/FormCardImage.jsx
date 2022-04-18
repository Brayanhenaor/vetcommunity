import { Card, Grid } from '@mui/material'
import { Box, styled } from '@mui/system'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import { color } from '../../../utils/color'

const StyledCard = styled(Card)({
    width: '80%',
    borderRadius: '20px',
    maxWidth: '95%',
    overflow: 'scroll',
    maxHeight: '80vh',
    '&::-webkit-scrollbar':{
        display:'none'
    }
});
export const FormCardImage = ({ methods, onSubmit, image, children }) => {
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Box sx={{ bgcolor: color.lightSecondary, minHeight: '100vh' }}>
                    <Grid container alignItems={'center'} sx={{ bgcolor: color.lightSecondary, minHeight: '100vh' }} justifyContent={'center'}>
                        <StyledCard>
                            <Grid container>
                                <Grid container justifyContent={'center'} alignItems='center' sx={{ padding: 5 }} item md={6}>
                                    <Grid container>
                                        {children}
                                    </Grid>
                                </Grid>
                                <Grid container item md={6} sx={{ display: { xs: 'none', md: 'flex' } }}>
                                    <img src={image} alt="pets" style={{ objectFit: 'cover', maxWidth: '100%', minHeight: '70vh' }} />
                                </Grid>
                            </Grid>
                        </StyledCard>
                    </Grid>
                </Box>
            </form>
        </FormProvider>
    )
}
