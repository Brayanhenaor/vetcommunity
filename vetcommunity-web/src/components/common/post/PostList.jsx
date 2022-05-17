import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import shortid from 'shortid'
import { Post } from './Post'

export const PostList = ({ posts }) => {
    const { isLogued, id, user } = useSelector(state => state.auth);

    return (
        <>
            {
                posts?.length > 0 && posts?.map(post => (
                    <Post key={shortid.generate()} isLogued={isLogued} isVeterinary={user?.isVeterinary} userId={id} post={post} />
                ))
            }
        </>
    )
}
