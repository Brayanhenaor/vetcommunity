import { Avatar, Card } from '@mui/material'
import { Box } from '@mui/system'
import React, { useRef, useState } from 'react'
import { Button } from '../../common/button/Button'
import SendIcon from '@mui/icons-material/Send';
import { FormProvider, useForm } from 'react-hook-form';
import { OutlinedButton } from '../../common/button/OutlinedButton';
import { BasicInput } from '../../common/input/BasicInput';

export const CreateQuestion = () => {
    const [editing, setEditing] = useState(false);
    const methods = useForm();

    const handleChangeEditing = () => {
        setEditing(!editing);
    }

    const titleRef = useRef(null);

    return (
        <div>
            <Card sx={{ p: 2, borderRadius: 3, mr: { xs: 5, sm: 12 }, ml: { xs: 5, sm: 12 }, display: 'flex', alignItems: editing ? 'start' : 'center' }} elevation={2}>
                <Avatar alt="Brayan" style={{ cursor: 'pointer' }} src="https://caricom.org/wp-content/uploads/Floyd-Morris-Remake-1024x879-1.jpg" />
                {
                    !editing ? (
                        <Box className="animate__animated animate__fadeIn" sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <span
                                onClick={handleChangeEditing}
                                style={{
                                    marginLeft: 20,
                                    fontFamily: 'Open Sans',
                                    width: '100%',
                                    cursor: 'text'
                                }}>
                                ¿Qué duda tienes?
                            </span>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Button style={{ height: '1.8rem', marginTop: 0 }} endIcon={<SendIcon />} disabled>Publicar</Button>
                            </Box>
                        </Box>
                    ) : (
                        <FormProvider {...methods}>
                            <form style={{ width: '100%' }}>
                                <Box className="animate__animated animate__fadeIn" style={{ width: '100%', display: 'flex', gap:'10px', flexDirection: 'row', flexWrap: 'wrap', marginLeft: 5 }}>
                                    <Box sx={{ 'flexBasis': '100%' }}>
                                        <BasicInput
                                            label="Titulo"
                                            variant="filled"
                                            style={{ marginTop: 0 }}
                                            name="title" />
                                    </Box>
                                    <Box sx={{ 'flexBasis': '100%' }}>
                                        <BasicInput
                                            label="Mensaje"
                                            rows={3}
                                            multiline
                                            variant="filled"
                                            name="message" />
                                    </Box>
                                    <Box sx={{ 'flexBasis': '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                        <OutlinedButton style={{ height: '2rem', marginTop: 0, width: 'auto', marginRight: 10 }} onClick={handleChangeEditing}>Cancelar</OutlinedButton>
                                        <Button style={{ height: '2rem', marginTop: 0, width: 'auto' }} type="submit" endIcon={<SendIcon />} disabled>Publicar</Button>

                                    </Box>
                                </Box>
                            </form>
                        </FormProvider>
                    )
                }
            </Card>
        </div>
    )
}
