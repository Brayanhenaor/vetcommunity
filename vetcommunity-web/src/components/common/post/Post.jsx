import { Avatar, Box, Chip, Grid } from '@mui/material'
import { borderRadius, styled } from '@mui/system';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
import { getAsync, postAsync, putAsync } from '../../../api/apiService';
import { endpoints } from '../../../api/endpoint';
import shortid from 'shortid';
import { capitalize } from 'lodash'
import { Comment } from './Comment';
import { showSnack } from '../../../actions/ui';
import { useIsMounted } from '../../../hooks/useIsMounted';
import { useDispatch } from 'react-redux';
import { blueGrey, cyan, deepOrange, green, grey, indigo, lightBlue, lightGreen, lime, orange, teal, yellow } from '@mui/material/colors';

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

const colors = [
    color.secondary,
    teal[800],
    lightGreen[800],
    deepOrange[800],
    lightBlue[900],
    green[900],
    grey[900],
    blueGrey['A700'],
    indigo[900],
    cyan[900],
    lime[900]
]

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

export const Post = ({ post: { id, title, message, ranking, date, commentsCount, user, categories }, isLogued, userId }) => {
    moment.locale('es');
    let intervalId = 0;
    const { isVeterinary } = user;
    const methods = useForm();
    const { reset } = methods;
    const isMounted = useIsMounted();
    const dispatch = useDispatch();

    const [timeAgo, setTimeAgo] = useState(capitalize(moment(date).local().fromNow()));
    const [loadingComments, setLoadingComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [hasMoreComments, setHasMoreComments] = useState(false);
    const [page, setPage] = useState(1);
    const [seeComments, setSeeComments] = useState(false);
    const [postRanking, setPostRanking] = useState(ranking);
    const [commentsQuantity, setCommentsQuantity] = useState(commentsCount);

    const memoColor = useMemo(() => colors[Math.floor(Math.random() * colors.length)], []);

    const getComments = async (page) => {
        setLoadingComments(true);
        const response = await getAsync(`${endpoints.comments}?IdPost=${id}&Rows=5&Page=${page}`);
        setLoadingComments(false);

        if (!isMounted.current)
            return;

        if (response.success)
            setHasMoreComments(response.page < response.totalPages);

        return response
    }
    const handleGetComments = async (add) => {
        if (!add)
            setSeeComments(!seeComments);

        if ((commentsCount === 0 && comments.length == 0) && !add)
            return;

        if (!add)
            if (comments.length > 0) {
                setComments([]);
                setHasMoreComments(false);
                return;
            }

        const response = await getComments(1);
        console.log(response)

        if (!isMounted.current)
            return;

        if (response.success) {
            setComments(response.result);
            setCommentsQuantity(response.totalRecords);
        }
    }

    

    const handleGetMoreComments = async () => {
        const response = await getComments(page + 1);

        if (!isMounted.current)
            return;

        if (response.success) {
            setPage(page + 1);
            setComments([...response.result, ...comments]);
        }
    }

    const handleAddComment = async (data) => {
        const response = await postAsync(endpoints.comments, { ...data, postId: id });

        if (!isMounted.current)
            return;

        if (response.success) {
            reset();
            handleGetComments(true);
            return;
        }

        dispatch(showSnack(response.message, 'error'));
    }

    const handleAddSubtractRanking = async (add) => {
        const response = await putAsync(endpoints.ranking, {
            postId: id,
            add
        });

        if (response.success) {
            setPostRanking(response.result?.ranking);
            return;
        }

        dispatch(showSnack(response.message, 'warning'));
    }

    useEffect(() => {
        intervalId = setInterval(() => {
            setTimeAgo(capitalize(moment(date).local().fromNow()));
        }, 60000);
        return () => clearInterval(intervalId)
    }, [setTimeAgo])

    return (
        <>
            <Grid container
                spacing={1}
                sx={{ p: 2 }}
                style={{ backgroundColor: color.primary, width: '100%' }}>

                <Grid container item xs={2} alignItems={'center'} direction='column'>
                    <div style={{ position: 'relative' }}>
                        <Avatar alt="Brayan" src={user?.urlPhoto} />
                        {
                            isVeterinary && (
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '120%',
                                    height: '120%',
                                    border: `3px solid ${orange[900]}`,
                                    borderRadius: '50%'
                                }} />)
                        }
                    </div>
                    <Raking handleAddSubtractRanking={handleAddSubtractRanking} raking={postRanking} />
                </Grid>

                <Grid container item xs={10}>
                    <Grid item xs={12} alignItems="flex-start">
                        <div>
                            <div style={{ display: 'flex', gap: 10 }}>
                                <Name>{user?.fullName}</Name>
                                {
                                    isVeterinary && (
                                        <span style={{ color: orange[900] }}>Veterinario</span>
                                    )
                                }
                            </div>
                            <Date>{timeAgo}</Date>
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
                    <Grid container gap={1}>
                        {
                            categories?.map(category => (
                                <Chip key={category.id} label={category.name} sx={{
                                    color: color.primary,
                                    p: 0,
                                    bgcolor: memoColor
                                }} />
                            ))
                        }
                    </Grid>

                    <FormProvider {...methods}>
                        <form style={{ width: '100%' }} onSubmit={methods.handleSubmit(handleAddComment)}>
                            <Grid container item xs={12} alignItems='center' sx={{ p: 1 }}>
                                <Grid item onClick={() => handleGetComments()}>
                                    <SquareInfo text={`${commentsQuantity}`} icon={<FontAwesomeIcon color={color.secondary} icon={faComment} />} />
                                </Grid>
                                {
                                    (isLogued && seeComments) && (
                                        <Grid item container sx={{ gap: '10px', flexWrap: 'nowrap', marginTop: 2 }} justifyContent='center' alignItems='center' xs={12}>
                                            <Avatar alt="Brayan" src={user?.urlPhoto} />
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
                                    <Comment key={shortid.generate()} comment={comment} isMounted={isMounted} dispatch={dispatch} userId={userId} />
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
