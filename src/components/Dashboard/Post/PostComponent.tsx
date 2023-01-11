import type { FC } from "react";
import { useCallback, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { likeAPost } from "../../../utils/EntityStoreClient";
import { Post } from "../../../utils/Post";
import { formatNumber } from "../../../utils/utils";
import { LikeButtonCounter } from "../../common/LikeButtonCounter";
import { Comments } from "./Comments";
import { VotePollOptions } from "./VotePollOptions";

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
            <Card.Header
                style={{
                    display:"flex",
                    flexDirection:"row",
                }}
            >
                <div
                    style={{
                        display:"flex",
                        paddingRight: "15px",
                    }}
                >
                    {postData.author}
                </div>
                {postData.tags.slice(0, 10).map((t) => (
                    <Card.Text
                        key={t}
                        style={{
                            display:"flex",
                            paddingRight:"5px"
                        }}
                    >
                        {t}
                    </Card.Text>
                ))}
            </Card.Header>
            <Card.Body>

                {postData.content}
                {postData.isPoll &&
                    <VotePollOptions
                        pollOptions={postData.pollOptions!}
                        postId={postData.id}
                    />
                }

            </Card.Body>
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
                            border: "1px solid #003377",
                            backgroundColor: "#0066EE",
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



