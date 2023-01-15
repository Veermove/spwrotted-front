import { FC, MouseEvent, useCallback, useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { Post } from "../../utils/Post";
import { decideModerate, moderateNext } from "../../utils/EntityStoreClient";
import { PostBody } from "../Dashboard/Post/PostBody";
import { Button, Card, Spinner } from "react-bootstrap";

export const ModeratePosts: FC<{
}> = ({}) => {
    const { currentUser } = useAuth()!;
    const [postData, setPostData] = useState<Post | null>(null);

    const fetchNextPost = useCallback(async () => {
        const nextPost = await moderateNext(currentUser?.[0].email!);
        setPostData(nextPost);
    }, [currentUser, setPostData])

    useEffect(() => {
        fetchNextPost();
    }, []);



    const decideAction = useCallback(async (accepted: boolean) => {
        decideModerate(currentUser?.[0].email!, postData!.id, accepted)
    }, [currentUser, postData]);

    const acceptAction = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        decideAction(true);
        fetchNextPost();
    }, [decideAction, fetchNextPost]);

    const rejectAction = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        decideAction(false);
        fetchNextPost();
    }, [decideAction, fetchNextPost]);


    if (currentUser?.[1].role !== 1) {
        return <h1> Oops, Looks like you're not a moderator</h1>
    }

    if (!postData) {
        return (
            <>
                <h1>No more posts to moderate, hooray!</h1>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </>
        )
    }
    return <>
        <Card>
            <PostBody
                postData={postData!}
                disabled={true} />
            <Card.Footer
                style={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "10px",
                    justifyContent: "center",
                }}
            >
                <Button
                    onClick={acceptAction}
                >
                    Accept
                </Button>
                <Button
                    onClick={rejectAction}
                >
                    Reject
                </Button>
            </Card.Footer>
        </Card>
    </>
}
