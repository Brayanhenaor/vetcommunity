import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { endpoints } from '../../../api/endpoint';
import { useFetch } from '../../../hooks/useFetch';
import { Spinner } from '../../common/loader/Spinner';
import { PostList } from '../../common/post/PostList';
import useInfiniteScroll from 'react-infinite-scroll-hook';

export const MyQuestionsPage = () => {
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const { data, loading } = useFetch(`${endpoints.myPosts}?Page=${page}`);
    const [hasNextPage, setHasNextPage] = useState(false);

    const [sentryRef] = useInfiniteScroll({
        onLoadMore: () => setPage(currentPage => currentPage + 1),
        hasNextPage: hasNextPage,
        rootMargin: '0px 0px 400px 0px',
        loading: loading
    });

    useEffect(() => {
        if (data?.success) {
            console.log(data)
            setHasNextPage(data.page < data.totalPages);
            setPosts(currentPosts => [...currentPosts, ...data.result]);
        }
    }, [data, setPosts, setHasNextPage])


    return (
        <Container>
            <PostList posts={posts} />
            <Spinner loading={loading} />
            <div ref={sentryRef} />
        </Container>
    )
}
