import styled from '@emotion/styled';
import { Container, Tab, Tabs } from '@mui/material'
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { endpoints } from '../../../api/endpoint';
import { useFetch } from '../../../hooks/useFetch';
import { color } from '../../../utils/color';
import { Spinner } from '../../common/loader/Spinner';
import { PostList } from '../../common/post/PostList';
import { CreateQuestion } from './CreateQuestion';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { getAsync } from '../../../api/apiService';

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
    const [value, setValue] = React.useState(0);
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);

    const [sentryRef] = useInfiniteScroll({
        onLoadMore: () => handleNewPage(page + 1),
        hasNextPage: hasNextPage,
        rootMargin: '0px 0px 400px 0px',
        loading: loading
    });

    useEffect(() => {
        handleGetItems(1, 0);
    }, [])

    const handleGetItems = async (newPage, order) => {
        setLoading(true);

        const response = await getAsync(`${endpoints.allPosts}?OrderBy=${order}&Page=${newPage}`);

        if (response.success) {
            setPosts(current => ([
                ...(order !== value ? [] : current),
                ...response.result
            ]));
            setHasNextPage(response?.page < response?.totalPages)
        }

        setLoading(false);
    }

    const handleNewPage = async (newPage) => {
        setPage(newPage);
        handleGetItems(newPage, value);
    }

    // useEffect(() => {
    //     if (data !== null)
    //         setPosts(data.result);
    // }, [data])

    const { isLogued } = useSelector(state => state.auth);

    const handleChange = async (event, newValue) => {
        setPage(1);
        await handleGetItems(1, newValue);
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
            <PostList posts={posts} />
            <Spinner loading={loading} />
            <div ref={sentryRef} />
        </Container>
    )
}
