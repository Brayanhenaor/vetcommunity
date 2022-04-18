import { Card, CardContent, Container, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../../../actions/auth'
import { showSnack } from '../../../actions/ui'
import { getAsync, postAsync } from '../../../api/apiService'
import { endpoints } from '../../../api/endpoint'
import { useLoading } from '../../../hooks/useLoading'
import pets from '../../../img/pets.webp'
import { color } from '../../../utils/color'
import { type } from '../../../utils/types'
import { Button } from '../../common/button/Button'
import { OutlinedButton } from '../../common/button/OutlinedButton'
import { Input } from '../../common/input/Input'

export const LoginPage = () => {
  const methods = useForm();
  const setLoading = useLoading();

  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    console.log(data);
    const response = await postAsync(endpoints.login, data);

    dispatch(showSnack(response.success ? 'Inicio de sesión exitoso' : response.message, response.success ? 'success' : 'error'));

    if(response.success)
      dispatch(login(response.result));

    console.log(response)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Box sx={{ bgcolor: color.lightSecondary, minHeight: '100vh' }}>
          <Grid container alignItems={'center'} sx={{ bgcolor: color.lightSecondary, minHeight: '100vh' }} justifyContent={'center'}>
            <Card sx={{ width: '80%', borderRadius: '20px', maxWidth: '95%' }}>
              <Grid container>
                <Grid container justifyContent={'center'} alignItems='center' sx={{ padding: 5 }} item md={6}>
                  <Grid container>
                    <Grid item xs={12} sx={{ mb: 4 }}>
                      <Typography variant='h3' sx={{ fontWeight: 'bold' }}>Hola✌️</Typography>
                      <span>Inicia sesión para interactuar con otros usuarios</span>
                    </Grid>

                    <Grid item xs={12}>
                      <Input
                        name="email"
                        label="E-mail" />
                    </Grid>
                    <Grid item xs={12}>
                      <Input
                        name="password"
                        type="password"
                        label="Contraseña" />
                    </Grid>

                    <Grid item xs={12}>
                      <Button type="submit">Iniciar sesión</Button>
                    </Grid>

                    <Grid item xs={12}>
                      <OutlinedButton>Registrate</OutlinedButton>
                    </Grid>

                    <Grid container justifyContent={'center'} item xs={12}>
                      <span style={{ marginTop: '15px', cursor: 'pointer', color: color.secondary }}>¿Olvidaste tu contraseña?</span>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container item md={6} sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <img src={pets} alt="pets" style={{ objectFit: 'cover', maxHeight: '80vh' }} />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Box>
      </form>
    </FormProvider>
  )
}
