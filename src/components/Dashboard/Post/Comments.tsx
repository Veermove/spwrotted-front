import { FC } from "react"
import { ListGroup, Spinner } from "react-bootstrap";
import { useQuery } from "react-query";
import { getCommentsForPost } from "../../../utils/EntityStoreClient";
import { CommentComponent } from "./CommentComponent";
import { CreateComment } from "./CreateComment";

export const Comments: FC<{
    postId: string,
}> = ({postId}) => {

    const { isLoading, isError, data} = useQuery(postId, ({ queryKey }) =>
        getCommentsForPost(queryKey[0]),
        { keepPreviousData: true }
    );

    if (isLoading || isError) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }

    return <>
        <ListGroup>
            {
                data!.comments
                    .map((comm) => {
                        return (<ListGroup.Item
                            key={comm.creationDate.seconds}
                        >
                            <CommentComponent
                                postId={postId}
                                comment={comm}
                            />
                        </ListGroup.Item>)
                    })
            }
        </ListGroup>
        <CreateComment postId={postId}/>
    </>
}
