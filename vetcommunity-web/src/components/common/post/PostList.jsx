import React from 'react'
import shortid from 'shortid'
import { Post } from './Post'

export const PostList = ({ posts }) => {
    return (
        <>
            {
                posts?.map(post => (
                    <Post key={shortid.generate()} post={post} />
                ))
            }
        </>
    )
}
