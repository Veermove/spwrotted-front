import { ChangeEvent, MouseEvent, FC, useCallback, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useAuth } from "../../../context/AuthContext";
import { createComment } from "../../../utils/EntityStoreClient";

export const CreateComment: FC<{
    postId: string,
}> = ({postId}) => {

    const [commentText, setCommentText] = useState("");
    const { currentUser } = useAuth()!;

    const updateTextValueFromEvent = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setCommentText(e.target.value);
    }, [setCommentText]);

    const publishComment = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        createComment(commentText, postId, currentUser!)
        setCommentText("");
    }, [commentText, currentUser, postId])

    return <>
        <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            onChange={updateTextValueFromEvent}
            value={commentText}
            style={{ height: '80px' }}
        />
        <Button
            onClick={publishComment}
            disabled={!currentUser}
        >
            Comment!
        </Button>
    </>
}
