import { Avatar, Card } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Button } from '../../common/button/Button'
import SendIcon from '@mui/icons-material/Send';
import { FormProvider, useForm } from 'react-hook-form';
import { BasicInput } from '../../common/input/BasicInput';
import { MultipleSelect } from '../../common/select/MultipleSelect';
import { useFetch } from '../../../hooks/useFetch';
import { endpoints } from '../../../api/endpoint';
import { useLoading } from '../../../hooks/useLoading';
import { postAsync } from '../../../api/apiService';


export const CreateQuestion = () => {
    const [editing, setEditing] = useState(false);
    const { data: categories } = useFetch(endpoints.categories);
    const setLoading = useLoading();

    useEffect(() => {
        console.log(categories);
    }, [categories])

    const methods = useForm();

    const handleChangeEditing = () => {
        setEditing(!editing);
    }

    const handleSubmit = async (data) => {
        console.log(data);

        console.log({
            ...data,
            categories: data.categories.map(category => ({ id: categories.result.find(c => c.name === category).id }))
        });

        setLoading(true);
        
        const response = await postAsync(endpoints.addPosts, {
            ...data,
            categories: data.categories.map(category => ({ id: categories.result.find(c => c.name === category).id }))
        });
        
        setLoading(false);
        console.log(response);
    }

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
                            <form onSubmit={methods.handleSubmit(handleSubmit)} style={{ width: '100%' }}>
                                <Box className="animate__animated animate__fadeIn" style={{ width: '100%', display: 'flex', gap: '10px', flexDirection: 'row', flexWrap: 'wrap', marginLeft: 5 }}>
                                    <Box sx={{ 'flexBasis': '100%' }}>
                                        <BasicInput
                                            label="Titulo"
                                            required
                                            style={{ marginTop: 0 }}
                                            name="title" />
                                    </Box>
                                    <Box sx={{ 'flexBasis': '100%' }}>
                                        <BasicInput
                                            label="Mensaje"
                                            rows={3}
                                            multiline
                                            required
                                            name="message" />
                                    </Box>
                                    <MultipleSelect
                                        name="categories"
                                        options={categories?.result} />
                                    <Box sx={{ 'flexBasis': '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button style={{ height: '2rem', marginTop: 0, width: 'auto', marginRight: 10 }} onClick={handleChangeEditing} outlined>Cancelar</Button>
                                        <Button style={{ height: '2rem', marginTop: 0, width: 'auto' }} type="submit" endIcon={<SendIcon />} >Publicar</Button>

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
