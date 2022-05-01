import { Avatar, Box, Grid } from '@mui/material'
import moment from 'moment'
import React from 'react'
import { color } from '../../../utils/color'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

export const Comment = ({comment}) => {
    return (
        <Grid item container sx={{ gap: '10px', flexWrap: 'nowrap', marginTop: 2 }} alignItems='flex-start' xs={12}>
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
                            p: 1,
                            gap: 1,
                            borderRadius: 10,
                            bgcolor: color.lightGray2
                        }}>
                        <ThumbUpIcon sx={{ fontSize: 17, color: color.lightSecondary }} />
                        <span style={{ fontSize: 13, display: 'block' }}>
                            {comment.commentLikes.filter(like => like.recommended).length}
                        </span>
                        <ThumbDownIcon sx={{ fontSize: 17, color: color.red }} />
                        <span style={{ fontSize: 13, display: 'block' }}>
                            {comment.commentLikes.filter(like => !like.recommended).length}
                        </span>
                    </Box>
                    <span style={{ fontSize: 12, display: 'block' }}>
                        {moment(comment.date).fromNow()}
                    </span>
                </Grid>
            </Grid>
        </Grid>
    )
}
