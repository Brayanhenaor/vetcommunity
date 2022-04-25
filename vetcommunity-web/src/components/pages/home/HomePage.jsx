import styled from '@emotion/styled';
import { Container, Tab, Tabs } from '@mui/material'
import { Box } from '@mui/system';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { endpoints } from '../../../api/endpoint';
import { useFetch } from '../../../hooks/useFetch';
import { color } from '../../../utils/color';
import { Spinner } from '../../common/loader/Spinner';
import { PostList } from '../../common/post/PostList';
import { CreateQuestion } from './CreateQuestion';

const StyledTabs = styled((props) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: '40%',
        width: '100%',
        backgroundColor: color.secondary,
    },
});


const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    {
        textTransform: 'none',
        color: color.lightSecondary,
        '&.Mui-selected': {
            color: color.secondary,
            fontWeight: 'bold'
        },
    }
);


export const HomePage = () => {
    const { data, loading } = useFetch(endpoints.allPosts);
    const { isLogued } = useSelector(state => state.auth);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <Container>
            {
                isLogued && (
                    <CreateQuestion />
                )
            }
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <StyledTabs
                    value={value}
                    onChange={handleChange}
                >
                    <StyledTab label="Revelantes" />
                    <StyledTab label="Más recientes" />
                    <StyledTab label="Más respondidas" />
                </StyledTabs>
            </Box>
            {
                loading ? (
                    <Spinner />
                ) : (
                    <PostList posts={data?.result} />
                )
            }
        </Container>
    )
}
