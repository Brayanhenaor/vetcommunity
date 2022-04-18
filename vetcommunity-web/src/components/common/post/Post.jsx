import { Avatar, Box, Grid } from '@mui/material'
import { styled } from '@mui/system';
import React from 'react'
import { color } from '../../../utils/color'
import { Raking } from '../raking/Raking'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';
import 'moment/locale/es';

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
                cursor:'pointer',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            {Icon}
            
            <span style={{ fontSize: 14, fontFamily: 'Open Sans', paddingLeft:4 }}>
                {text}
            </span>
        </Box>
    )
}

export const Post = ({post:{title, message, ranking, date, commentsCount, user}}) => {
    moment.locale('es');
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
                            <Date>{moment(date).format('D MMMM YYYY')}</Date>
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

                    <Grid container item xs={12} alignItems='center' sx={{ bgcolor: color.lightGray2, p: 1 }}>
                        <Grid item>
                            <SquareInfo text={`${commentsCount} respuestas`} icon={<FontAwesomeIcon icon={faComment} />} />
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
            <Hr />
        </>
    )
}
