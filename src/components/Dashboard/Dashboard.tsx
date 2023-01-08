import React, { FC, useCallback, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { Post } from '../../utils/Post';
import { CreatePost } from './CreatePost/CreatePost';
import { PostComponent } from './Post/PostComponent';

export const Dashboard: FC<{
    data: Post[] | undefined,
    isLoading: boolean,
    isError: boolean;
}> = ({
    data,
    isLoading,
    isError,
}) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const prependPost = useCallback(
        (createdPost: Post) => setPosts([...posts, createdPost]),
        [posts, setPosts]
    );

    return (
        <>
            <CreatePost
                prependPost={prependPost}
            />
            <br/>
            {!isLoading && !isError &&
                ([...data!, ...posts])
                    .map((s) => (
                    <PostComponent key={s.id} postData={s} />
                ))
            },
            {(isLoading || isError) &&
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            }
        </>
    )
}
