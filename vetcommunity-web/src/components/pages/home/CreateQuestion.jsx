import { Avatar, Card, IconButton } from '@mui/material'
import { Box, styled } from '@mui/system'
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
import { useDispatch } from 'react-redux';
import { showSnack } from '../../../actions/ui';
import { color } from '../../../utils/color';
import CloseIcon from '@mui/icons-material/Close';

const SendButton = styled(IconButton)({
    color: color.primary,
    backgroundColor: color.secondary,
    '&:hover': {
        backgroundColor: color.lightSecondary2,
    }
});

const CancelButton = styled(IconButton)({
    color: color.primary,
    backgroundColor: color.red,
    marginRight: 10,
    '&:hover': {
        backgroundColor: color.ligthRed,
    }
});

export const CreateQuestion = () => {
    const [editing, setEditing] = useState(false);
    const { data: categories } = useFetch(endpoints.categories);
    const setLoading = useLoading();

    const methods = useForm();
    const { reset } = methods;

    const handleChangeEditing = () => {
        setEditing(!editing);
    }

    const dispatch = useDispatch();

    const handleSubmit = async (data) => {
        setLoading(true);

        const response = await postAsync(endpoints.addPosts, {
            ...data,
            categories: data.categories.map(category => ({ id: categories.result.find(c => c.name === category).id }))
        });

        setLoading(false);

        if (!response.success) {
            dispatch(showSnack(response.message, 'error'));
            return;
        }

        reset();
        handleChangeEditing();
    }

    return (
        <div>
            <Card
                sx={{
                    p: 2,
                    borderRadius: 3,
                    mr: { xs: 5, sm: 12 },
                    ml: { xs: 5, sm: 12 },
                    display: 'flex',
                    alignItems: editing ? 'start' : 'center'
                }} elevation={0}>
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
                                        <CancelButton
                                            onClick={handleChangeEditing}>
                                            <CloseIcon />
                                        </CancelButton>
                                        <SendButton
                                        type="submit">
                                            <SendIcon />
                                        </SendButton>

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
