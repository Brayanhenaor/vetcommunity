import { Avatar, Box, Grid, IconButton } from '@mui/material'
import moment from 'moment'
import React, { useState } from 'react'
import { color } from '../../../utils/color'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { postAsync } from '../../../api/apiService';
import { endpoints } from '../../../api/endpoint';
import { showSnack } from '../../../actions/ui';

export const Comment = ({ comment, isMounted, dispatch, userId }) => {
    const [likes, setLikes] = useState(comment.commentLikes);


    const handleLikeUnlike = async (like) => {
        if (likes.filter(like => like.user.id === userId).length === 1 && likes.filter(like => like.user.id === userId)[0].recommended === like) {
            return;
        }

        const response = await postAsync(endpoints.commentLikes,
            {
                commentId: comment.id,
                recommended: like
            });

        if (!isMounted.current)
            return;

        console.log(response)

        if (response.success) {
            setLikes(response.result);
            return;
        }

        dispatch(showSnack(response.message, 'error'));
    }

    return (
        <Grid item container className='animate__animated animate__fadeIn' sx={{ gap: '10px', flexWrap: 'nowrap', marginTop: 2 }} alignItems='flex-start' xs={12}>
            <Avatar alt={comment.user?.fullName} src={comment.user?.urlPhoto} />

            <Grid item container>

                <Box sx={{
                    cursor: 'pointer',
                    borderRadius: '15px',
                    flexWrap: 'wrap',
                    p: 1.5,
                    alignItems: 'center',
                    flexShrink: 0,
                    bgcolor: color.lightGray2
                }}>
                    <span style={{ fontSize: 13, fontWeight: 'bold' }}>
                        {comment.user.fullName}
                    </span>
                    <span style={{ fontSize: 16, display: 'block' }}>
                        {comment.comment}
                    </span>
                </Box>
                <Grid container item alignItems={'center'} sx={{ mt: 1 }} gap={1} xs={12}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            pl: 1,
                            pt: 0.5,
                            pb: 0.5,
                            pr: 1,
                            gap: 0.5,
                            borderRadius: 10,
                            bgcolor: color.lightGray2
                        }}>
                        <IconButton
                            onClick={() => handleLikeUnlike(true)}
                            sx={{ m: 0, p: 0.5 }}>
                            {
                                likes.filter(like => like.user.id === userId)[0]?.recommended ? (
                                    <ThumbUpIcon sx={{ fontSize: 17, color: color.lightSecondary, mr: 0.5 }} />
                                ) : (
                                    <ThumbUpOffAltIcon sx={{ fontSize: 17, color: color.lightSecondary, mr: 0.5 }} />
                                )

                            }
                            <span style={{ fontSize: 13, display: 'block' }}>
                                {likes.filter(like => like.recommended).length}
                            </span>
                        </IconButton>

                        <IconButton
                            onClick={() => handleLikeUnlike(false)}
                            sx={{ m: 0, p: 0.5 }}>
                            {
                                likes.filter(like => like.user.id === userId)[0]?.recommended === false ? (
                                    <ThumbDownIcon sx={{ fontSize: 17, color: color.red, mr: 0.5 }} />
                                ) : (
                                    <ThumbDownOffAltIcon sx={{ fontSize: 17, color: color.red, mr: 0.5 }} />
                                )

                            }
                            <span style={{ fontSize: 13, display: 'block' }}>
                                {likes.filter(like => !like.recommended).length}
                            </span>
                        </IconButton>
                    </Box>
                    <span style={{ fontSize: 12, display: 'block' }}>
                        {moment(comment.date).local().fromNow()}
                    </span>
                </Grid>
            </Grid>
        </Grid>
    )
}
