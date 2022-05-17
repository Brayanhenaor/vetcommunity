import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { endpoints } from '../../../api/endpoint';
import { useFetch } from '../../../hooks/useFetch';
import { color } from '../../../utils/color';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { PostList } from '../../common/post/PostList';
import { Spinner } from '../../common/loader/Spinner';
import search from '../../../img/search.gif';
import { Box, width } from '@mui/system';

export const SearchResultsPage = () => {
    const { query } = useParams();
    const [page, setPage] = useState(1);
    const { data, loading } = useFetch(`${endpoints.search}?Page=${page}&Query=${query}`);
    const [posts, setPosts] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasResults, setHasResults] = useState(true);

    const [sentryRef] = useInfiniteScroll({
        onLoadMore: () => setPage(currentPage => currentPage + 1),
        hasNextPage: hasNextPage,
        rootMargin: '0px 0px 400px 0px',
        loading: loading
    });

    useEffect(() => {
        setPosts([]);
    }, [query])

    useEffect(() => {
        if (data?.success) {
            setHasNextPage(data.page < data.totalPages);
            setPosts(currentPosts => [...currentPosts, ...data.result]);
            setHasResults(data.result?.length > 0)
        }
    }, [data, setPosts, setHasNextPage])

    return (
        <Container>
            <Grid container justifyContent={'center'}>
                <h4
                    style={{
                        color: color.gray,
                        fontFamily: 'Raleway',
                        fontWeight: 'normal',
                        fontSize: 18
                    }}>
                    {
                        hasResults && (
                            <>
                                Resultados para <span style={{ color: color.secondary, fontWeight: 'bold' }}>"{query}"</span>
                            </>
                        )
                    }
                </h4>
                {
                    !hasResults && (
                        <Box
                            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src={search} style={{
                                height: 400,
                                width: 400
                            }} />
                            <span
                                style={{
                                    color: color.gray,
                                    fontFamily: 'Raleway',
                                    fontWeight: 'normal',
                                    fontSize: 18
                                }}>Lo sentimos no encontramos resultados para <span style={{ color: color.secondary, fontWeight: 'bold' }}>"{query}"</span></span>

                        </Box>
                    )
                }
            </Grid>
            <PostList posts={posts} />
            <Spinner loading={loading} />
            <div ref={sentryRef} />
        </Container>
    )
}
