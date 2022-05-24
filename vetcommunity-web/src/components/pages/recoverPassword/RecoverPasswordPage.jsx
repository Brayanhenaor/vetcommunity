import { Container, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { FormCardImage } from '../../common/form/FormCardImage'
import password from '../../../img/password.webp';
import { useForm } from 'react-hook-form';
import OtpInput from 'react-otp-input';
import { Input } from '../../common/input/Input';
import { Button } from '../../common/button/Button';
import { useLoading } from '../../../hooks/useLoading';
import { getAsync, postAsync } from '../../../api/apiService';
import { endpoints } from '../../../api/endpoint';
import { color } from '../../../utils/color';
import { useDispatch } from 'react-redux';
import { showSnack } from '../../../actions/ui';

export const RecoverPasswordPage = () => {
    const [hasOtp, setHasOtp] = useState(false);
    const [validOtp, setValidOtp] = useState(false);
    const [otp, setOtp] = useState("");
    const setLoading = useLoading();
    const dispatch = useDispatch();
    const methods = useForm();
    const { getValues } = methods;

    const onSubmit = async ({ email }) => {
        setLoading(true);
        const response = await getAsync(`${endpoints.getOtp}?Email=${email}`);
        setLoading(false);

        if (response.success) {
            setHasOtp(true);
            return;
        }

        dispatch(showSnack(response.message, 'error'));
    }

    const handleChangeOtp = (otp) => {
        console.log(otp);
        setOtp(otp);

        if (otp.length === 6)
            handleValidateOtp(otp);

    };

    const handleValidateOtp = async (otp) => {
        setLoading(true);
        const response = await postAsync(endpoints.validateOtp, { email: getValues("email"), otp });
        setLoading(false);

        if (response.success)
            setValidOtp(true);
        console.log(response);
    }


    return (
        <FormCardImage methods={methods} onSubmit={onSubmit} image={password}>
            <Grid item xs={12} sx={{ mb: 4 }}>
                <Typography variant='h4' sx={{ fontWeight: 'bold' }}>Recupera tu clave</Typography>
                <span>Ingresa tu email y sigue los pasos</span>
                <hr />
            </Grid>
            {
                !hasOtp && (
                    <>
                        <Grid item xs={12} sx={{ mb: 1 }}>
                            <Input
                                name="email"
                                label="Email" />
                        </Grid>
                        <Grid item xs={12} sx={{ mb: 2 }}>
                            <Button
                                type="submit">
                                Solicitar codigo
                            </Button>
                        </Grid>
                    </>
                )
            }
            {
                (hasOtp && !validOtp) && (
                    <>
                        <Grid item container justifyContent="center" xs={12} sx={{ mb: 1 }}>
                            <span
                                style={{
                                    fontFamily: "Raleway",
                                }}
                            >Ingresa el codigo que se te envio a tu email</span>
                        </Grid>
                        <Grid item xs={12}>
                            <OtpInput
                                onChange={handleChangeOtp}
                                value={otp}
                                separator=" "
                                containerStyle={{
                                    display: 'flex',
                                    gap: 6,
                                    flexWrap: 'wrap',
                                    justifyContent: 'center'
                                }}
                                numInputs={6}
                                inputStyle={{
                                    fontFamily: "Raleway",
                                    fontSize: 19,
                                    color: color.gray,
                                    width: '40px',
                                    height: '40px',
                                }}
                                isInputNum={true} />
                        </Grid>
                    </>
                )
            }
            {
                validOtp && (
                    <>
                        <Grid item xs={12}>
                            <Input
                                label="Nueva Contraseña"
                                name="password" />
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                label="Confirmar Contraseña"
                                name="password" />
                        </Grid>
                        <Grid item xs={12}>
                            <Button>Guardar</Button>
                        </Grid>
                    </>
                )
            }
        </FormCardImage >
    )
}
