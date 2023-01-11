import { Timestamp } from "firebase/firestore";
import { FC, useCallback } from "react";
import { Form } from "react-bootstrap";
import { likeAComment } from "../../../utils/EntityStoreClient";
import { LikeButtonCounter } from "../../common/LikeButtonCounter";

export const CommentComponent: FC<{
    postId: string,
    comment: { value: string, likes: number, author: string, creationDate: Timestamp },
}> = ({postId, comment}) => {

    const likeFunction = useCallback((likeOrUnlike: boolean) => {
        return likeAComment(likeOrUnlike, postId, comment.author, comment.creationDate.seconds)
    }, [comment.author, comment.creationDate.seconds, postId]);

    return <>
        <Form.Label
            style={{
                display: "flex",
                justifyContent: "space-between"
            }}
        >
            <div
                style={{
                    color:"blue",
                    display:"felx",
                    fontWeight: 500
                }}
            >
            {comment.author}
            </div>
            <div
                style={{
                    color:"gray",
                    display:"felx"
                }}
            >
                {(new Date(comment.creationDate.seconds * 1000)).toLocaleString()}
            </div>

        </Form.Label>
        <Form.Control
            plaintext readOnly defaultValue={comment.value}
        />
        <LikeButtonCounter
            likeFunction={likeFunction}
            initialLikes={comment.likes}
        />
    </>
}
