import { FC } from "react"
import { ListGroup, Spinner } from "react-bootstrap";
import { useQuery } from "react-query";
import { getCommentsForPost } from "../../../utils/EntityStoreClient";
import { CommentComponent } from "./CommentComponent";

export const Comments: FC<{
    postId: string,
}> = ({postId}) => {

    const { isLoading, isError, data} = useQuery(postId, ({ queryKey }) =>
        getCommentsForPost(queryKey[0])
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
    </>
}
