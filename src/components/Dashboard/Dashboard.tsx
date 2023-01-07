import React, { useCallback, useState } from 'react'
import { Post } from '../../utils/Post';
import { CreatePost } from './CreatePost/CreatePost';
import { PostComponent } from './Post/PostComponent';

export default function Dashboard() {
    const [posts, setPosts] = useState<Post[]>([]);
    const prependPost = useCallback((createdPost: Post) => setPosts([...posts, createdPost]), [posts, setPosts])
    return (
        <>
            <CreatePost
                prependPost={prependPost}
            />
            <br/>
            {posts.map((s) => (
                <PostComponent key={s.id} postData={s} />
            ))}
        </>
    )
}
