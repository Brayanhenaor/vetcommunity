import { Grid, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../../actions/auth'
import { showSnack } from '../../../actions/ui'
import { postAsync } from '../../../api/apiService'
import { endpoints } from '../../../api/endpoint'
import { useLoading } from '../../../hooks/useLoading'
import pets from '../../../img/pets.webp'
import { route } from '../../../router/routes'
import { color } from '../../../utils/color'
import { Button } from '../../common/button/Button'
import { OutlinedButton } from '../../common/button/OutlinedButton'
import { FormCardImage } from '../../common/form/FormCardImage'
import { Input } from '../../common/input/Input'

export const LoginPage = () => {
  const methods = useForm();
  const setLoading = useLoading();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setLoading(true);
    const response = await postAsync(endpoints.login, data);
    setLoading(false);

    dispatch(showSnack(response.success ? 'Inicio de sesión exitoso' : response.message, response.success ? 'success' : 'error'));

    if (response.success)
      dispatch(login(response.result));

    console.log(response)
  }

  return (
    <FormCardImage methods={methods} onSubmit={onSubmit} image={pets}>
      <Grid item xs={12} sx={{ mb: 4 }}>
        <Typography variant='h3' sx={{ fontWeight: 'bold' }}>Hola✌️</Typography>
        <span>Inicia sesión para interactuar con otros usuarios</span>
      </Grid>

      <Grid item xs={12}>
        <Input
          type="email"
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
        <OutlinedButton onClick={() => navigate(route.register)}>Registrate</OutlinedButton>
      </Grid>

      <Grid container justifyContent={'center'} item xs={12}>
        <span style={{ marginTop: '15px', cursor: 'pointer', color: color.secondary }}>¿Olvidaste tu contraseña?</span>
      </Grid>
    </FormCardImage>
  )
}
