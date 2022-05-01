import { Avatar, Box, Grid } from '@mui/material'
import { styled } from '@mui/system';
import React, { useState } from 'react'
import { color } from '../../../utils/color'
import { Raking } from '../raking/Raking'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';
import 'moment/locale/es';
import { BasicInput } from '../input/BasicInput';
import SendIcon from '@mui/icons-material/Send';
import { FormProvider, useForm } from 'react-hook-form';
import { Spinner } from '../loader/Spinner';
import { getAsync, postAsync } from '../../../api/apiService';
import { endpoints } from '../../../api/endpoint';
import shortid from 'shortid';
import { capitalize } from 'lodash'
import { Comment } from './Comment';

const Name = styled('h5')({
    margin: 0,
    padding: 0,
    fontSize: 15,
    fontWeight: 'bold',
    color: color.gray
});

const Date = styled('span')({
    margin: 0,
    padding: 0,
    fontSize: 12,
    color: color.gray
});

const Title = styled('h4')({
    margin: 0,
    padding: 0,
    fontSize: 17,
    color: color.secondary
});

const Message = styled('p')({
    margin: 0,
    padding: 0,
    fontSize: 15,
    color: color.gray
});

const Hr = styled('hr')({
    height: '1px',
    backgroundColor: '#ccc',
    border: 'none'
});

const SquareInfo = ({ icon: Icon, text }) => {
    return (
        <Box component='div'
            sx={{
                border: `1px solid ${color.lightGray}`,
                p: '5px 10px',
                bgcolor: color.primary,
                borderRadius: 2,
                display: 'flex',
                cursor: 'pointer',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            {Icon}

            <span style={{ fontSize: 14, fontFamily: 'Source Sans Pro', paddingLeft: 4 }}>
                {text}
            </span>
        </Box>
    )
}

export const Post = ({ post: { id, title, message, ranking, date, commentsCount, user }, isLogued }) => {
    moment.locale('es');
    const methods = useForm();

    const [loadingComments, setLoadingComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [hasMoreComments, setHasMoreComments] = useState(false);
    const [page, setPage] = useState(1);
    const [seeComments, setSeeComments] = useState(false);

    const getComments = async (page) => {
        setLoadingComments(true);
        const response = await getAsync(`${endpoints.comments}?IdPost=${id}&Rows=5&Page=${page}`);
        console.log(response)
        setLoadingComments(false);

        if (response.success)
            setHasMoreComments(response.page < response.totalPages);

        return response
    }
    const handleGetComments = async () => {
        if (commentsCount === 0)
            return;

        if (comments.length > 0) {
            setComments([]);
            setHasMoreComments(false);
            return;
        }

        const response = await getComments(1);

        if (response.success) { }
        setComments(response.result);

        setSeeComments(!seeComments);
    }

    const handleGetMoreComments = async () => {
        const response = await getComments(page + 1);

        console.log(response)

        if (response.success) {
            setPage(page + 1);
            setComments([...response.result, ...comments]);
        }
    }

    const handleAddComment = async (data) => {
        console.log(data)
        const response = await postAsync(endpoints.comments, { ...data, postId: id });

        console.log(response);
        if (response.success) {
            setComments([response.result, ...comments]);
        }
    }

    return (
        <>
            <Grid container
                spacing={1}
                sx={{ p: 2 }}
                style={{ backgroundColor: color.primary, width: '100%' }}>

                <Grid container item xs={2} alignItems={'center'} direction='column'>
                    <Avatar alt="Brayan" src={user.urlPhoto} />
                    <Raking raking={ranking} />
                </Grid>

                <Grid container item xs={10}>
                    <Grid item xs={12} alignItems="flex-start">
                        <div>
                            <Name>{user.fullName}</Name>
                            <Date>{capitalize(moment(date).fromNow())}</Date>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Title>
                            {title}
                        </Title>
                    </Grid>
                    <Grid item xs={12}>
                        <Message>
                            {message}
                        </Message>
                    </Grid>

                    <FormProvider {...methods}>
                        <form style={{ width: '100%' }} onSubmit={methods.handleSubmit(handleAddComment)}>
                            <Grid container item xs={12} alignItems='center' sx={{ p: 1 }}>
                                <Grid item onClick={handleGetComments}>
                                    <SquareInfo text={`${commentsCount}`} icon={<FontAwesomeIcon color={color.secondary} icon={faComment} />} />
                                </Grid>
                                {
                                    (isLogued && seeComments) && (
                                        <Grid item container sx={{ gap: '10px', flexWrap: 'nowrap', marginTop: 2 }} justifyContent='center' alignItems='center' xs={12}>
                                            <Avatar alt="Brayan" src={user.urlPhoto} />
                                            <BasicInput
                                                name="comment"
                                                multiline
                                                maxRows={3}
                                                placeholder="Añadir comentario" />
                                            <button
                                                type="submit"
                                                style={{
                                                    cursor: 'pointer',
                                                    height: 45,
                                                    width: 45,
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    flexShrink: 0,
                                                    border: 0,
                                                    backgroundColor: color.secondary
                                                }}>
                                                <SendIcon
                                                    sx={{ color: color.primary }} />
                                            </button>
                                        </Grid>
                                    )
                                }
                            </Grid>
                        </form>
                    </FormProvider>

                    <Grid container item xs={12}>
                        <Grid item xs={12}>
                            <Spinner loading={loadingComments} />
                        </Grid>
                        {
                            hasMoreComments && (
                                <span
                                    onClick={handleGetMoreComments}
                                    style={{
                                        marginTop: 10,
                                        color: color.secondary,
                                        fontWeight: 'bold',
                                        fontFamily: 'Source Sans Pro',
                                        cursor: 'pointer'
                                    }}>Ver más comentarios</span>
                            )
                        }
                        {
                            comments?.length > 0 && (
                                comments.map(comment => (
                                    <Comment key={shortid.generate()} comment={comment} />
                                ))
                            )
                        }

                    </Grid>

                </Grid>

            </Grid>
            <Hr />
        </>
    )
}
