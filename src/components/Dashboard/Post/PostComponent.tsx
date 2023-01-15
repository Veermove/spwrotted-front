import type { FC } from "react";
import { useCallback, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { likeAPost } from "../../../utils/EntityStoreClient";
import { Post } from "../../../utils/Post";
import { LikeButtonCounter } from "../../common/LikeButtonCounter";
import { Comments } from "./Comments";
import { PostBody } from "./PostBody";

export const PostComponent: FC<{
    postData: Post,
}> = ({postData}) => {

    const likeFunction = useCallback((likeOrUnlike: boolean) => {
        return likeAPost(likeOrUnlike, postData.id)
    }, [postData.id]);

    const [commentsHidden, setCommentsHidden] = useState(true);
    const switchComments = useCallback(() => {
        setCommentsHidden(!commentsHidden);
    }, [commentsHidden, setCommentsHidden]);

    return (<>
        <Card>
            <PostBody
                postData={postData}
                disabled={false}
            />
            <Card.Footer>
                <div
                    style = {{
                        display:"flex",
                        flexDirection:"row"
                    }}
                >
                    <LikeButtonCounter
                        likeFunction={likeFunction}
                        initialLikes={postData.likes}
                    />
                    <Button
                        style={{
                            display: "flex",
                            marginLeft: "10px",
                            width: "auto",
                            lineHeight: "18px",
                            borderRadius: "5px",
                        }}
                        onClick={(e) => switchComments()}
                    >
                        Comments
                    </Button>
                </div>
                <br/>
                { !commentsHidden &&
                    <Comments
                        postId={postData.id}
                    />
                }
            </Card.Footer>
        </Card>
        <br/>
    </>)
}
