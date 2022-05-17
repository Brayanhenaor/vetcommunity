import { Container } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom';
import { endpoints } from '../../../api/endpoint';
import { useFetch } from '../../../hooks/useFetch';
import { Spinner } from '../../common/loader/Spinner';
import { PostList } from '../../common/post/PostList';

export const PostPage = () => {
    const { id } = useParams();
    const { data, loading } = useFetch(endpoints.post.replace(':id', id));

    return (
        <Container>
            <PostList posts={data?.result} />
            <Spinner loading={loading} />
        </Container>
    )
}
