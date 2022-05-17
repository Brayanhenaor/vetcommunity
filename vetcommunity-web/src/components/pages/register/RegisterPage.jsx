import React from 'react'
import { useForm } from 'react-hook-form'
import { FormCardImage } from '../../common/form/FormCardImage'
import dog from '../../../img/dog.webp'
import { Grid, Typography } from '@mui/material'
import { postAsync } from '../../../api/apiService'
import { Input } from '../../common/input/Input'
import { Button } from '../../common/button/Button'
import { useNavigate } from 'react-router-dom'
import { route } from '../../../router/routes'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Checkbox } from '../../common/checkbox/Checkbox'
import { endpoints } from '../../../api/endpoint'
import { useLoading } from '../../../hooks/useLoading'
import { showSnack } from '../../../actions/ui'
import { useDispatch } from 'react-redux'
import { login } from '../../../actions/auth'

export const RegisterPage = () => {
    const navigate = useNavigate();
    const setLoading = useLoading();
    const methods = useForm();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        console.log("register data",data)

       if(data.password != data.confirmPassword)
         console.log("La contraseñas no coinciden");
       
       setLoading(true);
       const response = await postAsync(endpoints.register, data);
       setLoading(false);
   
       dispatch(showSnack(response.success ? 'Registro de usuario exitoso' : response.message, response.success ? 'success' : 'error'));
   
       if (response.success)
         dispatch(login(response.result));
   
       console.log(response)
    }

    return (
        <FormCardImage methods={methods} onSubmit={onSubmit} image={dog}>
            <Grid item xs={12} sx={{ mb: 4 }}>
                <Typography variant='h3' sx={{ fontWeight: 'bold' }}>Hola✌️</Typography>
                <span>Completa todos los datos para crear tu usuario</span>
            </Grid>

            <Grid item xs={12}>
                <Input
                    name="fullName"
                    label="Nombre completo" />
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
                <Input
                    name="confirmPassword"
                    type="password"
                    label="Confirmar contraseña" />
            </Grid>

            <Grid item xs={12}>
                <Checkbox label="Soy veterinario" name="isVeterinary"/>
            </Grid>

            <Grid item xs={12}>
                <Button type="submit">Registrarse</Button>
            </Grid>

            <Grid item xs={12}>
                <Button outlined startIcon={<ArrowBackIcon />} onClick={() => navigate(route.login)}>Iniciar sesión</Button>
            </Grid>
        </FormCardImage>
    )
}
