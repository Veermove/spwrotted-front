import { FC, useEffect, useState } from "react"
import { ListGroup, Spinner } from "react-bootstrap";
import { getCommentsForPost } from "../../../utils/EntityStoreClient";
import { CommentsAggregate } from "../../../utils/Post";
import { CommentComponent } from "./CommentComponent";

export const Comments: FC<{
    postId: string,
}> = ({postId}) => {
    const [isLoading, setLoading] = useState(true);
    const [comments, setComments] = useState<null | CommentsAggregate>(null);

    useEffect(() => {
        try {
            getCommentsForPost(postId)
                .then(c => {
                    setComments(c);
                    setLoading(false);
                })
        } catch (e) {
            console.log(e);
        }
    }, [postId])

    return <>
        { isLoading &&
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        }
        { !isLoading &&
            <ListGroup>
                {
                    comments!.comments
                        .map((comm) => (
                            <ListGroup.Item
                                key={comm.creationDate.toString()}
                            >
                                <CommentComponent
                                    comment={comm}
                                />
                            </ListGroup.Item>
                        ))
                }
            </ListGroup>
        }
    </>
}
