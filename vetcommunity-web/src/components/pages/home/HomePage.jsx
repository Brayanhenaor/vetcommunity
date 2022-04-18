import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import { endpoints } from '../../../api/endpoint';
import { useFetch } from '../../../hooks/useFetch';
import { PostList } from '../../common/post/PostList';


export const HomePage = () => {
    const { data, loading } = useFetch(endpoints.allPosts);
    useEffect(() => {
        console.log(data?.result)
    }, [data])
    
    return (
        <Container>
            <PostList posts={data?.result} />
        </Container>
    )
}
