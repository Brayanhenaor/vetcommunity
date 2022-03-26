import { Container } from '@mui/material'
import React from 'react'
import { PostList } from '../../common/post/PostList';


export const HomePage = () => {
    return (
        <Container>
            <PostList posts={[{}, {}]} />
        </Container>
    )
}
